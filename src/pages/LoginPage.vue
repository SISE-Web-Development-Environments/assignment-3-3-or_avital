<template>
  <div>
    <div class="container">
      <Login />
    </div>
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
