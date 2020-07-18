<template>
  <b-container class="container">
    <b-row>
      <div v-if="this.isEmpty === true">
        you don't have recipes of this kind yet
      </div>
      <div v-else>
        <b-row class="row" v-for="i in countOfRow" :key="i">
          <b-col
            class="col"
            cols="4"
            v-for="r in CounterItemsInCurrRow(i)"
            :key="r.id"
          >
            <RecipePreview :recipe="r"></RecipePreview>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewTable",
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
      defineNumOfItemsInRow: 3,
      isEmpty: false,
    };
  },
  computed: {
    countOfRow: function() {
      var arrRcipeLength = this.recipes.length;
      var numRows = this.defineNumOfItemsInRow;
      return Math.ceil(arrRcipeLength / numRows);
    },
  },
  mounted() {
    this.updateRecipes(this.recipeType);
  },
  methods: {
    async updateRecipes(type) {
      try {
        var recipe_dict;
        if (
          type &&
          type == "favorite" &&
          this.recipeType == type &&
          this.$cookies.get("session")
        ) {
          const response = await this.axios.get(
            "http://localhost:3000/profile/getFavoriteRecipes",
            //"https://assignment-3-2-avital.herokuapp.com/profile/getFavoriteRecipes",
            { withCredentials: true }
            //
          );

          recipe_dict = response.data;
          var recipe_dict_personal_info;

          if (this.$cookies.get("session")) {
            // if conect
            var recipe_ids = Object.keys(recipe_dict);
            const response_personal = await this.axios.get(
              "http://localhost:3000/profile/recipeInfo/[" +
                //"https://assignment-3-2-avital.herokuapp.com/profile/recipeInfo/[" +
                recipe_ids +
                "]",
              { withCredentials: true }
            );
            recipe_dict_personal_info = response_personal.data;
          }
          //
          this.recipes = [];
          for (var recipe_id in recipe_dict) {
            var currRecipe = recipe_dict[recipe_id];
            currRecipe.id = recipe_id;
            if (recipe_dict_personal_info) {
              // not undifiend
              currRecipe.watched = recipe_dict_personal_info[recipe_id].watched;
              currRecipe.favorite =
                recipe_dict_personal_info[recipe_id].favorite;
            }
            this.recipes.push(currRecipe);
          }
        } else if (
          type &&
          type == "personal" &&
          this.recipeType == type &&
          this.$cookies.get("session")
        ) {
          if (localStorage.personal_recipes) {
            console.log("inside");
            this.recipes = JSON.parse(localStorage.personal_recipes);
          } else {
            const response_personal_recipes = await this.axios.get(
              "http://localhost:3000/profile/getAllPersonalRecipesSummary",
              //"https://assignment-3-2-avital.herokuapp.com/profile/getAllPersonalRecipesSummary",
              { withCredentials: true }
              //
            );
            recipe_dict = response_personal_recipes.data;
            this.recipes = [];
            for (var recipe_id in recipe_dict) {
              var currRecipe = recipe_dict[recipe_id];
              currRecipe.id = recipe_id;
              this.recipes.push(currRecipe);
            }

            localStorage.personal_recipes = JSON.stringify(this.recipes);
          }
        } else if (type && type == "search" && this.recipeType == type) {
          this.recipes = this.$parent.search_results;
        }
        if (!Array.isArray(this.recipes) || !this.recipes.length) {
          // recipes is empty
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    CounterItemsInCurrRow(index) {
      var currIndex = index - 1;
      var in1 = currIndex * this.defineNumOfItemsInRow;
      var in2 = index * this.defineNumOfItemsInRow;
      return this.recipes.slice(in1, in2);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.row {
  align-items: center;
  // padding-right: 20px;
}
.col {
  // border-style: dotted;
  align-items: center;
  padding-top: 20px;
  padding-right: 180px;
  // padding: 100px;
}
</style>
