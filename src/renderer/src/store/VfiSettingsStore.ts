export default defineStore('vfisettingconfig',()=>{

  const useVfi = ref(false)
  const VfiMethodValue = ref('Rife')


  const RifeInferenceValue = ref('Cuda')
  const RifeModelValue = ref('v4_0')
  const RifeScaleValue = ref(1.0)
  const RifeMultiValue = ref(120)
  const RifeEnsembleValue = ref(false)
  const RifeDetectionValue = ref(0.5)


  return {
    useVfi,
    VfiMethodValue,
    RifeInferenceValue,
    RifeModelValue,
    RifeScaleValue,
    RifeMultiValue,
    RifeEnsembleValue,
    RifeDetectionValue
  }
}, {
  persist: {
    key: 'vfi-settings',
    storage: localStorage
  }
})