<template>
  <div>
    <Header />
    <div class="container">
      <div v-if="recipe">
        <b-row>
          <b-col>
            <img :src="recipe.image" class="image" />
          </b-col>
          <b-col>
            <b-row align-v="center">
              <h1>{{ recipe.recipe_name }}</h1>
            </b-row>
            <b-row> Made by {{ recipe.family_member }} </b-row>
            <b-row> When made : {{ recipe.when_make }} </b-row>
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
  </div>
</template>

<script>
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import Header from "@/components/Header";

export default {
  components: {
    Ingredients: Ingredients,
    Instructions: Instructions,
    Header,
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
        "http://localhost:3000/profile/getFullFamilyRecipe/id/" +
          //"https://assignment-3-2-avital.herokuapp.com/recipe/search/id/" +
          this.$route.params.recipeId,
        {
          withCredentials: true,
        }
      );

      // console.log("response.status", response.status);
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
      }

      let _recipe = response.data;
      this.recipe = _recipe;
    } catch (error) {
      console.log(error.response);
    }
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 300px;
  height: 200px;
}

.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}

.container {
  padding-top: 10px;
}
</style>
