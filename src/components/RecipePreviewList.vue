<template>
  <b-container class="container">
    <b-col>
      <h3>
        {{ title }}
        <slot></slot>
      </h3>

      <b-row class="row" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
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
    };
  },
  mounted() {
    this.updateRecipes(this.recipeType);
  },
  methods: {
    async updateRecipes(type) {
      if (type && type == "random" && this.recipeType == type) {
        try {
          const response = await this.axios.get(
            "https://assignment-3-2-avital.herokuapp.com/recipe/random"
          );

          // console.log(response);
          const recipes = response.data.recipes;
          this.recipes = [];
          this.recipes.push(...recipes);
          // console.log(this.recipes);
        } catch (error) {
          console.log(error);
        }
      } else if (type && type == "last" && this.recipeType == type) {
        //CHANGE !!!!!last 3 recipes from DB !!!!!!!!!!!!!!!!!!!!!!
        try {
          const response = await this.axios.get(
            "https://assignment-3-2-avital.herokuapp.com/recipe/random"
          );

          // console.log(response);
          const recipes = response.data.recipes;
          this.recipes = [];
          this.recipes.push(...recipes);
          // console.log(this.recipes);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created: function() {
    this.$parent.$on("updateRecipes", this.updateRecipes);
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.row {
  padding: 10 px;
  border-style: dotted;
}
</style>
