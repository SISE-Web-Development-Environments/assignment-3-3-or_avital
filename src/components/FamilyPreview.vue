<template>
  <b-card
    class="card"
    bg-variant="light"
    header-border-variant="danger"
    align="center"
    text-variant="black"
  >
    <router-link
      :to="{ name: 'fullFamilyRecipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <b-card-img :src="recipe.image" img-top class="image" />
    </router-link>
    <b-card-body class="body" no-gutters>
      <b-card-title :title="recipe.title" class="title">
        <p>{{ recipe.recipe_name }}</p>
      </b-card-title>
      <b-row class="row"> Made by: {{ recipe.family_member }} </b-row>
      <b-row class="row"> Time: {{ recipe.when_make }} </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 70%;
  height: 80%;
  position: relative;
  margin: 10px 10px;
  color: #000000;
  text-decoration: none;
}

.recipe-preview:hover {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}

.recipe-preview:hover .image {
  opacity: 0.5;
}

.card {
  max-width: 100%;
  max-height: 100%;
  color: #000000;
  text-decoration: none;
  margin: 0 auto;
}

.title {
  font-size: 20px;
  margin: 0 auto;
  font-weight: bold;
}

.body {
  margin: 0;
  padding: 0px;
}

.notSomething {
  opacity: 0.4;
}

.image {
  width: 200px;
  height: 200px;
  position: relative;
}
</style>
