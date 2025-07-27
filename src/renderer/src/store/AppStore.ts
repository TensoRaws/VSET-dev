export const useAppStore = defineStore('app', {
  state: () => ({
    isRunning: false
  }),
  actions: {
    setRunning(val: boolean) {
      this.isRunning = val
    }
  }
})
