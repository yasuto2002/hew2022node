<template>
  <div id="app">
    <Header ref="child" v-if="$route.path != '/GameSelect'" />
    <GameHeader ref="child" v-else />
    <router-view></router-view>
    <Footer v-if="$route.path != '/GameSelect'" />
    <GameFooter ref="child" v-else />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import GameHeader from "./components/GameHeader.vue";
import Footer from "./components/Footer.vue";
import GameFooter from "./components/GameFooter.vue";
export default {
  name: "app",
  components: {
    Header,
    Footer,
    GameHeader,
    GameFooter,
  },
  created() {
    console.log("***** App Created! *****");
  },
  mounted() {},
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
