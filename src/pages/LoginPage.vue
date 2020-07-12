<template>
  <div>
    <Header />
    <div class="container">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import Header from "@/components/Header";

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
