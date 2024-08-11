import { provide, ref, watch } from 'vue'

export function useFrameCounter (fps, renderCb) {
  const lastTime = ref(0);
  const frameNumber = ref(0);
  const timeFlag = ref(0);
  function nextFrame(time) {
    const deltaTime = time - lastTime.value;
    lastTime.value = time;
    timeFlag.value += deltaTime;
    if (timeFlag.value > fps * 1000) {
      frameNumber.value++;
      timeFlag.value = 0;
    }
  }
  provide('nextFrame', nextFrame);
  watch(frameNumber, () => {
    renderCb()
  });
  function finishGame(){

  }
  return { frameNumber };
}
