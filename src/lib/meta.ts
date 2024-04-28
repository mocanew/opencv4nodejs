/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export function getDirName(): string {
    if ('__dirname' in globalThis) {
        return globalThis.__dirname;
      } else {
        // @ts-ignore
        return fileURLToPath(new URL('.', import.meta.url));
      }    
}

export function getRequire(): NodeRequire {
    if ('require' in globalThis) {
        return globalThis.require;
    } else {
        // @ts-ignore
        return createRequire(import.meta.url);
    }
}
