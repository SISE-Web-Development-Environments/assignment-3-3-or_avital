<template>
  <div>
    <Header />
    <div class="container" :key="pagekey">
      <div v-if="recipe">
        <b-row>
          <b-col>
            <img :src="recipe.image" class="center" />
          </b-col>
          <b-col>
            <b-row align-v="center" class="row">
              <h1>
                {{ recipe.title }}
                <img
                  v-if="$cookies.get('session') && recipe.watched"
                  :src="require('@/images/eye.png')"
                  height="40px"
                  width="40px"
                />
              </h1>
            </b-row>
            <b-row class="row">
              <img
                :src="require('@/images/clock_icon.png')"
                height="20px"
                width="20px"
              />Total time: {{ recipe.readyInMinutes }} minutes
            </b-row>
            <b-row v-if="recipe.aggregateLikes" class="row">
              <img
                :src="require('@/images/heart.png')"
                height="20px"
                width="20px"
              />
              {{ recipe.aggregateLikes }} likes
            </b-row>
            <b-row class="row">
              <b-col :class="{ notSomething: !recipe.vegetarian }" cols="2">
                <img
                  :src="require('@/images/vegetarian_icon.png')"
                  height="40px"
                  width="40px"
                />
              </b-col>
              <b-col :class="{ notSomething: !recipe.vegan }" cols="2">
                <img
                  :src="require('@/images/vegan_icon.png')"
                  height="40px"
                  width="40px"
                />
              </b-col>
              <b-col :class="{ notSomething: !recipe.glutenFree }" cols="2">
                <img
                  :src="require('@/images/gluten_free_icon.png')"
                  height="40px"
                  width="40px"
              /></b-col>
            </b-row>
            <b-row
              v-if="$cookies.get('session') && recipe.aggregateLikes >= 0"
              id="favorite"
            >
              <b-button
                :disabled="recipe.favorite"
                @click="addRecipeToFavortie"
                class="favorite_btn"
              >
                <a v-if="!recipe.favorite">add to favorites</a>
                <a v-else>already in favorites</a>
              </b-button>
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
      pagekey: 1,
    };
  },
  mounted() {
    // this.checkType(this.recipeType);
  },
  async created() {
    try {
      let response;
      console.log(this.$route.params.recipeId);
      console.log(this.$route.params.likeCount);
      if (!(this.$route.params.likeCount >= 0)) {
        console.log("is personal recipe! ");
        response = await this.axios.get(
          // /profile/getFullPersonalRecipe/id/:id:
          "http://localhost:3000/profile/getFullPersonalRecipe/id/" +
            //"https://assignment-3-2-avital.herokuapp.com/profile/getFullPersonalRecipeid/id/" +
            this.$route.params.recipeId,
          {
            withCredentials: true,
          }
        );
        // console.log("response.status", response.status);
        if (response.status !== 200) {
          this.$router.replace("/NotFound");
        }
        console.log("succes get recupe from DB"); // dell

        let _recipe = response.data;
        this.recipe = _recipe;
      } else {
        console.log("not personal recipe! ");
        response = await this.axios.get(
          ///recipes/search/id/:recipeID
          "http://localhost:3000/recipe/search/id/" +
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
        var recipe_dict_personal;
        if (this.$cookies.get("session")) {
          // user connected

          const response_personal = await this.axios.get(
            "http://localhost:3000/profile/recipeInfo/[" +
              // "https://assignment-3-2-avital.herokuapp.com/profile/recipeInfo/[" +
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

        //add to watched
        if (this.$route.params.likeCount >= 0) {
          const addToWatched = await this.axios.post(
            "http://localhost:3000/profile/addRecipeToWatched",
            //"https://assignment-3-2-avital.herokuapp.com/profile/addRecipeToWatched",
            {
              recipeID: this.$route.params.recipeId,
              withCredentials: true,
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    checkType() {},
    async addRecipeToFavortie() {
      try {
        this.recipe.favorite = true;
        const addToFavorites = await this.axios.post(
          "http://localhost:3000/profile/addRecipeToFavorties",
          //  "https://assignment-3-2-avital.herokuapp.com/profile/addRecipeToFavorties",
          {
            recipeID: this.recipe.id,
            withCredentials: true,
          }
        );
        this.pagekey = this.pagekey + 1;
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
  padding-top: 20px;
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

.container {
  padding-top: 10px;
}

.row {
  padding: 3px;
}

img {
  margin-right: 5px;
}

.favorite_btn {
  font-size: 16px;
  padding: 5px 5px;
  background: rgb(153, 204, 111);
  border: 2px solid rgb(131, 184, 101);
}

.favorite_btn:hover {
  background: rgb(131, 184, 101);
  border: 2px solid rgb(131, 184, 101);
}

.favorite_btn:disabled {
  background: rgb(131, 184, 101);
  border: 2px solid rgb(131, 184, 101);
}

#favorite {
  padding-top: 100px;
}
</style>
