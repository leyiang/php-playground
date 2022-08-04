import { defineConfig } from "vite";
import Unocss from "unocss/vite";
import MonacoPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
    plugins: [
        Unocss(),
        //@ts-ignore Weird Vite Import Bug
        MonacoPlugin.default({})
    ]
});