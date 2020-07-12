<template>
  <div>
    <h1>Instructions:</h1>

    <ol>
      <li v-for="s in instructions" :key="s.number">
        {{ s }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    instructions: Array,
  },
};
</script>

<style></style>
