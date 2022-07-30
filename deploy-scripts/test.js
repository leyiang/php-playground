import env from "./load.js";
import { execSync } from "child_process";
import { existsSync } from "fs";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.trace("VITE_PLAYGROUND_ROOT is not a folder");
}

execSync(`rm -rf ${folder}/test`);
execSync(`mkdir ${folder}/test`);

execSync(`cp ./php-scripts/modify.php ${ folder }/test/modify.php`);
execSync(`cp ./php-scripts/file.php ${ folder }/test/file.php`);