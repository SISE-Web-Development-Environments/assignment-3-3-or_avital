<template>
  <div>
    <Header />
    <b-container class="container">
      <h1 class="title">Family recipes</h1>
      <b-row>
        <b-col class="row" v-for="r in family_recipes" :key="r.id">
          <FamilyPreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
//familyPrev
import FamilyPreview from "../components/FamilyPreview";
import Header from "../components/Header";
export default {
  components: {
    FamilyPreview,
    Header,
  },
  data() {
    return {
      family_recipes: [],
    };
  },

  async created() {
    try {
      if (!this.$cookies.get("session")) {
        this.$router.push({ name: "main" });
      } else {
        let response;
        // response = this.$route.params.response;
        response = await this.axios.get(
          "http://localhost:3000/profile/getAllFamilyRecipesSummary",
          //"https://assignment-3-2-avital.herokuapp.com/recipe/search/id/" +
          {
            withCredentials: true,
          }
        );

        var family_dict = response.data;
        this.family_recipes = [];
        for (var recipe_id in family_dict) {
          var currRecipe = family_dict[recipe_id];
          currRecipe.id = recipe_id;
          this.family_recipes.push(currRecipe);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
