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
    if (dep.version) {
      arr.push(dep)
    }
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
    if (dep.version) {
      arr.push(dep)
    }
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
  if (result.stdout.indexOf('added') >= 0) {
    return { name, added: true, msg: result.stderr }
  } else {
    return { name, added: false, msg: result.stdout }
  }
}

export async function removeGlobalDep (name: string, log = true) {
  const { stdout, stderr } = await shell(npm, `uninstall ${name} -g`, '', log)
  if (stdout.indexOf('removed') >= 0) {
    return { name: name, removed: true, msg: stdout }
  } else {
    return { name: name, removed: false, msg: stderr }
  }
}
