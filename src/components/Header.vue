<template>
  <div>
    <b-navbar toggleable="lg">
      <img
        :src="require('@/images/logo-cookie.png')"
        height="80px"
        width="200px"
        class="img"
      />

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }"
            ><strong>Home Page</strong></b-nav-item
          >
          <b-nav-item :to="{ name: 'search' }"
            ><strong>Search</strong></b-nav-item
          >
          <b-nav-item :to="{ name: 'about' }"
            ><strong>About Us</strong></b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="!$cookies.get('session')">
            <!-- User Not Connected!!!!! -->
            <b-navbar-brand id="hello">Hello Guest!</b-navbar-brand>
            <b-nav-item :to="{ name: 'register' }"
              ><strong>Register</strong></b-nav-item
            >
            <b-nav-item :to="{ name: 'login' }"
              ><strong>LogIn</strong></b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <b-navbar-brand id="hello"
              >Hello {{ $root.store.username }}</b-navbar-brand
            >

            <b-nav-item-dropdown right id="drop">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em><strong>User</strong></em>
              </template>
              <b-dropdown-item id="dropitem" :to="{ name: 'favoriteRecipes' }"
                >Favorite Recipes</b-dropdown-item
              >
              <b-dropdown-item id="dropitem" :to="{ name: 'personalRecipes' }"
                >Personal Recipes</b-dropdown-item
              >
              <b-dropdown-item id="dropitem" :to="{ name: 'familyRecipes' }"
                >Family Recipes</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item @click="LogoutFunc"><strong>LogOut</strong></b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    LogoutFunc() {
      console.log("logout function");
      this.$root.store.logout();
      this.$router.push({ name: "main" }).catch((e) => {
        this.$router.go(0); // reload home page
      });
    },
  },
};
</script>

<style>
.img {
  margin: 0px;
  padding: 0px;
}

.navbar {
  font-size: 20px;
  position: relative;
  z-index: 1;
  background-image: linear-gradient(
      to bottom,
      transparent,
      rgb(247, 244, 241, 0.99)
    ),
    url("../images/header4.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.nav-item.nav-item.nav-item a {
  color: #000000;
}

.nav-item.nav-item.nav-item a:hover {
  color: rgb(247, 244, 241);
  text-decoration: underline;
}

.navbar-nav > li > .dropdown-menu {
  background-color: #ffffff !important;
}

#hello {
  font-weight: bold;
  font-size: 24px;
}

#dropitem:hover {
  color: #000000;
  text-decoration: underline;
}
</style>
