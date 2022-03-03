 <template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>ログイン</li>
    </ul>
  </div>

  <div class="login_main">
    <!-- ログイン-->
    <div class="login_member-column">
      <div class="contact">
        <h1 class="contact-ttl">ログイン</h1>
        <p class="em" v-if="data.em">
          メールアドレスまたはパスワードが違います。再度正しく入力してください。
        </p>
        <div class="login_member-Form-Item">
          <p class="login_member-Form-Item-Label">メールアドレス</p>
          <!-- <p class="login_member-Form-Item-Label">{{ errors.maile }}</p> -->
          <input
            type="email"
            class="login_member-Form-Item-Input"
            v-model="maile"
            v-on:change="cheng"
          />
        </div>
        <div class="login_member-Form-Item">
          <p class="login_member-Form-Item-Label">パスワード</p>
          <!-- <p class="login_member-Form-Item-Label">{{ errors.password }}</p> -->
          <input
            type="password"
            class="login_member-Form-Item-Input"
            v-model="password"
            v-on:change="cheng"
          />
        </div>
        <input id="box1" type="checkbox" />
        <label for="box1">次回から自動ログイン</label>
        <input
          class="contact-btn"
          type="submit"
          value="ログイン"
          :disabled="!meta.valid"
          @click="onSubmit"
        />
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
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
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
