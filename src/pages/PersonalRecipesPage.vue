<template>
  <b-container class="container">
    <Header />
    <h1 class="title">My personal recipes</h1>
    <b-col class="col">
      <RecipePreviewTable
        title="Browse for personal Recipes"
        recipeType="personal"
        class="PersonalRecipes center"
      />
    </b-col>
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
  created() {
    if (!this.$cookies.get("session")) {
      this.$router.push({ name: "main" });
    }
  },
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
