<template>
  <div class="root">
    <div>
      <h1>{{ title }}</h1>
      <h2>{{ value }}</h2>
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

    * {
      margin: 0;

    }

    h2 {
      text-align: end;
      padding-inline: 35%;
    }

  }
}
</style>
<script setup>
defineProps({
  title: String,
  value: String,
});
</script>
