<template>
  <div>
    <Header />
    <b-container class="container">
      <!-- Section: Team v.1 -->
      <section class="team-section text-center my-5">
        <!-- Section heading -->
        <h2 class="h1-responsive font-weight-bold my-5">Our amazing team</h2>
        <!-- Section description -->
        <p class="grey-text w-responsive mx-auto mb-5">
          Hello, food lovers ! Here the website developers, Or and Avital,
          welcome you to peace and appetite :) Each of us is a known food lover.
          Lets tell you about us.
        </p>

        <!-- Grid row -->
        <div class="row">
          <!-- Grid column -->
          <div class="col-lg-6 col-md-6 mb-lg-0 mb-5">
            <div class="avatar mx-auto">
              <img
                src="../images/‏‏avitalImage.jpg"
                class="rounded-circle z-depth-1"
                alt="Sample avatar"
              />
            </div>
            <h5 class="font-weight-bold mt-4 mb-6">Avital Zehavi</h5>
            <p class="text-uppercase blue-text">
              <strong>Web developer</strong>
            </p>
            <p class="grey-text" style="text-align:left">
              Chewing hummus cookies in her spare time. In his spare time, a
              student of information systems and feature engineering at Ben
              Gurion University of the Negev. Champion in nodeJS and vueJS
              Contact email
            </p>
            <ul class="list-unstyled mb-0">
              <!-- Facebook -->
              <a class="p-2 fa-lg fb-ic">
                <i class="fab fa-facebook-f blue-text"> </i>
              </a>
              <!-- Twitter -->
              <a class="p-2 fa-lg tw-ic">
                <i class="fab fa-twitter blue-text"> </i>
              </a>
              <!-- Instagram -->
              <a class="p-2 fa-lg ins-ic">
                <i class="fab fa-instagram blue-text"> </i>
              </a>
            </ul>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-lg-6 col-md-6 mb-lg-0 mb-5">
            <div class="avatar mx-auto">
              <img
                src="../images/‏‏avitalImage.jpg"
                class="rounded-circle z-depth-1"
                alt="Sample avatar"
              />
            </div>
            <h5 class="font-weight-bold mt-4 mb-6">Or Alfasi</h5>
            <p class="text-uppercase blue-text">
              <strong>Web developer</strong>
            </p>
            <p class="grey-text" style="text-align:left">
              World Confectioner of hummus chocolate chips cookies. In her spare
              time, she is a student of information systems and feature
              engineering at Ben Gurion University of the Negev. Champion in
              nodeJS and vueJS Contact email
            </p>
            <ul class="list-unstyled mb-0">
              <!-- Facebook -->
              <a class="p-2 fa-lg fb-ic">
                <i class="fab fa-facebook-f blue-text"> </i>
              </a>
              <!-- Instagram -->
              <a class="p-2 fa-lg ins-ic">
                <i class="fab fa-instagram blue-text"> </i>
              </a>
            </ul>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->

        <div class="projectStory">
          This project is done with sweat,tears and great appetite.<br />
          --------bla bla -------- <br />
        </div>

        <div class="row" style="text-align:left">
          Link to section 3.1- ...... <br />
          Link to Section 3.2 - ..... <br />
          Link to Part 3.3. - The web
        </div>

        <!-- Grid row -->
      </section>
      <!-- Section: Team v.1 -->
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
.col {
  float: left;
  width: 50%;
  margin-bottom: 16px;
  padding: 0 8px;
}
.p {
  font-size: 16px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.bg-1 {
  background-color: #1abc9c; /* Green */
  color: #ffffff;
}
</style>
