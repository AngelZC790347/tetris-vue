import { computed, ref } from 'vue'

export function useLevel (){
  const points = ref(0)
  const level = computed(() => Math.floor(points.value / 2))
  const levelColor = computed(()=>`var(--bg-color-${level.value + 1})`)
  return { points, level ,levelColor}
}
