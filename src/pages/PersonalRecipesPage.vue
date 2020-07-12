<template>
  <div>
    <b-container class="container">
      <h1 class="title">My personal recipes</h1>
      <b-row>
        <b-col class="col">
          <RecipePreviewTable
            title="Browse for personal Recipes"
            recipeType="personal"
            class="PersonalRecipes center"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipePreviewTable from "../components/RecipePreviewTable.vue";
export default {
  components: {
    RecipePreviewTable,
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
