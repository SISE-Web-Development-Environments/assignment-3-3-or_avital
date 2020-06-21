<template>
  <b-container class="container">
    <Header />
    <h1 class="title">Main Page</h1>
    <b-row>
      <b-col class="col">
        <RecipePreviewList
          title="Browse for new Recipes to Cook"
          recipeType="random"
          class="RandomRecipes center"
        />
        <br />
        <b-button variant="info" @click="NewRandomRecipes"
          >Watch 3 New Recipes!</b-button
        >
      </b-col>
      <b-col class="col">
        <div v-if="!$root.store.username">
          <!-- User Not Connected!!!!! -->
          <Login title="log in" />
        </div>
        <div v-else>
          <RecipePreviewList
            title="Your Last Viewed Recipes"
            recipeType="last"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
            disabled
          ></RecipePreviewList>
        </div>
      </b-col>

      <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Header from "../components/Header";
import Login from "../components/Login";
export default {
  components: {
    RecipePreviewList,
    Header,
    Login,
  },
  methods: {
    NewRandomRecipes() {
      this.$emit("updateRecipes", "random");
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.col {
  border-style: dotted;
}
</style>
