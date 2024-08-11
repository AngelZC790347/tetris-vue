<template>
  <div class="root">
    <header>
      <section>
        <div></div>
        <div></div>
        <div>
          <h1>SCORE</h1>
        </div>
      </section>
      <section>
        <span>
          {{ score }}
        </span>
      </section>
    </header>
    <main>
      <ScreenInfo title="level" :value="level"></ScreenInfo>
      <ScreenInfo title="lines" :value="lines"></ScreenInfo>
      <NextTrickScreen :nextTrick="nextTrick"></NextTrickScreen>
    </main>
  </div>
</template>
<style scoped>
.root {
  background-color: rgba(196, 203, 160, 1);
  border-left: solid 5px transparent;
}
header {
  height: 300px;
  @media (max-width: 375px) {
    height: 200px;
  }
}
section {
  height: 30%;
  background-color: rgba(196, 203, 160, 1);
  color: black;
}
header section:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  @media (max-width: 375px) {
   font-size: large;
  }
  font-weight:bold;
  border-block: 5px solid black;
}
header section:first-child {
  height: 60%;
  position: relative;
  box-sizing: border-box;
  & div {
    width: 100%;
  }
  & div:nth-child(3) {
    position: absolute;
    top: 40%;
    left: 30%;
    @media (max-width:375px) {
      width: 100px;
      top: 45%;
      left: 20%;
    }
    width: 200px;
    background-color: rgba(196, 203, 160, 1);
    color: black;
    padding: 4px;
    border-radius: 10px;
    box-sizing: border-box;
    h1 {
      border-radius: 10px;
      border: 5px solid black;
      font-size: 3em;
      @media (max-width:409px) {
        font-size: 1em;
      }
    }
  }

  & div:nth-child(1) {
    height: 60%;
    background-color: black;
    border-bottom: solid 5px rgba(196, 203, 160, 1);
    border-left: solid 0px rgba(196, 203, 160, 1);
    box-sizing: border-box;
  }
  & div:nth-child(2) {
    height: 40%;
    background-color: rgb(86, 86, 86);
    border-bottom: solid 5px rgba(196, 203, 160, 1);
    border-left: solid 0px rgba(196, 203, 160, 1);
    box-sizing: border-box;
  }
}
h1 {
  margin: 0;
}
main {
  background-color: black;

  display: grid;
  gap: 5px;
  padding-block: 2px;
  grid-template-rows: 1fr 1fr 1.8fr;
  height: auto;
  padding: 15px;
  @media (max-width: 375px) {
    padding-block: 20px;
    padding-top: 10px;
  }
  * {
    width: 50%;
    @media (max-width: 375px) {
      width: 80%;
    }
    margin: 1% auto;
    box-sizing: border-box;
  }
}
</style>
<script setup>
import ScreenInfo from './ScreenInfo.vue';
import NextTrickScreen from './NextTrickScreen.vue';
import { computed, ref } from 'vue'
const lines = 0;
const props = defineProps({
  nextBlock : Array,
  score:Number,
  level:Number
})

const nextTrick = computed(()=>{
  return props.nextBlock.map(v=>{
    return v.map(v2=>v2===0?"◻️":'🟪').join('')
  }).join('\n')
});
</script>
