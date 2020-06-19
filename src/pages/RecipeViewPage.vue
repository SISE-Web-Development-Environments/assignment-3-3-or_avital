<template>
  <div class="container">
    <div v-if="recipe">
      <b-row>
        <b-col>
          <img :src="recipe.image" class="center" />
        </b-col>
        <b-col>
          <b-row align-v="center">
            <h1>{{ recipe.title }}</h1>
          </b-row>
          <b-row align-v="center">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>Vegetarian ?</div>
              <div>Vegan?</div>
              <div>Gluten Free?</div>
              <b-button>Add To Favorites</b-button>
              <div>Watched</div>
            </div>
          </b-row>
        </b-col>
      </b-row>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <Ingredients :ingretients="recipe.ingredients"></Ingredients>
          </div>
          <div class="wrapped">
            <Instructions :instructions="recipe.instructions"></Instructions>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";

export default {
  components: {
    Ingredients: Ingredients,
    Instructions: Instructions,
  },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      response = await this.axios.get(
        "https://assignment-3-2-avital.herokuapp.com/recipe/search/id/" +
          this.$route.params.recipeId
      );

      // console.log("response.status", response.status);
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
      }

      if (this.$root.store.username) {
        // user connected
        const addToWatched = await this.axios.post(
          "https://assignment-3-2-avital.herokuapp.com/profile/addRecipeToWatched",
          {
            recipeID: this.$route.params.recipeId,
            withCredentials: true,
          }
        );
      }

      let _recipe = response.data;
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
/* .recipe-header{

} */
</style>
