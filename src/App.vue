<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  created() {
    console.log("***** App Created! *****");
  },
  mounted() {
    console.log("----- App Mounted! -----");
  },
  data() {
    return {
      title: "Router",
    };
  },
};
</script>
