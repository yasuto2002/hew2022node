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
            <input
              type="text"
              class="membership-Form-Item-Input-mini"
              v-model="data.ksName"
            />
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              名
            </p>
            <input
              type="text"
              class="membership-Form-Item-Input-mini"
              v-model="data.kfName"
            />
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
            <input
              type="text"
              class="membership-Form-Item-Input-mini"
              v-model="data.hsName"
            />
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              メイ
            </p>
            <input
              type="text"
              class="membership-Form-Item-Input-mini"
              v-model="data.hfName"
            />
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
                  value="男"
                  v-model="data.gender"
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
                  value="女"
                  v-model="data.gender"
                />
              </div>
            </div>
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            生年月日
          </p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="date"
              class="membership-Form-Item-Input"
              style="
                width: 70%;
                padding: 0;
                margin: 0;
                margin-right: 20%;
                padding-left: 1%;
              "
              v-model="data.date"
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            メールアドレス
          </p>
          <p style="color: #ff0000; text-arign: center">{{ data.emsagge }}</p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="text"
              class="membership-Form-Item-Input"
              v-model="data.maile"
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
              v-model="data.password1"
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
              v-model="data.password2"
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
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
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
      maile: "",
      ksName: "",
      kfName: "",
      hsName: "",
      hfName: "",
      password1: "",
      password2: "",
      gender: "",
      date: "",
      emsagge: "",
    });

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const postData = async () => {
      let params = new URLSearchParams();
      // params.append("id", data.password1);
      params.append("kName", data.ksName + data.kfName);
      params.append("hName", data.hsName + data.hfName);
      params.append("sex", data.gender);
      params.append("mail_address", data.maile);
      params.append("password", data.password1);
      params.append("birthday", data.date);
      try {
        data.jso = await axios.post(
          url,
          // adapter: axiosJsonpAdapter,
          params
        );
        console.log(data.jso.data.state);
        console.log(data.gender);
      } catch (error) {
        console.log("post Error");
        // ダメなときはエラー
        console.error(error);
      }
      if (data.jso.data.state == true) {
        router.push("/");
      } else if (data.jso.data.state == 23000) {
        data.emsagge = "入力されたメールアドレスはすでに使用されています";
      }
      return;
    };
    const jumppage = () => {
      // this.$router.push("/");
      router.push("/");
    };
    return {
      data,
      postData,
      jumppage,
    };
  },
};
</script>
