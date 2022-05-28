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
  <div class="membership-title-box">
    <p class="membership-title">新規会員登録</p>
  </div>
  <div class="membership-box">
    <h1 class="membership-box-title">新規会員登録</h1>
    <p class="membership-box-txt">
      お客様の情報をご入力後、利用規約をお読みになり、「下記の利用規約に同意して確認画面へ」ボタンを押してください。<br />※印は必須入力項目です。
    </p>

    <div class="membership-wrap">
      <form @submit="onSubmit">
        <p class="em">{{ errors.ksName }}</p>
        <p class="em">{{ errors.kfName }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">お名前</p>
          <p class="mypage-change-Form-Item-Label-mini">姓</p>
          <input
            type="text"
            class="membership-Form-Item-Input-mini"
            style="margin-left: 15px"
            v-model="ksName"
          />
          <p class="mypage-change-Form-Item-Label-mini">名</p>
          <input
            type="text"
            class="membership-Form-Item-Input-mini"
            v-model="kfName"
          />
        </div>
        <p class="em">{{ errors.hsName }}</p>
        <p class="em">{{ errors.hfName }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">フリガナ</p>
          <p class="mypage-change-Form-Item-Label-name-mini">セイ</p>
          <input
            type="text"
            class="membership-Form-Item-Input-mini"
            v-model="hsName"
          />
          <p class="mypage-change-Form-Item-Label-name-mini">メイ</p>
          <input
            type="text"
            class="membership-Form-Item-Input-mini"
            v-model="hfName"
          />
        </div>
        <p class="em">{{ errors.gender }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">性別</p>
          <label class="mypage-change_RadioInput" style="padding-left: 6.2%"
            ><input
              class="mypage-change_RadioInput-Input"
              type="radio"
              name="radio"
              value="男"
              v-model="gender"
            /><span class="mypage-change_RadioInput-DummyInput"></span
            ><span class="mypage-change_RadioInput-LabelText">男</span></label
          >
          <label class="mypage-change_RadioInput" style="padding-left: 6.2%"
            ><input
              class="mypage-change_RadioInput-Input"
              type="radio"
              name="radio"
              value="女"
              v-model="gender"
            /><span class="mypage-change_RadioInput-DummyInput"></span
            ><span class="mypage-change_RadioInput-LabelText">女</span></label
          >
        </div>
        <p class="em">{{ errors.date }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">生年月日</p>
          <input
            class="membership-Form-Item-Input"
            type="date"
            min="1922-01-01"
            max="2002-03-31"
            v-model="date"
          />
        </div>
        <p class="em">{{ errors.email }}</p>
        <p style="color: #ff0000; text-arign: center">{{ data.emsagge }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">メールアドレス</p>
          <input
            type="email"
            class="membership-Form-Item-Input"
            v-model="email"
          />
        </div>
        <p class="em">{{ errors.password1 }}</p>
        <p class="em">{{ data.psemessage }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">パスワード</p>
          <input
            type="password"
            class="membership-Form-Item-Input"
            v-model="password1"
          />
        </div>
        <p class="em">{{ errors.password2 }}</p>
        <div class="membership-Form-Item">
          <p class="membership-Form-Item-Label">パスワード(確認用)</p>
          <input
            type="password"
            class="membership-Form-Item-Input"
            v-model="password2"
          />
        </div>
        <input
          class="member-submiti-btn"
          type="submit"
          value="登録する"
          :disabled="!meta.valid"
        />
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
let url = "https://54.250.18.221/checkmaile";
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
