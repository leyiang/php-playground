import "uno.css";
import * as monaco from "monaco-editor";
import { initVimMode } from "monaco-vim";

const editorDOM = document.getElementById("editor");

if( editorDOM instanceof HTMLElement ) {
    const editor = monaco.editor.create( editorDOM, {
        value: "<?php\n\n",
        language: "php",
    });

    initVimMode( editor );
}