<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li>新規会員登録・ログイン</li>
    </ul>
  </div>

  <div class="login_main">
    <!-- ログイン-->
    <div class="login_right-column">
      <div class="contact">
        <h1 class="contact-ttl">ログイン</h1>
        <div class="Form-Item">
          <p class="Form-Item-Label">メールアドレス</p>
          <input type="email" class="Form-Item-Input" />
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">パスワード</p>
          <input type="password" class="Form-Item-Input" />
        </div>
        <input id="box1" type="checkbox" />
        <label for="box1">次回から自動ログイン</label>
        <input class="contact-btn" type="submit" value="ログイン" />
        <p class="login-txt">
          パスワードを忘れた方は<a class="login-txt-link" href="index.html"
            >こちら</a
          >
        </p>
      </div>
    </div>

    <!-- 新規会員登録 -->
    <div class="login_left-column">
      <div class="signup">
        <h1 class="signup-ttl">はじめてTROUBLEHOUSEをご利用の方</h1>
        <div class="signup-box">
          <p>
            TROUBLEHOUSEに登録されますと、<br />
            マイページからご注文履歴、ポイントを貯めたり、<br />
            お気に入り物件登録など、<br />
            便利なサービスをご利用いただけます。<br />
            年会費、登録料、更新料は一切かかりません。<br />
          </p>
        </div>
        <p class="signup-txt">
          はじめてTROUBLEHOUSEをご利用の方は、<br />
          こちらから新規会員登録をしてください。
        </p>
        <a href="member.html"
          ><input class="signup-btn" type="submit" value="新規会員登録"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "Logreg",
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
