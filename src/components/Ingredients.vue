<template>
  <div class="wrapped">
    Ingredients:
    <ul>
      <li v-for="(r, index) in ingretients" :key="index + '_' + r.id">
        {{ r.original }}
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
