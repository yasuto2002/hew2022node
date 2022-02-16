<template>
  <div class="error-box">
    <h1 class="error-box-title">TROUBLE HOUSE会員を退会する</h1>
    <p class="member-decision-box-txt">
      <font color="red">TROUBLE HOUSE会員を退会しました</font><br />
      <br />
      ご利用ありがとうございました。<br />
    </p>
    <router-link to="/" class="member-decision-box-link">TOPへ戻る</router-link>
  </div>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "Member-withdrawal-decision",
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
