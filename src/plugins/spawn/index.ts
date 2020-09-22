import { spawn } from '@malept/cross-spawn-promise'

export default class Spawn {
  static getGlobal (): Promise<string> {
    return new Promise((resolve, reject) => {
      spawn('npm', ['list', '-g', '-depth', '0', '--json']).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
