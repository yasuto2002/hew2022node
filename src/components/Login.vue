 <template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li>ログイン</li>
    </ul>
  </div>

  <div class="login_main">
    <!-- ログイン-->
    <div class="login_member-column">
      <div class="contact">
        <h1 class="contact-ttl">ログイン</h1>
        <div class="login_member-Form-Item">
          <p class="login_member-Form-Item-Label">メールアドレス</p>
          <input type="email" class="login_member-Form-Item-Input" />
        </div>
        <div class="login_member-Form-Item">
          <p class="login_member-Form-Item-Label">パスワード</p>
          <input type="password" class="login_member-Form-Item-Input" />
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
  </div>
</template>
<script>
export default {
  name: "Member",
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
