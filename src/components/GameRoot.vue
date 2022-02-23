<template>
  <div class="game">
    <a href="./soleGame"><p>一人で遊ぶ</p></a>
    <a href="./match"><p>知らない人と対戦する</p></a>
  </div>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "GameRoot",
  // setup(props, context) {
  //   const data = reactive({
  //     title: "HelloWorld",
  //     msg: "This is HelloWorld component.",
  //   });
  //   return {
  //     data,
  //   };
  // },
};
</script>
<style scoped>
.game {
  height: 200px;
  widows: 100%;
  color: #000;
}
</style>
