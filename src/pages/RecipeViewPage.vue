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
            <img
              v-if="$root.store.username && recipe.watched"
              :src="require('@/images/eye.png')"
              height="40px"
              width="40px"
            />
          </b-row>
          <b-row>
            <img
              :src="require('@/images/clock_icon.png')"
              height="20px"
              width="20px"
            />Total time: {{ recipe.readyInMinutes }} minutes
          </b-row>
          <b-row>
            <img
              :src="require('@/images/heart.png')"
              height="20px"
              width="20px"
            />
            {{ recipe.aggregateLikes }} likes
          </b-row>
          <b-row>
            <b-col :class="{ notSomething: !recipe.vegetarian }">
              <img
                :src="require('@/images/vegetarian_icon.png')"
                height="40px"
                width="40px"
              />
            </b-col>
            <b-col :class="{ notSomething: !recipe.vegan }">
              <img
                :src="require('@/images/vegan_icon.png')"
                height="40px"
                width="40px"
              />
            </b-col>
            <b-col :class="{ notSomething: !recipe.glutenFree }">
              <img
                :src="require('@/images/gluten_free_icon.png')"
                height="40px"
                width="40px"
            /></b-col>
          </b-row>
          <b-row v-if="$root.store.username">
            <b-button :disabled="recipe.favorite" @click="addRecipeToFavortie">
              <p v-if="!recipe.favorite">add to favorites</p>
              <p v-else>already in favorites</p>
            </b-button>
          </b-row>

          <div>Watched</div>
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
      var recipe_dict_personal;
      if (this.$root.store.username) {
        // user connected
        const addToWatched = await this.axios.post(
          "https://assignment-3-2-avital.herokuapp.com/profile/addRecipeToWatched",
          {
            recipeID: this.$route.params.recipeId,
            withCredentials: true,
          }
        );

        const response_personal = await this.axios.get(
          "https://assignment-3-2-avital.herokuapp.com/profile/recipeInfo/[" +
            this.$route.params.recipeId +
            "]",
          { withCredentials: true }
        );
        recipe_dict_personal = response_personal.data;
      }

      let _recipe = response.data;
      this.recipe = _recipe;

      if (recipe_dict_personal) {
        this.recipe.watched = recipe_dict_personal[this.recipe.id].watched;
        this.recipe.favorite = recipe_dict_personal[this.recipe.id].favorite;
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addRecipeToFavortie() {
      try {
        this.recipe.favorite = true;
        const addToFavorites = await this.axios.post(
          "https://assignment-3-2-avital.herokuapp.com/profile/addRecipeToFavorties",
          {
            recipeID: this.recipe.id,
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error.response);
      }
    },
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

.notSomething {
  opacity: 0.4;
}
</style>
