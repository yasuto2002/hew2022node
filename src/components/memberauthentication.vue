<template>
  <div class="member-authentication">
    <div class="member-authentication-box">
      <h1 class="member-authentication-box-title">認証ページ</h1>
      <p class="member-authentication-txt">
        登録はまだ完了していません。<br />
        メールに記載の認証コード（半角数字）を確認後、24時間以内に入力してください。<br />
        ※この画面は閉じたり別のページを開いたりせず、そのままにしておいてください。<br />
      </p>

      <form id="member-authentication-form">
        <input
          class="member-authentication-txtbox"
          type="text"
          placeholder="メールに記載の半角数字"
        />
        <input
          class="member-authentication-btn"
          type="submit"
          value="登録を完了する"
        />
      </form>
    </div>
  </div>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "memberauthentication",
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
.member-authentication {
  margin: 6% auto;
}
</style>
