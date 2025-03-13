import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function inc() {
    count.value += 1
  }
  function dec() {
    count.value -= 1
  }
  async function asyncInc() {
    setTimeout(() => {
      inc()
    }, 300)
  }
  return {
    count,
    inc,
    dec,
    asyncInc,
  }
})
