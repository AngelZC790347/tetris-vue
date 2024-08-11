<template>
  <GameFrame :finish="finished">
    <div  ref="root">
      <canvas ref="canvas" width="300" height="300"></canvas>
      <img  hidden id="sprite" src="../assets/Game%20Boy%20GBC%20-%20Tetris%20-%20In-Game%20Sprites%20(1).png" alt="">
    </div>
  </GameFrame>
</template>
<style scoped>
div {
  background-color:var(--level-color);
  border-inline: 40px solid transparent;
  border-image:url("../assets/border.png") ;
  border-image-slice: 10; /* Ajusta según la imagen */
  border-image-width: 40px; /* Ancho del borde */
  border-image-outset: 0; /* No extender el borde fuera del elemento */
  border-image-repeat: stretch;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, toRef, watch,defineEmits } from 'vue'
import { useFrameCounter } from '../composables/timers';
import GameFrame from '../composables/GameFrame.vue'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, createBoard, GRAVITY,blockImages } from '../constants.js'
import { GameState } from '../logic.js'
const { frameNumber } = useFrameCounter(0.4, update);
const props = defineProps({
  currentBlock:Array,
  swapBlokcs:Function,
  finished:Boolean
})
const currentBlock = toRef(props.currentBlock)
watch(() => props.currentBlock, (newValue) => {
  currentBlock.value = newValue;
});
const blockPos = reactive({
  X:Number,
  Y:Number,
})
const canvas = ref();
const sprite = ref();
const board = reactive(createBoard(BOARD_WIDTH,BOARD_HEIGHT))
const ctx = computed(()=>canvas.value.getContext('2d'))
const emit = defineEmits(['increasePoints','changeState'])
function rotatePiece () {
  const rotate = []
  for (let i = 0; i < currentBlock.value[0].length; i++) {
    const row = []
    for (let j = currentBlock.value.length-1; j >=0 ; j--) {
        row.push(currentBlock.value[j][i])
    }
    rotate.push(row)
  }
  if (!isCollider(rotate)){
    currentBlock.value = rotate
  }
}

const keyActions = {
  37: () => blockPos.X -= 1,
  39: () => blockPos.X += 1, //
  38: () => rotatePiece(),
  40: () => blockPos.Y += 1
};
function  cleanRows(){
  const removedRows = []
  board.forEach((row,y)=>{
    if(row.every(value => value!==0)){
        removedRows.push(y)
    }
  })
  removedRows.forEach(value => {
    board.splice(value,1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
    emit("increasePoints",10)
  })

}
function manageKeyBoard(event) {
  const action = keyActions[event.keyCode];
  if (action) action();
}
const cleanedBlock = computed({
  get(){
    let cleanedY = currentBlock.value.filter(v=>v.some(v2=>v2===1))
    let minimun = cleanedY[0].length;
    let maximun = 0;
    cleanedY.forEach(v=>{
      let index = v.findIndex(value => value==1)
      let last = v.findLastIndex(value => value==1)
      if (index<minimun) minimun = index;
      if (last>maximun) maximun = last;
    })
    return  cleanedY.map(value => value.slice(minimun,maximun+1))
  },
  set(newValue){
    currentBlock.value = newValue
  }
})
const blocksSprites = computed(()=>{
  return cleanedBlock.value.map(row=>row.map(v=>v?blockImages[Math.floor(Math.random()*blockImages.length)]:null))
})
watch(() => blockPos.X, (newX, oldX) => {
  if (isCollider(cleanedBlock.value) || newX < 0 || newX >= BOARD_WIDTH) {
    blockPos.X = oldX;

  } else {
    clearCanvas();
    drawBlock();
  }
});
function mergeBlock () {

  cleanedBlock.value.forEach((row,y)=>{
    row.forEach((v,x)=>{
      if (v===1) board[y+blockPos.Y][x+blockPos.X]=blocksSprites.value[y][x]
    })

  })
  clearCanvas()
  drawBoard();
}
function reset () {
  blockPos.X = BOARD_WIDTH/2;
  blockPos.Y = 0;
  props.swapBlokcs()
  if (isCollider(cleanedBlock.value)){
    emit('changeState',GameState.GAMEOVER)
  }
}
watch(() => blockPos.Y, (newY, oldY) => {

  if (isCollider(cleanedBlock.value) || newY < 0 || newY >= BOARD_HEIGHT) {
    blockPos.Y = oldY;
    mergeBlock()
    cleanRows()
    reset()
    return
  }
  clearCanvas()
  drawBlock()
});
function drawBlock(){
  ctx.value.beginPath();
  cleanedBlock.value.forEach((value,index) => value.forEach((value2,index2)=> value2 && ctx.value.drawImage(blocksSprites.value[index][index2],0,0,192,192,blockPos.X+index2,blockPos.Y+index,1,1)))
  ctx.value.closePath();
}
function clearCanvas(){
  ctx.value.clearRect(0,0,canvas.value.width,canvas.value.height)
  drawBoard()
}
onMounted(()=>{

  canvas.value.width = BLOCK_SIZE * BOARD_WIDTH
  canvas.value.height = BLOCK_SIZE * BOARD_HEIGHT
  blockPos.X = BOARD_WIDTH/2;
  blockPos.Y = 0;
  ctx.value.scale(BLOCK_SIZE, BLOCK_SIZE)
  window.addEventListener('keydown', manageKeyBoard)
})
onUnmounted(()=>{
  window.removeEventListener('keydown', manageKeyBoard)
})
function isCollider(pieces){
  return pieces.find((row, y) => {
    return row.find((value, x) => {
      return (
        value === 1 &&
        board[y + blockPos.Y]?.[x + blockPos.X] !== 0
      )
    })
  })
}
function drawBoard () {
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.value.drawImage(value,0,0,192,192,x,y,1,1)
      }
    })
  })
}

function update(){
  clearCanvas()
  drawBoard()

  blockPos.Y+=GRAVITY;


}
</script>
