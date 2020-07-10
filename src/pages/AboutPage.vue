<template>
  <div>
    <Header />
    <b-container class="container">
      <h1 class="title">About Page</h1>
      <h2 class="content">
        Hello, dear food lovers !
      </h2>
      <h3 class="content">
        Here the website developers, Or and Avital, welcome you to peace and
        appetite :) <br />
        Each of us is a known food lover. <br />
        Or Alfasi - World Confectioner of hummus chocolate chip cookies. <br />
        Avital Zehavi - chewing hummus cookies in her spare time. <br />
        This project is done with sweat,tears and great appetite.<br />
        --------bla bla -------- <br />
        Link to section 3.1- ...... <br />
        Link to Section 3.2 - ..... <br />
        Link to Part 3.3. - The web
      </h3>
    </b-container>
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
// .row {
//   padding: 10 px;
//   align-items: center;
// }
</style>
