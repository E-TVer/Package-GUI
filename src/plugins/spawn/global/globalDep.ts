import { shell } from '../index'
import parseJSON from '../../../utils/parseJSON'

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

export async function getGlobalDepSimple (log = true) {
  const result = await shell(npm, 'ls -g --depth=0 --json', '', log)
  const { dependencies } = parseJSON(result.stdout)
  const arr = []
  for (const i in dependencies) {
    const dep = {
      name: i,
      version: dependencies[i].version
    }
    arr.push(dep)
  }
  return arr
}

export async function getGlobalDep (log = true) {
  const result = await shell(npm, 'ls -g --depth=0 --json', '', log)
  const { dependencies } = parseJSON(result.stdout)

  const outdated = await shell(npm, 'outdated -g --json', '', log)
  const versions = parseJSON(outdated.stdout)

  const arr = []
  for (const i in dependencies) {
    const dep = {
      name: i,
      version: versions[i] || dependencies[i].version
    }
    arr.push(dep)
  }
  return arr
}

export async function addGlobalDep (name: string, version?: string, log = true) {
  let result = null
  if (version) {
    result = await shell(npm, `install ${name} -g`, '', log)
  } else {
    result = await shell(npm, `install ${name}@${version || ''} -g`, '', log)
  }
  return result
}

export async function removeGlobalDep (name: string, log = true) {
  const result = await shell(npm, `uninstall ${name} -g`, '', log)
  console.log('result: ', result)
}
