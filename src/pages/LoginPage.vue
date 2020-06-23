<template>
  <div>
    <Header />
    <div class="container">
      <Login />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
export default {
  components: {
    Login,
    Header,
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
