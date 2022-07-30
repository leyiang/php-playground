import { execSync } from "child_process";
import env from "./load.js";
import { existsSync, readFileSync, writeFileSync } from "fs";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.trace("VITE_PLAYGROUND_ROOT is not a folder");
}

execSync("rm -rf ./tmp");
execSync("mkdir tmp");
execSync("cp -r ./dist/* ./tmp");
execSync("cp ./php-scripts/* ./tmp");

const indexPHP = readFileSync("./tmp/index.php", "utf-8");
const indexHTML = readFileSync("./tmp/index.html", "utf-8");

const result = indexPHP.replace("<!--REPLACE-->", indexHTML );
writeFileSync("./tmp/index.php", result, "utf-8");

execSync("rm ./tmp/index.html");
execSync(`cp -r ./tmp/* ${ folder }`);
execSync(`rm -rf ./tmp`);