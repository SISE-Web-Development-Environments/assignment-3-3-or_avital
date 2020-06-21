<template>
  <b-container class="container">
    <h1 class="title">Favorite recipes</h1>
    <b-row>
      <b-col class="col" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
     name: "FavoriteRecipesPage",
  components: {
    RecipePreview,
  },
  //   props: {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     recipeType: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes(this.recipeType);
  },
  methods: {
    async updateRecipes(type) {
      //   if (type && type == "favorite" && this.recipeType == type) {
      try {
        const response = await this.axios.get(
          "https://assignment-3-2-avital.herokuapp.com/profile/getFavoriteRecipes",
          { withCredentials: true }
        );

        // console.log(response);
        const recipe_dict = response.data;
        this.recipes = [];
        for (var recipe_id in recipe_dict) {
          var currRecipe = recipe_dict[recipe_id];
          currRecipe.id = recipe_id;
          this.recipes.push(currRecipe);
        }
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
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
