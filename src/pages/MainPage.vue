<template>
  <div :key="update_key">
    <Header />
    <b-container class="container">
      <b-row>
        <b-col class="col">
          <RecipePreviewList
            title="Browse new recipes"
            recipeType="random"
            class="RandomRecipes center"
          />
          <br />

          <b-button variant="info" @click="NewRandomRecipes" id="button"
            >Watch 3 New Recipes!</b-button
          >
        </b-col>
        <b-col class="col">
          <div v-if="!$cookies.get('session')">
            <!-- User Not Connected!!!!! -->
            <Login title="log in" @loggedin="updateHomePage" />
          </div>
          <div v-else>
            <RecipePreviewList
              title="Last viewed recipes"
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
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "../components/Login";
import Header from "@/components/Header";

export default {
  data() {
    return {
      update_key: 0,
    };
  },
  components: {
    RecipePreviewList,
    Login,
    Header,
  },
  methods: {
    NewRandomRecipes() {
      this.$emit("updateRecipes", "random");
    },
    updateHomePage() {
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

#button {
  background: rgb(201, 154, 110);
  border: 2px solid rgb(199, 139, 82);
  margin-left: 120px;
  margin-bottom: 30px;
}

#button:hover {
  background: rgb(187, 123, 63);
  border: 2px solid rgb(199, 139, 82);
}
</style>
