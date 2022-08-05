import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const res = dotenv.config({
    path: path.join(__dirname, "..", ".env")
});

const env = res.parsed;

env.isWindows = os.platform() === "win32";

export default env;

export function convertPathByPlatform( origin ) {
    return origin.replaceAll(/[/\\]/g, path.sep );
}
