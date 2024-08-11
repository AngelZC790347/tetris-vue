<script setup>
import {useLevel} from './composables/level.js'

defineProps({
  nextBlock: Array,
  currentBlock: Array,
  swapBlock : Function,
  changeState:Function,
  finished:Boolean
})
const {points, level, levelColor}= useLevel()
import TableGame from './components/TableGame.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import GameBoyScreenContainer from './GameBoyScreenContainer.vue'
</script>

<template>
  <main
  >

    <TableGame  :finished="finished" @increasePoints="(n)=>points+=n" @change-state="v=>changeState(v)" :current-block="currentBlock" :swap-blokcs="swapBlock"/>
    <ScoreBoard :score="points" :level="level" :next-block="nextBlock" />
  </main>
</template>

<style scoped>

main {
  --level-color:v-bind(levelColor);
  display: grid;
  grid-template-columns: 60% 40%;
  max-width: 1360px;
  margin: 0 auto;
  height: max-content;
}
</style>