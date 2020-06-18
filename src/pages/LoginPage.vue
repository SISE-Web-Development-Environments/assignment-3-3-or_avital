<template>
  <div class="container">
    <h1 class="title">Login page</h1>
    <Login />
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
  components: {
    Login,
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
