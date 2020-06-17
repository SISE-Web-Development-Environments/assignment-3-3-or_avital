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
            <Ingredients
              :ingretients="recipe.extendedIngredients"
            ></Ingredients>
          </div>
          <div class="wrapped">
            <Instructions :instructions="recipe._instructions"></Instructions>
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

      try {
        response = await this.axios.get(
          "https://test-for-3-2.herokuapp.com/recipes/info",
          {
            params: { id: this.$route.params.recipeId },
          }
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
      };

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
