// childProcessManager.ts

import { ChildProcess } from 'child_process'
import kill from 'tree-kill'

const childProcesses: ChildProcess[] = []

/**
 * 添加子进程
 */
export function addProcess(proc: ChildProcess) {
  childProcesses.push(proc)
}

/**
 * 移除子进程
 */
export function removeProcess(proc: ChildProcess) {
  const index = childProcesses.indexOf(proc)
  if (index !== -1) {
    childProcesses.splice(index, 1)
  }
}

/**
 * Kill all child processes and their process trees
 */
export function killAllProcesses() {
  console.log(`🧹 Terminating ${childProcesses.length} child processes...`)

  for (const proc of childProcesses) {
    if (!proc.killed) {
      const pid = proc.pid
      if (typeof pid === 'number') {
        console.log(`🔪 Attempting to terminate process tree PID=${pid}`)
        kill(pid, 'SIGKILL', (err) => {
          if (err) {
            console.error(`❌ Unable to terminate PID=${pid}:`, err)
          } else {
            console.log(`✅ Successfully terminated PID=${pid}`)
          }
        })
      } else {
        console.warn(`⚠ Unable to terminate process: no valid PID found`)
      }
    }
  }

  // Clear the list
  childProcesses.length = 0
}