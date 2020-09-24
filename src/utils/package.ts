import fs from 'fs'
import path from 'path'
import axios from 'axios'

export function hasYarn (projectPath: string): boolean {
  return fs.existsSync(path.join(projectPath, 'yarn.lock'))
}

export function hasNpm (projectPath: string): boolean {
  return fs.existsSync(path.join(projectPath, 'package.json'))
}

export async function searchPkg (keyword: string): Promise<object> {
  return await axios.get('https://api.npms.io/v2/search?size=1&q=' + keyword)
}
