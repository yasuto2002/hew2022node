 <template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>
        <router-link to="/Logreg">新規会員登録・ログイン</router-link>
      </li>
      <li>新規会員登録</li>
    </ul>
  </div>

  <div class="membership">
    <div class="membership-box">
      <h1 class="membership-box-title">新規会員登録</h1>
      <p class="membership-box-toptxt">
        お客様の情報をご入力後、利用規約をお読みになり、「下記の利用規約に同意して確認画面へ」ボタンを押してください。<br />※印は必須入力項目です。
      </p>
      <form style="margin-top: 50px; width: 90%" @submit="onSubmit">
        <div class="form-wrapp" style="margin-left: 10%">
          <p class="membership-Form-Item-Label" style="text-align: left">
            お名前
          </p>
          <p class="em">{{ errors.ksName }}</p>
          <p class="em">{{ errors.kfName }}</p>
          <div class="membership-Form-Item">
            <p
              class="membership-Form-Item-Label"
              style="width: 8%; text-align: center"
            >
              姓
            </p>
            <!-- <p class="membership-Form-Item-Label">お名前</p> -->
            <input
              type="text"
              class="membership-Form-Item-Input-mini"
              v-model="ksName"
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
              v-model="kfName"
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            フリガナ
          </p>
          <p class="em">{{ errors.hsName }}</p>
          <p class="em">{{ errors.hfName }}</p>
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
              v-model="hsName"
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
              v-model="hfName"
            />
          </div>

          <p
            class="membership-Form-Item-Label"
            style="width: 80%; text-align: left"
          >
            性別
          </p>
          <p class="em">{{ errors.gender }}</p>
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
                  v-model="gender"
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
                  v-model="gender"
                />
              </div>
            </div>
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            生年月日
          </p>
          <p class="em">{{ errors.date }}</p>
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
              min="1922-01-01"
              max="2002-03-31"
              v-model="date"
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            メールアドレス
          </p>
          <p class="em">{{ errors.email }}</p>
          <p style="color: #ff0000; text-arign: center">{{ data.emsagge }}</p>
          <div class="membership-Form-Item" style="justify-content: flex-end">
            <input
              type="text"
              class="membership-Form-Item-Input"
              v-model="email"
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
          <p class="em">{{ errors.password1 }}</p>
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
              v-model="password1"
            />
          </div>
          <p class="membership-Form-Item-Label" style="text-align: left">
            パスワード<br />（確認用）
          </p>
          <p class="em">{{ data.psemessage }}</p>
          <p class="em">{{ errors.password2 }}</p>
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
              v-model="password2"
            />
          </div>
        </div>
        <button
          class="member-submiti-btn"
          type="submit"
          value="登録する"
          :disabled="!meta.valid"
        >
          登録する
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosJsonpAdapter from "vue-jsonp";
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
let url = "https://yasutosub.com/checkmaile";
import UserHelper from "../functons/userHelper";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "";
export default {
  name: "Member",
  devServer: {
    proxy: "https://yasutosub.com",
  },
  setup() {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
      jso: null,
      emsagge: "",
      psemessage: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      email: yup
        .string(em.String)
        .max(254, em.Smax)
        .required(em.Quired)
        .email(em.Maile),
      ksName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      kfName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      hsName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      hfName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      password1: yup
        .string(em.String)
        .min(10, em.Pasmin)
        .max(20, em.Pasmax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      password2: yup
        .string(em.String)
        .oneOf([yup.ref("password1")], em.OneOf)
        .min(10, em.Pasmin)
        .max(20, em.Pasmax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      gender: yup
        .string(em.String)
        .required(em.Quired)
        .matches(store.state.regex, em.Matches),
      date: yup.date(em.Date).typeError(em.Date).required(em.Quired),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
        ksName: "",
        kfName: "",
        hsName: "",
        hfName: "",
        password1: "",
        password2: "",
        gender: "",
        date: "",
      },
    });
    const { value: email } = useField("email");
    const { value: ksName } = useField("ksName");
    const { value: kfName } = useField("kfName");
    const { value: hsName } = useField("hsName");
    const { value: hfName } = useField("hfName");
    const { value: password1 } = useField("password1");
    const { value: password2 } = useField("password2");
    const { value: gender } = useField("gender");
    const { value: date } = useField("date");
    const { LogCheck } = UserHelper();
    const onSubmit = handleSubmit(async (values) => {
      if (values.password1 == values.password2) {
        let params = new URLSearchParams();
        // params.append("id", data.password1);
        // params.append("kName", values.ksName + values.kfName);
        // params.append("hName", values.hsName + values.hfName);
        // params.append("sex", values.gender);
        params.append("mail_address", values.email);
        // params.append("password", values.password1);
        // params.append("birthday", values.date);
        try {
          data.jso = await axios.post(
            url,
            // adapter: axiosJsonpAdapter,
            params
          );
          console.log(data.jso.data.state);
        } catch (error) {
          router.push("/Error");
        }
        if (data.jso.data.state === true) {
          let pName = values.ksName + "." + values.kfName;
          let lName = values.hsName + "." + values.hfName;
          if (
            reqSession(
              pName,
              lName,
              values.email,
              values.gender,
              values.password1,
              values.date
            )
          ) {
            router.push("/member-confirmation");
          } else {
            router.push("/Error");
          }
        } else if (data.jso.data.state == 23000) {
          data.emsagge = "入力されたメールアドレスはすでに使用されています";
        } else {
          router.push("/Error");
        }
      }
      return;
    });

    const reqSession = async (pName, lName, maile, gender, password, date) => {
      let reqstatus;
      let surl = "/reqSession";
      let params = new URLSearchParams();
      params.append("rmaile", maile);
      params.append("pName", pName);
      params.append("lName", lName);
      params.append("gender", gender);
      params.append("password", password);
      params.append("date", date);
      try {
        reqstatus = await axios.post(surl, params);
      } catch (error) {
        router.push("/Error");
      }
      if (reqstatus.data.status) {
        return true;
        // router.push("/memberauthentication");
      } else {
        return false;
      }
    };
    const jumppage = () => {
      // this.$router.push("/");
      router.push("/");
    };
    onMounted(async () => {
      let flg = await LogCheck();
      if (flg) {
        router.push("/");
      }
    });
    return {
      data,
      jumppage,
      errors,
      email,
      meta,
      onSubmit,
      ksName,
      kfName,
      hsName,
      hfName,
      password1,
      password2,
      gender,
      date,
      reqSession,
    };
  },
};
</script>
<style>
.em {
  margin-top: 5px;
  text-align: left;
  color: crimson;
  padding-left: 1%;
}
</style>
