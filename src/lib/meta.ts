/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export function getDirName(): string {
    let _dirname = '.';
    if (typeof __dirname !== 'string') {
        _dirname = __dirname;
      } else {
        // @ts-ignore
        // _dirname = fileURLToPath(new URL('.', import.meta.url));
      }    
      return _dirname;  
}

export function getRequire(): NodeRequire {
    if (typeof require === 'function') {
        return require;
    } else {
        // @ts-ignore
        // const require2 = createRequire(import.meta.url);
        return require;
    }
}
