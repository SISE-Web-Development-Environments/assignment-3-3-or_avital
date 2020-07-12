<template>
  <div class="recipeprev">
    <b-card
      class="card mb-2"
      header-border-variant="danger"
      align="center"
      text-variant="black"
      no-gutters
    >
      <router-link
        :to="{
          name: 'fullRecipePage',
          params: { recipeId: recipe.id, likeCount: recipe.aggregateLikes },
        }"
        class="recipe-preview"
      >
        <b-card-img alt="Image" :src="recipe.image" img-top />
      </router-link>
      <b-card-body class="body" no-gutters>
        <b-card-title :title="recipe.title" class="title">
          <p>{{ recipe.title }}</p>
        </b-card-title>
        <b-row class="row" no-gutters>
          <b-col
            ><img
              :src="require('@/images/clock_icon.png')"
              height="20px"
              width="20px"
            />
            {{ recipe.readyInMinutes }} minutes
          </b-col>
          <b-col v-if="recipe.aggregateLikes">
            <img
              :src="require('@/images/heart.png')"
              height="20px"
              width="20px"
            />
            {{ recipe.aggregateLikes }} likes</b-col
          >
        </b-row>
        <b-row class="row" no-gutters>
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
        <b-row
          v-if="$cookies.get('session') && recipe.aggregateLikes >= 0"
          class="row justify-content-center"
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
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    // recipeType: {
    //   type: String,
    //   required: true,
    // },
  },
  mounted() {
    // this.updateType(this.recipeType);
  },
  methods: {
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
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  updateType() {},
};
</script>

<style scoped>
.recipeprev {
  width: 100%;
  height: 100%;
}

.card {
}
.recipe-preview {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  color: #000000;
  text-decoration: none;
  margin: 0px;
  padding: 0px;
}

.recipe-preview:hover {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}

.recipe-preview:hover .image {
  opacity: 0.5;
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.card {
  width: 100%;
  height: 100%;
  display: block;
  color: #000000;
  text-decoration: none;
  margin: 0 auto;
}

.title {
  font-size: 1.2vw;
  margin: 0 auto;
  min-height: 4rem;
  font-weight: bold;
  height: 3rem;
}

.body {
  margin: 0;
  padding: 0px;
}

.notSomething {
  opacity: 0.4;
}

.favorite_btn {
  font-size: 14px;
  padding: 5px 10px;
}
</style>
