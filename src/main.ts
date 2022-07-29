import "uno.css";
import * as monaco from "monaco-editor";
import { VimMode, initVimMode } from "monaco-vim";

const editorDOM = document.getElementById("editor") as HTMLElement;
const vimStatus = document.getElementById("vim-status") as HTMLElement;

const editor = monaco.editor.create( editorDOM, {
    value: "<?php\n\n",
    language: "php",
});

initVimMode( editor, vimStatus );

VimMode.Vim.defineEx("write", "w", function() {
    console.log("Vim Save");
});

window.addEventListener("keydown", e => {
    if( e.ctrlKey && e.key.toLowerCase() === "s" ) {
        e.preventDefault();
        console.log("Run Script");
    }
});