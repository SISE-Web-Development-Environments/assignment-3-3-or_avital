<template>
  <div class="wrapped">
    <h1>Ingredients:</h1>

    <ul>
      <li v-for="(r, index) in ingretients" :key="index + '_' + r.id">
        {{ r }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    ingretients: Array,
  },
};
</script>

<style></style>
