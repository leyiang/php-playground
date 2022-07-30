import "uno.css";
import * as monaco from "monaco-editor";
import { VimMode, initVimMode } from "monaco-vim";

const editorDOM = document.getElementById("editor") as HTMLElement;
const vimStatus = document.getElementById("vim-status") as HTMLElement;
const previewStatus = document.getElementById("preview-status") as HTMLElement;

const editor = monaco.editor.create( editorDOM, {
    value: "<?php\n\n",
    language: "php",
});

initVimMode( editor, vimStatus );

VimMode.Vim.defineEx("write", "w", function() {
    updateScript();
});

window.addEventListener("keydown", e => {
    if( e.ctrlKey && e.key.toLowerCase() === "s" ) {
        e.preventDefault();
        updateScript();
    }
});


declare global {
    interface Window {
        endpoint?: string;
    }
}

if( import.meta.env.MODE === "development" ) {
    window.endpoint = "http://localhost/test.php";
}

function updateScript() {
    if( window["endpoint"] === undefined ) {
        throw new Error("The `endpoint` global variable not set correctly! You need to run `npm run deploy` before you do anything.");
    } else {
        // endpoint should be injected by php
        const endpoint = window["endpoint"];
        const value = editor.getValue();

        previewStatus.setAttribute("status", "loading");

        fetch( endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value
            })
        }).then(r => {
            if( r.ok ) {
                return r.json();
            }

            throw r.statusText;
        }).then( r => {
            previewStatus.setAttribute("status", "success");
        }).catch( e => {
            previewStatus.setAttribute("status", "error");

            console.log("Preview Failed:")
            console.error(e);
        });
    }
}