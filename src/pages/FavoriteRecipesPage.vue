<template>
  <b-container class="container">
    <Header />
    <h1 class="title">Favorite recipes</h1>
    <b-row>
      <!-- <b-col class="col" v-for="r in Math.ceil(recipes.length / 4)" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" /> -->
      <b-col class="col">
        <RecipePreviewTable
          title="Browse for favorite Recipes"
          recipeType="favorite"
          class="FavoriteRecipes center"
        />
        <br />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewTable from "../components/RecipePreviewTable.vue";
import Header from "../components/Header";
export default {
  components: {
    RecipePreviewTable,
    Header,
  },
  mounted() {
    // this.updateRecipes(this.recipeType);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.row {
  padding: 10 px;
  align-items: center;
}
</style>
