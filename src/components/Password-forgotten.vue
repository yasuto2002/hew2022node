 <template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>
        <router-link to="/Logreg">ログイン</router-link>
      </li>
      <li>パスワードを忘れた人へ</li>
    </ul>
  </div>

  <div class="login_main">
    <div class="login_member-column">
      <div class="contact">
        <!-- ログイン-->
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
        <input
          class="contact-btn"
          type="submit"
          value="ログイン"
          :disabled="!meta.valid"
          @click="onSubmit"
        />
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
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        maile: "",
      },
    });
    const { value: maile } = useField("maile");

    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/Pasforgotten";
      let params = new URLSearchParams();
      let rand = Math.floor(Math.random() * (9999999 + 1 - 1000000)) + 1000000;
      params.append("mail_address", values.maile);
      params.append("rand", rand);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          await forget(values.maile, rand);
        } else {
          data.em = true;
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    });
    const forget = async (maile, rand) => {
      let reqstatus;
      let surl = "/forget";
      let params = new URLSearchParams();
      params.append("mail_address", maile);
      params.append("rand", rand);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.status) {
          router.push("/");
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const cheng = () => {
      data.em = false;
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
      meta,
      onSubmit,
      cheng,
      forget,
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
