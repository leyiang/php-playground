import { execSync } from "child_process";
import env from "./load.js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import os from "os";

const isWindows = os.platform() === "win32";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.log( folder );
    throw new Error("VITE_PLAYGROUND_ROOT is not a folder");
}

execSync("rm -rf ./tmp");
execSync("mkdir tmp");
execSync("npx vite build --base=./");
execSync("cp -r ./dist/* ./tmp");
execSync("cp ./php-scripts/* ./tmp");

const indexPHP = readFileSync("./tmp/index.php", "utf-8");
const indexHTML = readFileSync("./tmp/index.html", "utf-8");

const result = indexPHP.replace("<!--REPLACE-->", indexHTML );
writeFileSync("./tmp/index.php", result, "utf-8");

execSync("rm ./tmp/index.html");
execSync(`cp -r ./tmp/* ${ folder }`);
if( ! isWindows ) execSync(`sudo chown -R www-data ${folder}`);
execSync(`rm -rf ./tmp`);