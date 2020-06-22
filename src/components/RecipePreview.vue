<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <b-card
      class="card"
      bg-variant="light"
      header-border-variant="danger"
      align="center"
      text-variant="black"
    >
      <b-card-img
        :src="recipe.image"
        img-top
        img-width="150"
        img-height="240"
        class="image"
      />
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
          <b-col>
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
          <b-col v-if="$cookies.get('session')">
            <b-button>
              <!-- see button only if not in favorties already-->
              add to favorites
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </router-link>
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

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 70%;
  height: 80%;
  position: relative;
  margin: 10px 10px;
  color: #000000;
  text-decoration: none;
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
  max-width: 100%;
  max-height: 100%;
  display: block;
  color: #000000;
  text-decoration: none;
  margin: 0 auto;
}

.title {
  font-size: 20px;
  margin: 0 auto;
  font-weight: bold;
}

.body {
  margin: 0;
  padding: 0px;
}

.row:hover {
  color: #00a0c6;
  text-decoration: none;
  cursor: pointer;
}

.notSomething {
  opacity: 0.4;
}
</style>
