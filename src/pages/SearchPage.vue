<template>
  <div>
    <Header />
    <div class="container" :key="searchkey">
      <b-row id="firstrow">
        <b-col cols="8">
          <b-row>
            <b-col cols="8">
              <b-form-input
                :placeholder="search_placeholder"
                v-model="search_string"
              ></b-form-input>
            </b-col>
            <b-col cols="3">
              <b-form-select v-model="num_of_recipes">
                <b-form-select-option :value="5"
                  >return 5 recipes</b-form-select-option
                >
                <b-form-select-option :value="10"
                  >return 10 recipes</b-form-select-option
                >
                <b-form-select-option :value="15"
                  >return 15 recipes</b-form-select-option
                >
              </b-form-select>
            </b-col>
          </b-row>
          <b-row id="secondrow">
            <b-col cols="3">
              <b-form-select v-model="cuisine_selected" :options="cuisines">
              </b-form-select>
            </b-col>
            <b-col cols="3">
              <b-form-select v-model="diet_selected" :options="diets">
              </b-form-select>
            </b-col>
            <b-col cols="3">
              <b-form-select
                v-model="intolerance_selected"
                :options="intolerances"
              >
              </b-form-select>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="1">
          <b-button
            @click="SendSearch"
            :disabled="!search_string.length"
            id="searchbutton"
          >
            Search
          </b-button>
        </b-col>
      </b-row>

      <b-row class="row justify-content-center ">
        <b-col cols="3">
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
        </b-col>
      </b-row>
      <b-row v-if="search_results.length" class="results">
        <RecipePreviewTable
          title="Browse for favorite Recipes"
          recipeType="search"
          class="FavoriteRecipes center"
        />
      </b-row>
      <b-row v-if="searchEmpty" class="empty">
        No results returned
      </b-row>
    </div>
  </div>
</template>

<script>
import RecipePreviewTable from "../components/RecipePreviewTable.vue";
import Header from "@/components/Header";

export default {
  components: {
    RecipePreviewTable,
    Header,
  },
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
      search_results: [],
      search_string: "",
      sortby_selected: null,
      searchkey: 0,
      searchEmpty: false,
    };
  },
  mounted() {
    if (this.$cookies.get("session")) {
      if (localStorage.search) {
        let searchObj = JSON.parse(localStorage.search);
        this.search_string = searchObj.search_string;
        this.num_of_recipes = searchObj.num_of_recipes;
        this.cuisine_selected = searchObj.cuisine_selected;
        this.diet_selected = searchObj.diet_selected;
        this.intolerance_selected = searchObj.intolerance_selected;
        this.search_results = searchObj.search_results;
        this.searchEmpty = searchObj.isEmpty;
      }
    } else {
      localStorage.removeItem("search");
      // console.log("search deleted");
    }
  },
  methods: {
    async SendSearch() {
      //console.log("send search");
      this.searchEmpty = false;
      try {
        const response = await this.axios.get(
          "http://localhost:3000/recipe/search/query/" +
            // "https://assignment-3-2-avital.herokuapp.com/recipe/search/query/" +
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
        if (this.$cookies.get("session")) {
          var recipe_ids = Object.keys(results_dic);
          const response_personal = await this.axios.get(
            "http://localhost:3000/profile/recipeInfo/[" +
              // "https://assignment-3-2-avital.herokuapp.com/profile/recipeInfo/[" +
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
        if (this.search_results.length == 0) {
          this.searchEmpty = true;
        }
        //this.$router.push({ name: "search" }).catch((e) => {});
        this.searchkey = this.searchkey + 1;
        if (this.$cookies.get("session")) {
          let searchObj = Object();
          searchObj.search_string = this.search_string;
          searchObj.num_of_recipes = this.num_of_recipes;
          searchObj.cuisine_selected = this.cuisine_selected;
          searchObj.diet_selected = this.diet_selected;
          searchObj.intolerance_selected = this.intolerance_selected;
          searchObj.search_results = this.search_results;
          searchObj.isEmpty = this.searchEmpty;
          localStorage.search = JSON.stringify(searchObj);
          //JSON.stringify(testObject)
          // this.search_defualt = localStorage.search;
        }
      } catch (error) {
        console.log(error);
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
      // console.log("changed");
      // console.log(this.num_of_recipes);
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
        params["intolerances"] = this.intolerance_selected;
        //params.append("diet", this.intolerance_selected);
      }

      return params;
    },
    search_placeholder() {
      if (this.search_defualt) {
        return this.search_defualt;
      } else {
        return "Enter your search here";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 95%;
}

.results {
  padding: 10px;
}

#firstrow {
  padding-top: 50px;
  padding-bottom: 20px;
}
.empty {
  font-size: 22px;
  padding: 30px;
}

#searchbutton {
  //width: 150px;
  // height: 60px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 30px;
  background: rgb(153, 204, 111);
  border: 2px solid rgb(131, 184, 101);
}

#searchbutton:hover {
  background: rgb(131, 184, 101);
  border: 2px solid rgb(131, 184, 101);
}

#searchbutton:disabled {
  background: rgb(131, 184, 101);
  border: 2px solid rgb(131, 184, 101);
}
#secondrow {
  padding-top: 20px;
}
</style>
