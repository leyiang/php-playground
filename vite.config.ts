import { defineConfig } from "vite";
import Unocss from "unocss/vite"; 
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
    plugins: [
        Unocss(),
        monacoEditorPlugin({})
    ]
});