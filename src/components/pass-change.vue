<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><router-link to="Mypage">マイページ</router-link></li>
      <li><a>パスワード変更</a></li>
    </ul>
  </div>

  <div class="pass-change-title-box">
    <p class="pass-change-title">パスワード変更</p>
  </div>

  <div class="pass-change-box">
    <div class="pass-change-minibox">
      <form>
        <p class="em">{{ data.PasEm }}</p>
        <div class="pass-change-Form-Item">
          <p class="pass-change-Form-Item-Label">現在のパスワード</p>
          <input
            type="password"
            class="pass-change-Form-Item-Input"
            v-model="password1"
          />
        </div>
        <p class="em">{{ errors.password2 }}</p>
        <div class="pass-change-Form-Item">
          <p class="pass-change-Form-Item-Label">新しいパスワード</p>
          <input
            type="password"
            class="pass-change-Form-Item-Input"
            v-model="password2"
          />
        </div>
      </form>
    </div>

    <button
      class="pass-change-box-btn"
      type="button"
      @click="onSubmit"
      :disabled="!meta.valid"
    >
      <a>変更する</a>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import UserHelper from "../functons/userHelper";
export default {
  name: "pass-change",
  setup(props, context) {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
      maile: "",
      PasEm: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const { getUser, setUser, editUser, LogCheck } = UserHelper();
    const schema = yup.object({
      password1: yup
        .string(em.String)
        .min(10, em.Pasmin)
        .max(20, em.Pasmax)
        .matches(store.state.regex, em.Matches),
      password2: yup
        .string(em.String)
        .required(em.Quired)
        .min(10, em.Pasmin)
        .max(20, em.Pasmax)
        .matches(store.state.regex, em.Matches),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        password1: "",
        password2: "",
      },
    });
    const { value: password1 } = useField("password1");
    const { value: password2 } = useField("password2");
    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/PasChange";
      let params = new URLSearchParams();
      params.append("password1", values.password1);
      params.append("password2", values.password2);
      params.append("mail_address", data.maile);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state == 100) {
          data.PasEm = "パスワードが違います";
        } else if (reqstatus.data.state) {
          router.push("/Pass-change-comp");
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    });
    const onUser = async () => {
      let user = await LogCheck();
      if (user) {
        data.maile = user;
        consule.log(data.maile);
      } else {
        router.push("/");
      }
    };
    onMounted(() => {
      onUser();
    });
    return {
      data,
      password1,
      password2,
      meta,
      errors,
      onSubmit,
    };
  },
};
</script>
