import fs from 'fs'
import path from 'path'
import axios, { AxiosResponse } from 'axios'
import parseJSON from './parseJSON'
const { dialog } = require('electron').remote

export function hasYarn (projectPath: string): boolean {
  return fs.existsSync(path.join(projectPath, 'yarn.lock'))
}

export function hasPkg (projectPath: string): boolean {
  return fs.existsSync(path.join(projectPath, 'package.json'))
}

export async function searchPkg (keyword: string): Promise<AxiosResponse> {
  return await axios.get('https://api.npms.io/v2/search?size=1&q=' + keyword)
}

export async function getRepository (keyword: string): Promise<AxiosResponse> {
  return axios.get('https://api.github.com/search/repositories?', {
    params: {
      accept: 'application/vnd.github.v3+json',
      q: keyword
    }
  })
}

export async function getMarkdown (fullname: string, branch: string, markdown: string): Promise<AxiosResponse> {
  const url = `https://raw.githubusercontent.com/${fullname}/${branch}/${markdown}`
  return axios.get(url, { headers: { accept: 'application/vnd.github.v3+json' } })
}

interface ProjectValue {
  name: string;
  path: string;
}
export async function getProject (): Promise<ProjectValue> {
  return new Promise((resolve) => {
    const result = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
    if (result) {
      const path = result[0]
      const flag = hasPkg(path)
      if (flag) {
        const arr = path.split('\\')
        const name = arr[arr.length - 1]
        resolve({ name: name, path: path })
      } else {
        resolve()
      }
    }
  })
}

export async function getProjectPkgJson (projectPath: string) {
  const file = path.join(projectPath, 'package.json')
  const json = parseJSON(fs.readFileSync(file, { encoding: 'utf8' }))
  return json
}
