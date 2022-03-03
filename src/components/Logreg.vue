<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
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
          <input
            type="email"
            class="Form-Item-Input"
            v-model="maile"
            v-on:change="cheng"
          />
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">パスワード</p>
          <input
            type="password"
            class="Form-Item-Input"
            v-model="password"
            v-on:change="cheng"
          />
        </div>
        <p class="em" v-if="data.em">
          メールアドレスまたはパスワードが違います。再度正しく入力してください。
        </p>
        <div class="login-checkbox">
          <label class="ECM_CheckboxInput"
            ><input
              class="ECM_CheckboxInput-Input"
              type="checkbox"
              v-model="password"
              v-on:change="cheng"
            /><span class="ECM_CheckboxInput-DummyInput"></span
            ><span class="ECM_CheckboxInput-LabelText"
              >次回から自動ログイン</span
            ></label
          >
        </div>
        <a :disabled="!meta.valid" @click="onSubmit"
          ><input class="contact-btn" type="submit" value="ログイン"
        /></a>
        <p class="login-txt">
          パスワードを忘れた方は<router-link class="login-txt-link" to="/"
            >こちら</router-link
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
        <router-link to="/Member"
          ><input class="signup-btn" type="submit" value="新規会員登録"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Logreg",
  setup() {
    const data = reactive({
      // maile: "",
      // password: "",
      em: false,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      maile: yup
        .string(em.String)
        .max(254, em.Smax)
        .required(em.Quired)
        .email(em.Maile),
      password: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        maile: "",
        password: "",
      },
    });
    const { value: maile } = useField("maile");
    const { value: password } = useField("password");

    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/LoginAuth";
      let params = new URLSearchParams();
      params.append("mail_address", values.maile);
      params.append("password", values.password);
      try {
        reqstatus = await axios.post(surl, params);
        store.state.Umaile = values.maile;
        if (reqstatus.data.state) {
          LogSession(values.maile);
        } else {
          data.em = true;
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    });
    const cheng = () => {
      data.em = false;
    };

    const LogSession = async (maile) => {
      let reqstatus;
      let surl = "/LogSession";
      let params = new URLSearchParams();
      params.append("mail_address", maile);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.status) {
          // console.log("ログイン成功");
          // router.go({ path: "/", force: true });
          window.location.href = "/";
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
      console.log(reqstatus.data);
    };
    const AuthLog = async () => {
      let reqstatus;
      let surl = "/AuthLog";
      try {
        reqstatus = await axios.post(surl);

        if (reqstatus.data.status) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    onMounted(() => {
      AuthLog();
    });
    return {
      errors,
      data,
      maile,
      password,
      meta,
      onSubmit,
      cheng,
    };
  },
};
</script>
<style scoped>
.em {
  color: crimson;
  text-align: center;
}
</style>
