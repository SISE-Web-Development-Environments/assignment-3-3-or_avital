<template>
  <b-container class="container">
    <b-col>
      <h1>
        {{ title }}
        <slot></slot>
      </h1>
      <div v-if="recipeType == 'last' && this.isEmpty === true">
        you haven't watched recipes yet
      </div>
      <div v-else>
        <b-row class="row" v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipeType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
      isEmpty: false,
    };
  },
  mounted() {
    this.updateRecipes(this.recipeType);
  },
  methods: {
    async updateRecipes(type) {
      try {
        var recipe_dict;
        if (type && type == "random" && this.recipeType == type) {
          // get 3 random recipes for home page
          const response = await this.axios.get(
            "http://localhost:3000/recipe/random",
            //"https://assignment-3-2-avital.herokuapp.com/recipe/random",
            { withCredentials: true }
          );
          recipe_dict = response.data;
        } else if (type && type == "last" && this.recipeType == type) {
          // get last 3 watched... for logged in users
          const response_last3 = await this.axios.get(
            "http://localhost:3000/profile/getLast3Recipes",
            //"https://assignment-3-2-avital.herokuapp.com/profile/getLast3Recipes",
            { withCredentials: true }
            //
          );

          recipe_dict = response_last3.data;
        }
        var recipe_dict_personal;
        if (this.$cookies.get("session")) {
          // if user in connected- add watched and favorites button
          var recipe_ids = Object.keys(recipe_dict);
          const response_personal = await this.axios.get(
            "http://localhost:3000/profile/recipeInfo/[" +
              //"https://assignment-3-2-avital.herokuapp.com/profile/recipeInfo/[" +
              recipe_ids +
              "]",
            { withCredentials: true }
          );
          recipe_dict_personal = response_personal.data;
        }
        this.recipes = [];
        for (var recipe_id in recipe_dict) {
          var currRecipe = recipe_dict[recipe_id];
          currRecipe.id = recipe_id;
          if (recipe_dict_personal) {
            // not undifiend
            currRecipe.watched = recipe_dict_personal[recipe_id].watched;
            currRecipe.favorite = recipe_dict_personal[recipe_id].favorite;
          }
          this.recipes.push(currRecipe);
        }

        if (
          type == "last" &&
          (!Array.isArray(this.recipes) || !this.recipes.length) // if no last watched recipes
        ) {
          // empty arr
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  created: function() {
    //this.$parent.$on("updateRecipes", this.updateRecipes);
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.row {
  padding-top: 10px;
  align-items: center;
  height: 50%;
  width: 80%;
}
</style>
