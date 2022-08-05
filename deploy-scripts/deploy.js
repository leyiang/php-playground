import { execSync } from "child_process";
import env from "./env.js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import {convertPathByPlatform} from "./env.js";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.log( folder );
    throw new Error("VITE_PLAYGROUND_ROOT is not a folder");
}

console.log("cp -r ./dist/* ./tmp" );

execSync( "rm -rf ./tmp" );
execSync( "mkdir tmp" );
execSync( "npx vite build --base=./" );
execSync( "cp -r ./dist/* ./tmp" );
execSync( "cp -r ./php-scripts/* ./tmp" );

const indexPHP = readFileSync( "./tmp/index.php", "utf-8");
const indexHTML = readFileSync( "./tmp/index.html", "utf-8");

const result = indexPHP.replace("<!--REPLACE-->", indexHTML );
writeFileSync( "./tmp/index.php", result, "utf-8");

execSync( "rm ./tmp/index.html" );
execSync( `cp -r ./tmp/* ${ folder }` );
if( ! env.isWindows ) execSync( `sudo chown -R www-data ${folder}` );
execSync( `rm -rf ./tmp` );