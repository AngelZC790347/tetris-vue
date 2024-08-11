<script setup>
import {  ref } from 'vue'
import { GameState, randomBlock } from './logic.js';
import PlayButton from './components/PlayButton.vue';
import GameBoyScreen from './GameBoyScreen.vue';
  const nextBlock = ref([]);
const currentBlock = ref([]);
const gameState = ref(null);
function swapBlock(){
  currentBlock.value = nextBlock.value;
  nextBlock.value = randomBlock();
}
function changeState(newValue){
  gameState.value = newValue
}
function startGame() {
  gameState.value = GameState.PLAYING;
  nextBlock.value = randomBlock();
  currentBlock.value = randomBlock()
}
function restart(){
  gameState.value = null;
}

</script>

<template>

    <GameBoyScreen :finished="gameState===GameState.GAMEOVER" :change-state="changeState" :swapBlock="swapBlock" :currentBlock="currentBlock" :next-block="nextBlock" v-if="gameState !== null" :class="{ game: gameState == GameState.PLAYING }"></GameBoyScreen>
    <main v-else>
      <PlayButton :click="startGame">Start Game</PlayButton>
    </main>
    <aside class="modal" v-if="gameState === GameState.GAMEOVER">
      <div class="modal-body">
        <h2>Game Over  😢</h2>
        <p>
          <button @click="restart">Restart</button>
        </p>
      </div>
    </aside>
  <footer>
    <span>Designed by Angel Z</span>
  </footer>
</template>

<style scoped>

footer{
  margin-top: 100px;
}
.modal {
  display: grid;
  place-content: center;
  position: absolute;
  background: rgba(0,0,0,0.7);
  inset: 0;
  margin: auto;
  color: white;

}
.modal-body{
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  border: solid 1px white;
  border-radius: 10px;
  background: #1a1a1a;
  button{
    padding: 13px 59px;
    background: #4b4a4a;
    font-size: large;
    cursor: default;
    &:active{
      background: #535bf2;
    }
  }
}
</style>
