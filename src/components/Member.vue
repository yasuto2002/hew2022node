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
      <form style="margin-top: 50px; width: 90%">
        <div class="form-wrapp" style="margin-left: 10%">
          <p class="membership-Form-Item-Label" style="text-align: left">
            お名前
          </p>
          <div class="membership-Form-Item">
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              性
            </p>
            <!-- <p class="membership-Form-Item-Label">お名前</p> -->
            <input type="text" class="membership-Form-Item-Input-mini" />
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              名
            </p>
            <input type="text" class="membership-Form-Item-Input-mini" />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            フリガナ
          </p>
          <div class="membership-Form-Item">
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              セイ
            </p>
            <input type="text" class="membership-Form-Item-Input-mini" />
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              メイ
            </p>
            <input type="text" class="membership-Form-Item-Input-mini" />
          </div>

          <p
            class="membership-Form-Item-Label"
            style="width: 80%; text-align: left"
          >
            性別
          </p>
          <div class="membership-Form-Item" style="width: 100%">
            <div
              class="membership-Form-Item-Label-radios"
              style="
                display: flex;
                width: 5%;
                align-items: center;
                margin-left: 7%;
                padding-right: 1em;
                justify-content: space-around;
                min-width: 165px;
              "
            >
              <!-- <div class="membership-Form-Item-Label-radios" style="width: 20%;"> -->
              <div
                class="content"
                style="
                  display: flex;
                  width: 25%;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <label for="radio1">男</label>
                <input
                  type="radio"
                  name="gender"
                  id="radio1"
                  style="margin: 0; padding-left: 90%"
                />
              </div>
              <div
                class="content"
                style="
                  display: flex;
                  width: 25%;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <label for="radio2">女</label>
                <input
                  type="radio"
                  name="gender"
                  id="radio2"
                  style="margin: 0; padding-left: 90%"
                />
              </div>
            </div>
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            生年月日
          </p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="text"
              class="membership-Form-Item-Input"
              style="
                width: 70%;
                padding: 0;
                margin: 0;
                margin-right: 20%;
                padding-left: 1%;
              "
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            メールアドレス
          </p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="text"
              class="membership-Form-Item-Input"
              style="
                width: 70%;
                padding: 0;
                margin: 0;
                margin-right: 20%;
                padding-left: 1%;
              "
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            パスワード
          </p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="password"
              class="membership-Form-Item-Input"
              style="
                width: 70%;
                padding: 0;
                margin: 0;
                margin-right: 20%;
                padding-left: 1%;
              "
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            パスワード<br />（確認用）
          </p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="password"
              class="membership-Form-Item-Input"
              style="
                width: 70%;
                padding: 0;
                margin: 0;
                margin-right: 20%;
                padding-left: 1%;
              "
            />
          </div>
        </div>
        <button
          class="member-submiti-btn"
          type="button"
          value="登録する"
          @click="postData"
        >
          登録する
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { reactive } from "vue";
let url = "http://localhost:8080/reg";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "";
export default {
  name: "Member",
  devServer: {
    proxy: "http://localhost:8080",
  },
  setup() {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
      jso: null,
    });

    const postData = async () => {
      let params = new URLSearchParams();
      params.append("id", "テストだよー");
      try {
        data.jso = await axios.post(
          url,
          // adapter: axiosJsonpAdapter,
          // callbackParamName: "cb",
          params
        );
        console.log(data.jso.data.data);
      } catch (error) {
        console.log("post Error");
        // ダメなときはエラー
        console.error(error);
      }
    };
    return {
      data,
      postData,
    };
  },
};
</script>
