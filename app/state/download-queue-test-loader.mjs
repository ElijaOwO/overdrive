// Load the queue in Node without starting the PS5 host. The app's queue receives
// its filesystem and download dependencies through createDownloadQueue.
import {dirname, resolve as resolvePath} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const react = pathToFileURL(resolvePath(here, '../../ps5-react/node_modules/react/index.js')).href;
const core = 'data:text/javascript,export const FileSystem = {dataDir:"/data",exists:()=>false,readFile:()=>""};';

export async function resolve(specifier, context, nextResolve) {
  if (specifier === '@ps5-react/core') return {url: core, shortCircuit: true};
  if (specifier === 'react') return {url: react, shortCircuit: true};
  return nextResolve(specifier, context);
}
