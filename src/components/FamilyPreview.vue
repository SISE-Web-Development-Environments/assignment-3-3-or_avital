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
      <b-row class="row justify-content-md-center">
        <img
          :src="require('@/images/bake_icon.png')"
          height="20px"
          width="20px"
        />Made by: {{ recipe.family_member }}
      </b-row>
      <b-row class="row justify-content-md-center">
        <img
          :src="require('@/images/clock_icon.png')"
          height="20px"
          width="20px"
        />
        {{ recipe.when_make }}
      </b-row>
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
  width: 100%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  color: #000000;
  text-decoration: none;
  margin: 0px;
  padding: 0px;
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
  width: 300px;
  height: 200px;
  position: relative;
}

.title {
  font-size: 1.5vw;
  margin: 0 auto;
  font-weight: bold;
  color: #3c9448;
}
</style>
