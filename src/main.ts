import {initResize} from "./resize";

declare global {
    interface Window {
        endpoint?: string;
        previewURI: string;
        injectValue?: string;
    }
}

import "uno.css";
import * as monaco from "monaco-editor";
//@ts-ignore no @types/monaco-vim found
import { VimMode, initVimMode } from "monaco-vim";

const editorDOM = document.getElementById("editor") as HTMLElement;
const vimStatus = document.getElementById("vim-status") as HTMLElement;
const previewStatus = document.getElementById("preview-status") as HTMLElement;
const previewIframe = document.getElementById("preview-iframe") as HTMLIFrameElement;

const defaultValue = "<?php \n\n";

const editor = monaco.editor.create( editorDOM, {
    value: window["injectValue"] || defaultValue ,
    language: "php",
    automaticLayout: true
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

if( import.meta.env.MODE === "development" ) {
    window.endpoint = import.meta.env.VITE_PLAYGROUND_URI + "/test/modify.php";
    window.previewURI = import.meta.env.VITE_PLAYGROUND_URI + "/test/file.php";
}

previewIframe.src = window.previewURI;

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
            previewIframe.src = window.previewURI + "?time=" + Math.random();
        }).catch( e => {
            previewStatus.setAttribute("status", "error");
            console.error(e);
            console.log("If you are getting 404 or cors erorrs, remeber to call `npm run deploy` for production. And `npm run deploy:test` for testing.")
        });
    }
}

initResize(
    document.querySelector(".resize") as HTMLElement,
    document.querySelector(".code-area") as HTMLElement,
    document.querySelector(".preview-area") as HTMLElement,
);