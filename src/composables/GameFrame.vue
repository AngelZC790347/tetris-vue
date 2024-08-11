<script setup>
import { inject, onMounted, ref, watch } from 'vue'
let cb = inject('nextFrame')
let animatedId = ref(0);
const emit = defineEmits(['pause'])
const props= defineProps({
  finish: Boolean,
  pause: Boolean
})
function update(time = 0) {
  animatedId.value = window.requestAnimationFrame(update);
  cb(time);
}
watch(()=>props.finish,(newValue)=>{
  if (newValue ===true){
    console.log("Game Over")
    window.cancelAnimationFrame(animatedId.value)
  }
})
watch(props.pause,(newValue)=>{
  if (newValue){
    window.cancelAnimationFrame(animatedId.value)
  }
})
onMounted(()=>update())
</script>

<template>
<slot ></slot>
</template>
