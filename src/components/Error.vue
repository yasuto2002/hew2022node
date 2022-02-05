<template>
  <div class="error-box">
    <h1 class="error-box-title">エラー通知</h1>
    <p class="error-box-txt">
      正しくページを表示できませんでした。<br />
      手順が正しくないか、操作の有効期限が過ぎております。<br />
      <br />
      その他の場合は、お手数をお掛けしますが、最初からお手続き下さい。<br />
      <br />
      このページが表示される主な理由は以下の通りとなります。<br />
      ※ブラウザバックで戻られた場合<br />
      ※複数のブラウザ、タブ、端末を使用した場合<br />
      ※操作途中で画面を長時間放置した場合<br />
      ※ブックマークなどにより途中から操作された場合<br />
      ※ボタンをダブルクリックなどにより連続で複数回押下された場合<br />
      ※CookieやJavaScriptがOFFになっている場合<br />
      ※ログインが必要な際に複数回ログインで失敗した場合<br />
      (NT00010U)<br />
    </p>
  </div>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "Error",
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
