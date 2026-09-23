#!/usr/bin/env node
// Install the verified v0.1.0 release without running a package manager.
import * as fs from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'

const name = 'dsh-workspace-colors'
const expectedHash = '157f6413f90cd66ef3b1ede17fd475c5c7ad37feb36ba2246c7879265ff80626'
const archive = resolve(process.argv[2] ?? `${name}-0.1.0.tgz`)
const profile = resolve(process.argv[3] ?? join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'profiles', 'web'))
const manifestPath = join(profile, 'package.json')
const original = fs.readFileSync(manifestPath, 'utf8')
const manifest = JSON.parse(original)
if (!Array.isArray(manifest.dsh?.profile?.bundles)) {
  throw new Error('Expected an existing DSH profile with dsh.profile.bundles; no files changed.')
}
if (manifest.dependencies !== undefined && (!manifest.dependencies || typeof manifest.dependencies !== 'object' || Array.isArray(manifest.dependencies))) {
  throw new Error('Invalid profile dependencies; no files changed.')
}
if (createHash('sha256').update(fs.readFileSync(archive)).digest('hex') !== expectedHash) {
  throw new Error('Archive SHA-256 does not match the v0.1.0 GitHub release; no files changed.')
}

// Own a separate directory so no pnpm-managed package contents are overwritten.
const installation = fs.mkdtempSync(join(profile, '.workspace-colors-0.1.0-'))
const target = join(profile, 'node_modules', name)
const backup = join(installation, 'package.json.before-install')
const oldLink = join(installation, 'previous-module-entry')
const pendingManifest = join(profile, `.workspace-colors-manifest-${process.pid}.tmp`)
let movedPrevious = false
let linked = false
let committed = false
try {
  execFileSync('tar', ['-xzf', archive, '-C', installation], { stdio: 'inherit' })
  const packageDir = join(installation, 'package')
  const pkg = JSON.parse(fs.readFileSync(join(packageDir, 'package.json'), 'utf8'))
  if (pkg.name !== name || pkg.version !== '0.1.0' || !pkg.dsh?.bundle?.patch) {
    throw new Error('Unexpected plugin package.')
  }
  fs.writeFileSync(backup, original, { mode: 0o600, flag: 'wx' })
  manifest.dependencies ??= {}
  manifest.dependencies[name] = `link:./${installation.slice(profile.length + 1)}/package`
  if (!manifest.dsh.profile.bundles.includes(name)) manifest.dsh.profile.bundles.push(name)
  fs.writeFileSync(pendingManifest, JSON.stringify(manifest, null, 2) + '\n', {
    mode: fs.statSync(manifestPath).mode & 0o777, flag: 'wx',
  })
  if (fs.readFileSync(manifestPath, 'utf8') !== original) {
    throw new Error('Profile changed during installation. Close DSH/plugin operations and retry.')
  }
  fs.mkdirSync(join(profile, 'node_modules'), { recursive: true })
  try {
    fs.lstatSync(target)
    fs.renameSync(target, oldLink)
    movedPrevious = true
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  fs.symlinkSync(packageDir, target, 'dir')
  linked = true
  fs.renameSync(pendingManifest, manifestPath)
  committed = true
  console.log(`Installed ${name}@0.1.0 into ${profile}`)
  console.log(`Profile backup: ${backup}`)
  console.log('Restart DSH and refresh the page. Open Workspace colors beside Settings.')
} finally {
  if (!committed) {
    if (linked) fs.unlinkSync(target)
    if (movedPrevious) fs.renameSync(oldLink, target)
    fs.rmSync(pendingManifest, { force: true })
    fs.rmSync(installation, { recursive: true, force: true })
  }
}
