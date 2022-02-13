<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="mypage.html">マイページ</a></li>
      <li><a href="pass-change.html">パスワード変更</a></li>
      <li><a>パスワード変更完了</a></li>
    </ul>
  </div>

  <div class="mypage-title-change-box">
    <p class="mypage-change-title">パスワード変更</p>
  </div>

  <div class="mypage-change-comp-box">
    <h1 class="mypage-change-comp-box-title">パスワードを変更しました。</h1>
    <router-link to="/Mypage"
      ><p class="mypage-change-comp-box-txt">マイページに戻る</p></router-link
    >
  </div>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "pass-change-comp",
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
