<template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>ゲーム</li>
    </ul>
  </div>

  <div class="game-box">
    <div class="game-left-box">
      <div class="game-txtbox">
        <h1 class="game-txtbox-ttl">１人で遊ぶ</h1>
        <a href="/soleGame" class="game-box-btn">１人で遊ぶ</a>
      </div>
    </div>
    <!-- 左側 -->

    <div class="game-right-box">
      <div class="game-txtbox">
        <h1 class="game-txtbox-ttl">みんなと遊ぶ</h1>
        <a href="/match" class="game-box-btn">みんなと遊ぶ</a>
      </div>
    </div>
    <!-- 右側 -->
  </div>
  <!-- gamebox 終-->
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "GameSelect",
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
