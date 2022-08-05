import { execSync } from "child_process";
import env from "./env.js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import {convertPathByPlatform} from "./env.js";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.log( folder );
    throw new Error("VITE_PLAYGROUND_ROOT is not a folder");
}

execSync( convertPathByPlatform("rm -rf ./tmp") );
execSync( convertPathByPlatform("mkdir tmp") );
execSync( convertPathByPlatform("npx vite build --base=./") );
execSync( convertPathByPlatform("cp -r ./dist/* ./tmp") );
execSync( convertPathByPlatform("cp -r ./php-scripts/* ./tmp") );

const indexPHP = readFileSync( convertPathByPlatform("./tmp/index.php"), "utf-8");
const indexHTML = readFileSync( convertPathByPlatform("./tmp/index.html"), "utf-8");

const result = indexPHP.replace("<!--REPLACE-->", indexHTML );
writeFileSync( convertPathByPlatform("./tmp/index.php"), result, "utf-8");

execSync( convertPathByPlatform("rm ./tmp/index.html") );
execSync( convertPathByPlatform(`cp -r ./tmp/* ${ folder }`) );
if( ! env.isWindows ) execSync( convertPathByPlatform(`sudo chown -R www-data ${folder}`) );
execSync( convertPathByPlatform(`rm -rf ./tmp`) );