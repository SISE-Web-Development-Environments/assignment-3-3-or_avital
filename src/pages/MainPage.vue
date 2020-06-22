<template>
  <b-container class="container" :key="update_key">
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
        <router-link v-if="!$cookies.get('session')" to="/login" tag="button"
          >You need to Login to vue this</router-link
        >
        <b-button variant="info" @click="NewRandomRecipes"
          >Watch 3 New Recipes!</b-button
        >
      </b-col>
      <b-col class="col">
        <div v-if="!$cookies.get('session')">
          <!-- User Not Connected!!!!! -->
          <Login title="log in" @loggedin="updateRightCol" />
        </div>
        <div v-else>
          <RecipePreviewList
            title="Last Viewed Recipes"
            recipeType="last"
            :class="{
              RandomRecipes: true,
              blur: !$cookies.get('session'),
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
  data() {
    return {
      update_key: 0,
    };
  },
  components: {
    RecipePreviewList,
    Header,
    Login,
  },
  methods: {
    NewRandomRecipes() {
      this.$emit("updateRecipes", "random");
    },
    updateRightCol() {
      this.update_key = this.update_key + 1;
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
