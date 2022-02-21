 <template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><router-link to="Mypage">マイページ</router-link></li>
      <li>基本情報変更</li>
    </ul>
  </div>

  <div class="mypage-title-change-box">
    <p class="mypage-change-title">基本情報変更</p>
  </div>

  <div class="mypage-change-box">
    <form>
      <div class="mypage-change-Form-Item">
        <p class="mypage-change-Form-Item-Label">お名前</p>
        <p class="mypage-change-Form-Item-Label-mini">姓</p>
        <input
          type="text"
          class="mypage-change-Form-Item-Input-mini"
          v-model="ksName"
        />
        <p class="mypage-change-Form-Item-Label-mini">名</p>
        <input
          type="text"
          class="mypage-change-Form-Item-Input-mini"
          v-model="kfName"
        />
      </div>
      <div class="mypage-change-Form-Item">
        <p class="mypage-change-Form-Item-Label">フリガナ</p>
        <p class="mypage-change-Form-Item-Label-name-mini">セイ</p>
        <input
          type="text"
          class="mypage-change-Form-Item-Input-mini"
          v-model="hsName"
        />
        <p class="mypage-change-Form-Item-Label-name-mini">メイ</p>
        <input
          type="text"
          class="mypage-change-Form-Item-Input-mini"
          v-model="hfName"
        />
      </div>
      <div class="mypage-change-Form-Item">
        <p class="mypage-change-Form-Item-Label">性別</p>
        <label class="mypage-change_RadioInput"
          ><input
            class="mypage-change_RadioInput-Input"
            type="radio"
            name="radio"
            value="男"
            v-model="gender"
          /><span class="mypage-change_RadioInput-DummyInput"></span
          ><span class="mypage-change_RadioInput-LabelText">男</span></label
        >
        <label class="mypage-change_RadioInput"
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
      <div class="mypage-change-Form-Item">
        <p class="mypage-change-Form-Item-Label">生年月日</p>
        <!-- <input type="text" class="mypage-change-birth-Form-Item-Input-mini" />
        <p class="mypage-change-birth-Form-Item-Label-mini">年</p> -->
        <input
          type="date"
          class="mypage-change-birth-Form-Item-Input-mini-mini"
          min="1922-01-01"
          max="2002-03-31"
          v-model="date"
        />
        <!-- <p class="mypage-change-birth-Form-Item-Label-mini">月</p>
        <input
          type="text"
          class="mypage-change-birth-Form-Item-Input-mini-mini"
        />
        <p class="mypage-change-birth-Form-Item-Label-mini">日</p> -->
      </div>
      <!-- <div class="mypage-change-Form-Item">
        <p class="mypage-change-Form-Item-Label">メールアドレス</p>
        <input
          type="email"
          class="mypage-change-Form-Item-Input"
          v-model="email"
        />
      </div> -->
    </form>

    <button class="mypage-change-minibox-btn" type="button">
      <a @click="onSubmit">変更する</a>
    </button>
  </div>
</template>
<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { reactive } from "vue";
import { onMounted } from "vue";
import { watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useField, useForm } from "vee-validate";
import UserHelper from "../functons/userHelper";
import * as yup from "yup";
export default {
  name: "Mypage-change",
  props: {
    Umaile: String,
    birthday: String,
    gender: String,
    hsName: String,
    hfName: String,
    kfName: String,
    ksName: String,
  },
  setup(props, context) {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
      user: null,
      email: "",
      gender: "",
      ksName: "",
      kfName: "",
      hsName: "",
      hfName: "",
      date: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { getUser } = UserHelper();
    const em = store.state.em;
    const schema = yup.object({
      // email: yup
      //   .string(em.String)
      //   .max(254, em.Smax)
      //   .required(em.Quired)
      //   .email(em.Maile),
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
        // email: route.params.Umaile,
        ksName: route.params.ksName,
        kfName: route.params.kfName,
        hsName: route.params.hsName,
        hfName: route.params.hfName,
        gender: route.params.gender,
        date: route.params.birthday,
      },
    });
    // const { value: email } = useField("email");
    const { value: ksName } = useField("ksName");
    const { value: kfName } = useField("kfName");
    const { value: hsName } = useField("hsName");
    const { value: hfName } = useField("hfName");
    const { value: gender } = useField("gender");
    const { value: date } = useField("date");
    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let params = new URLSearchParams();
      let pName = values.ksName + "." + values.kfName;
      let lName = values.hsName + "." + values.hfName;
      params.append("kName", pName);
      params.append("hName", lName);
      params.append("sex", values.gender);
      // params.append("mail_address", values.email);
      params.append("birthday", values.date);
      params.append("before", data.email);
      let url = store.state.apiUrl + "/UserUpdate";
      try {
        reqstatus = await axios.post(
          url,
          // adapter: axiosJsonpAdapter,
          params
        );
        console.log(reqstatus);
      } catch (error) {
        router.push("/Error");
      }
    });
    onMounted(async () => {
      if (route.params.Umaile == undefined) {
        router.push("/");
      }
      let maile = route.params.Umaile;
      data.user = await getUser(store.state.apiUrl, maile);
      data.date = data.user.birthday;
      console.log(route.params);
      data.email = data.user.mail_address;
    });
    return {
      data,
      errors,
      // email,
      meta,
      onSubmit,
      ksName,
      kfName,
      hsName,
      hfName,
      gender,
      date,
    };
  },
};
</script>
<style scoped>
.mypage-change-birth-Form-Item-Input-mini-mini {
  margin-left: 5%;
}
</style>
