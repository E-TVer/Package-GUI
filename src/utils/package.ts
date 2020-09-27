import fs from 'fs'
import path from 'path'
import axios, { AxiosResponse } from 'axios'

export function hasYarn (projectPath: string): boolean {
  return fs.existsSync(path.join(projectPath, 'yarn.lock'))
}

export function hasNpm (projectPath: string): boolean {
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
