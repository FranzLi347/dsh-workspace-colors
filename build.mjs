import { build } from 'esbuild'
import { mkdir } from 'node:fs/promises'
await mkdir('lib', { recursive: true })
await build({ entryPoints: ['src/index.ts'], outfile: 'lib/index.js', format: 'esm', platform: 'node' })
await build({
  entryPoints: ['src/client.ts'], outfile: 'lib/client.js', bundle: true, format: 'cjs', platform: 'browser',
  jsx: 'automatic', target: 'es2022', loader: { '.css': 'text' },
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-store', '@deepseek-ai/dsh-client-ui-primitives'],
  banner: { js: 'window.__ModuleLoader__.load({id:"dsh-workspace-colors",factory:(require)=>{var module={exports:{}};var exports=module.exports;' },
  footer: { js: 'return module.exports;}});' },
})
