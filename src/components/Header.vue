<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">We need a cool name</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }">Home Page</b-nav-item>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About Us</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="!$root.store.username">
            <!-- User Not Connected!!!!! -->
            <b-navbar-brand>Hello Guest!</b-navbar-brand>
            <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
            <b-nav-item :to="{ name: 'login' }">LogIn</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <b-navbar-brand>Hello {{ $root.store.username }}</b-navbar-brand>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item :to="{ name: 'favoriteRecipes' }">Favorite Recipes</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'personalRecipes' }">Personal Recipes</b-dropdown-item>
              <b-dropdown-item href="#">Family Recipes</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#">LogOut</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
