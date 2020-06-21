<template>
  <div class="container">
    <h1>Search Page</h1>
    <b-row>
      <b-col>
        <b-form-input
          placeholder="Search"
          v-model="search_string"
        ></b-form-input>
        <div class="mt-3">
          <strong>{{ search_string }}</strong>
        </div>
      </b-col>
      <b-col>
        <b-form-select v-model="num_of_recipes">
          <b-form-select-option :value="5">5</b-form-select-option>
          <b-form-select-option :value="10">10</b-form-select-option>
          <b-form-select-option :value="15">15</b-form-select-option>
        </b-form-select>
        <div class="mt-3">
          Selected: <strong>{{ num_of_recipes }}</strong>
        </div>
      </b-col>
      <b-col>
        <b-form-select v-model="cuisine_selected" :options="cuisines">
        </b-form-select>
        <div class="mt-3">
          Selected: <strong>{{ cuisine_selected }}</strong>
        </div>
      </b-col>
      <b-col>
        <b-form-select v-model="diet_selected" :options="diets">
        </b-form-select>
        <div class="mt-3">
          Selected: <strong>{{ diet_selected }}</strong>
        </div></b-col
      >
      <b-col>
        <b-form-select v-model="intolerance_selected" :options="intolerances">
        </b-form-select>
        <div class="mt-3">
          Selected: <strong>{{ intolerance_selected }}</strong>
        </div>
      </b-col>
      <b-col>
        <b-button @click="SendSearch" :disabled="!search_string.length">
          Send
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-form-select
        v-model="sortby_selected"
        @change="sortby"
        :disabled="!search_results || !search_results.length"
      >
        <b-form-select-option :value="null" disabled
          >--Sort By --</b-form-select-option
        >
        <b-form-select-option value="time_high"
          >Sort by time high to low</b-form-select-option
        >
        <b-form-select-option value="time_low"
          >Sort by time low to high</b-form-select-option
        >
        <b-form-select-option value="like_high"
          >sort by popular high to low</b-form-select-option
        >
        <b-form-select-option value="like_low"
          >sort by popular low to how</b-form-select-option
        >
      </b-form-select>
    </b-row>
    <b-row v-if="search_results.length">
      <strong>{{ search_results }}</strong>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cuisine_selected: null,
      cuisines: [
        { value: null, text: "-- Select Cuisine --" },
        { value: "African", text: "African" },
        { value: "British", text: "British" },
        { value: "Cajun", text: "Cajun" },
        { value: "Caribbean", text: "Caribbean" },
        { value: "Chinese", text: "Chinese" },
        { value: "Eastern European", text: "Eastern European" },
        { value: "French", text: "French" },
        { value: "German", text: "German" },
        { value: "Greek", text: "Greek" },
        { value: "Indian", text: "Indian" },
        { value: "Irish", text: "Irish" },
        { value: "Italian", text: "Italian" },
        { value: "Japanese", text: "Japanese" },
        { value: "Jewish", text: "Jewish" },
        { value: "Korean", text: "Korean" },
        { value: "Latin American", text: "Latin American" },
        { value: "Mediterranean", text: "Mediterranean" },
        { value: "Mexican", text: "Mexican" },
        { value: "Middle Eastern", text: "Middle Eastern" },
        { value: "Nordic", text: "Nordic" },
        { value: "Southern", text: "Southern" },
        { value: "Spanish", text: "Spanish" },
        { value: "Thai", text: "Thai" },
        { value: "Vietnamese", text: "Vietnamese" },
      ],
      diet_selected: null,
      diets: [
        { value: null, text: "-- Select Diet --" },
        { value: "Gluten Free", text: "Gluten Free" },
        { value: "Ketogenic", text: "Ketogenic" },
        { value: "Vegetarian", text: "Vegetarian" },
        { value: "Lacto-Vegetarian", text: "Lacto-Vegetarian" },
        { value: "Ovo-Vegetarian", text: "Ovo-Vegetarian" },
        { value: "Vegan", text: "Vegan" },
        { value: "Pescetarian", text: "Pescetarian" },
        { value: "Paleo", text: "Paleo" },
        { value: "Primal", text: "Primal" },
        { value: "Whole30", text: "Whole30" },
      ],
      intolerance_selected: null,
      intolerances: [
        { value: null, text: "-- Select Intolerance --" },
        { value: "Dairy", text: "Dairy" },
        { value: "Egg", text: "Egg" },
        { value: "Gluten", text: "Gluten" },
        { value: "Grain", text: "Grain" },
        { value: "Peanut", text: "Peanut" },
        { value: "Seafood", text: "Seafood" },
        { value: "Sesame", text: "Sesame" },
        { value: "Shellfish", text: "Shellfish" },
        { value: "Soy", text: "Soy" },
        { value: "Sulfite", text: "Sulfite" },
        { value: "Tree Nut", text: "Tree Nut" },
        { value: "Wheat", text: "Wheat" },
      ],
      num_of_recipes: 5,
      search_results: null,
      search_string: "",
      sortby_selected: null,
    };
  },
  methods: {
    async SendSearch() {
      console.log("send search");
      try {
        const response = await this.axios.get(
          "https://assignment-3-2-avital.herokuapp.com/recipe/search/query/" +
            this.search_string +
            "/amount/" +
            this.num_of_recipes +
            "",
          {
            params: this.search_params,
            withCredentials: true,
          }
        );
        var results_dic = response.data;

        var recipe_dict_personal;
        if (this.$root.store.username) {
          var recipe_ids = Object.keys(results_dic);
          const response_personal = await this.axios.get(
            "https://assignment-3-2-avital.herokuapp.com/profile/recipeInfo/[" +
              recipe_ids +
              "]",
            { withCredentials: true }
          );
          recipe_dict_personal = response_personal.data;
        }

        this.search_results = [];
        for (var recipe_id in results_dic) {
          var currRecipe = results_dic[recipe_id];
          currRecipe.id = recipe_id;
          if (recipe_dict_personal) {
            // not undifiend
            currRecipe.watched = recipe_dict_personal[recipe_id].watched;
            currRecipe.favorite = recipe_dict_personal[recipe_id].favorite;
          }
          this.search_results.push(currRecipe);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
    sortby() {
      if (this.sortby_selected == "time_low") {
        function compareTime(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return -1;
          if (a.readyInMinutes > b.readyInMinutes) return 1;
          return 0;
        }

        return this.search_results.sort(compareTime);
      } else if (this.sortby_selected == "time_high") {
        function compareTime(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return 1;
          if (a.readyInMinutes > b.readyInMinutes) return -1;
          return 0;
        }

        return this.search_results.sort(compareTime);
      } else if (this.sortby_selected == "like_high") {
        function compareLikes(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return 1;
          if (a.aggregateLikes > b.aggregateLikes) return -1;
          return 0;
        }

        return this.search_results.sort(compareLikes);
      } else if (this.sortby_selected == "like_low") {
        function compareLikes(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return -1;
          if (a.aggregateLikes > b.aggregateLikes) return 1;
          return 0;
        }

        return this.search_results.sort(compareLikes);
      }
      console.log("changed");
      console.log(this.num_of_recipes);
    },
  },
  computed: {
    search_params() {
      const params = {};
      if (this.cuisine_selected) {
        params["cuisine"] = this.cuisine_selected;
        //params.append("cuisine", this.cuisine_selected);
      }
      if (this.diet_selected) {
        params["diet"] = this.diet_selected;
        //params.append("diet", this.diet_selected);
      }
      if (this.intolerance_selected) {
        params["diet"] = this.intolerance_selected;
        //params.append("diet", this.intolerance_selected);
      }

      return params;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 80%;
}
</style>
