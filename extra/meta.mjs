import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
export function getDirName() {
    return fileURLToPath(new URL('.', import.meta.url));
}
export function getRequire() {
    return createRequire(import.meta.url);
}
