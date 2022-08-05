import env from "./env.js";
import { execSync } from "child_process";
import { existsSync } from "fs";
import {convertPathByPlatform} from "./env.js";

const folder = env.VITE_PLAYGROUND_ROOT;

if( ! existsSync(folder) ) {
    console.trace("VITE_PLAYGROUND_ROOT is not a folder");
}

execSync( convertPathByPlatform(`rm -rf ${folder}/test`) );
execSync( convertPathByPlatform(`mkdir ${folder}/test`) );

execSync( convertPathByPlatform(`cp ./php-scripts/modify.php ${ folder }/test/modify.php`) );
execSync( convertPathByPlatform(`cp ./php-scripts/file.php ${ folder }/test/file.php`) );
execSync( convertPathByPlatform(`cp -r ./php-scripts/vendor/ ${ folder }/test`) );

if( ! env.isWindows ) execSync( convertPathByPlatform(`sudo chown -R www-data ${folder}/test`) );