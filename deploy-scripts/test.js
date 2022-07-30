import env from "./load.js";
import { exec } from "child_process";
import { existsSync } from "fs";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.trace("VITE_PLAYGROUND_ROOT is not a folder");
}

exec(`cp ./php-scripts/modify.php ${ folder }/modify-test.php`, (err, stdout, stderr) => {
    if( err ) {
        console.log( err );
        return;
    }
});