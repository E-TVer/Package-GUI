import { spawn } from 'child_process'
import parseJSON from '../../utils/parseJSON'

export function shell (command: string, params: string, cwd?: string, log?: boolean): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const args: string[] = params.split(' ')
    const spawned = spawn(command, args, { cwd, detached: false })
    const commandId = new Date().getTime().toString()

    if (log) {
      console.log(`executing: ${command} ${params} in ${cwd} \n`, commandId)
    }

    let stdout = ''
    spawned.stdout.on('data', (data: Buffer) => {
      stdout += data.toString()
      if (log) {
        console.log(data.toString(), commandId)
      }
    })

    let stderr = ''
    spawned.stderr.on('data', (data: Buffer) => {
      stderr += data.toString()
      if (log) {
        console.log(data.toString(), commandId)
      }
    })

    spawned.on('close', (exitStatus: number) => {
      if (log) {
        console.log('', commandId, exitStatus === 0 ? 'Close' : 'Error')
      }
      resolve({
        stdout,
        stderr
      })
    })

    spawned.on('error', () => {
      if (log) {
        console.log('', commandId, 'Error')
      }
      reject(new Error(stderr))
    })
  })
}

export async function shellJson (command: string, params: string, cwd: string, log = false): Promise<any> { // eslint-disable-line
  try {
    const { stdout } = await shell(command, params, cwd, log)
    return parseJSON(stdout)
  } catch (e) {
    return null
  }
}
