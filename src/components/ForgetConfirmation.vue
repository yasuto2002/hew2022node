<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><a>パスワード変更</a></li>
    </ul>
  </div>

  <div class="pass-change-title-box">
    <p class="pass-change-title">パスワード変更</p>
  </div>

  <div class="pass-change-box">
    <div class="pass-change-minibox">
      <form>
        <p class="em">{{ errors.password1 }}</p>
        <div class="pass-change-Form-Item">
          <p class="pass-change-Form-Item-Label">新しいパスワード</p>
          <input
            type="password"
            class="pass-change-Form-Item-Input"
            v-model="password1"
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
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        password1: "",
      },
    });
    const { value: password1 } = useField("password1");
    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/Forgetchange";
      let params = new URLSearchParams();
      params.append("password1", values.password1);
      params.append("mail_address", data.maile);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          await deleteforget();
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    });
    const onUser = async () => {
      let reqstatus;
      let surl = "/Authforget";
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.status) {
          if (reqstatus.data.rand == route.query.id) {
            data.maile = reqstatus.data.status;
          } else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const deleteforget = async () => {
      let reqstatus;
      let surl = "/deleteforget";
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.status) {
          router.push("/Pass-change-comp");
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    onMounted(async () => {
      await onUser();
    });
    return {
      data,
      password1,
      meta,
      errors,
      onSubmit,
      deleteforget,
    };
  },
};
</script>
<style scoped>
button:hover {
  cursor: pointer;
}
</style>
