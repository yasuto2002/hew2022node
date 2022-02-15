<template>
  <div class="member-authentication">
    <div class="member-authentication-box">
      <h1 class="member-authentication-box-title">認証ページ</h1>
      <p class="member-authentication-txt">
        登録はまだ完了していません。<br />
        メールに記載の認証コード（半角数字）を確認後、24時間以内に入力してください。<br />
        ※この画面は閉じたり別のページを開いたりせず、そのままにしておいてください。<br />
      </p>
      <p style="color: red">{{ data.em }}</p>
      <form id="member-authentication-form">
        <input
          class="member-authentication-txtbox"
          type="text"
          placeholder="メールに記載の半角数字"
          v-model="password"
        />
        <input
          class="member-authentication-btn"
          type="button"
          value="登録を完了する"
          @click="getvulue"
          :disabled="!meta.valid"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
export default {
  name: "memberauthentication",
  setup(props, context) {
    const data = reactive({
      maile: "",
      em: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const schema = yup.object({
      password: yup.string().length(6).required(),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        password: "",
      },
    });
    const { value: password } = useField("password");

    const getvulue = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/auth";
      let params = new URLSearchParams();
      params.append("maile", data.maile);
      params.append("security_code", values.password);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          authSession();
          // router.push("/");
        } else {
          data.em = "認証コードが誤っています";
        }
      } catch (error) {
        router.push("/Error");
      }
    });
    const getUdata = async () => {
      let reqstatus;
      let surl = "/getUdata";
      let params = new URLSearchParams();
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.maile) {
          data.maile = reqstatus.data.maile;
        } else {
          router.push("/");
        }
      } catch (error) {
        router.push("/Error");
      }
    };
    const authSession = async () => {
      let reqstatus;
      let surl = "/authSession";
      let params = new URLSearchParams();
      params.append("maile", data.maile);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.status) {
          router.push("/MemberComp");
        } else {
          router.push("/Error");
        }
      } catch (error) {
        router.push("/Error");
      }
    };
    onMounted(() => {
      getUdata();
    });
    return {
      data,
      meta,
      password,
      getvulue,
    };
  },
};
</script>
<style scoped>
.member-authentication {
  margin: 6% auto;
}
</style>
