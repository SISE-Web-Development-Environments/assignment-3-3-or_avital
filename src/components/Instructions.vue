<template>
  <div>
    Instructions:
    <ol>
      <li v-for="s in instructions" :key="s.number">
        {{ s.step }}
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
