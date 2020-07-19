<template>
  <div>
    <Header />
    <b-container class="container">
      <h1 class="title">Your favorite recipes</h1>
      <b-row>
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
  </div>
</template>

<script>
import RecipePreviewTable from "../components/RecipePreviewTable.vue";
import Header from "@/components/Header";

export default {
  components: {
    RecipePreviewTable,
    Header,
  },
  mounted() {
    if (!this.$cookies.get("session")) {
      this.$root.store.logout();
      this.$router.push({ name: "main" });
    }
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
