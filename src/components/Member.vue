 <template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="login-member.html">新規会員登録・ログイン</a></li>
      <li>新規会員登録</li>
    </ul>
  </div>

  <div class="membership">
    <div class="membership-box">
      <h1 class="membership-box-title">新規会員登録</h1>
      <p class="membership-box-toptxt">
        お客様の情報をご入力後、利用規約をお読みになり、「下記の利用規約に同意して確認画面へ」ボタンを押してください。<br />※印は必須入力項目です。
      </p>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">お名前</p>
        <input type="text" class="membership-Form-Item-Input-mini" />
        <input type="text" class="membership-Form-Item-Input-mini" />
      </div>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">フリガナ</p>
        <input type="text" class="membership-Form-Item-Input-mini" />
        <input type="text" class="membership-Form-Item-Input-mini" />
      </div>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">性別</p>
        <input type="radio" class="membership-Form-Item-Input" />
      </div>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">生年月日</p>
        <input type="text" class="membership-Form-Item-Input" />
      </div>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">メールアドレス</p>
        <input type="text" class="membership-Form-Item-Input" />
      </div>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">パスワード</p>
        <input type="password" class="membership-Form-Item-Input" />
      </div>
      <div class="membership-Form-Item">
        <p class="membership-Form-Item-Label">パスワード<br />（確認用）</p>
        <input type="password" class="membership-Form-Item-Input" />
      </div>
      <input class="member-submiti-btn" type="submit" value="登録する" />
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
