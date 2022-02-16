<template>
  <div id="app">
    <Header ref="child" />
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
  methods: {
    updateHed() {
      this.$refs.child[0].update();
      console.log("update");
    },
  },
  data() {
    return {
      title: "Router",
    };
  },
};
</script>
