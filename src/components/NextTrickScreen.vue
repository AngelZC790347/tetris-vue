<template>
  <div class="root">
    <div>
      <p style="white-space: pre-wrap">
        {{ nextTrick}}
      </p>
    </div>
  </div>
</template>

<style scoped>
.root {
  border: 5px solid var(--level-color);
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  div {
    border: 5px solid black;
    border-radius: 5px;
    font-weight: 100;
    color: black;
    text-transform: uppercase;
    height: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
<script setup>
defineProps({
  nextTrick: String,
});
</script>
