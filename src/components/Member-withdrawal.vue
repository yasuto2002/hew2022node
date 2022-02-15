<template>
  <div class="member-withdrawal-box">
    <h1 class="member-withdrawal-box-title">TROUBLE HOUSE会員を退会する</h1>
    <p class="member-withdrawal-box-txt">
      TROUBLE HOUSEを退会すると、アカウントに紐付く情報は破棄され、<br />
      アカウントを復活することはできません。<br />
      <br />
      上記に同意できましたら、入力欄にアカウントのパスワードを入力し<br />
      「上記事項に同意し退会する」をクリックしてください。<br />
      <br />
    </p>

    <form>
      <p class="em">{{ errors.password }}</p>
      <div class="member-withdrawal-Form-Item">
        <p class="member-withdrawal-Form-Item-Label">パスワード</p>
        <input
          type="password"
          class="member-withdrawal-Form-Item-Input"
          v-model="password"
        />
      </div>
    </form>

    <div class="popupModal1">
      <input type="radio" name="modalPop" id="pop11" />
      <label for="pop11" :disabled="!meta.valid"
        ><div class="withdrawal-btn">上記事項に同意し退会する</div></label
      >
      <input type="radio" name="modalPop" id="pop12" />
      <label for="pop12">CLOSE</label>
      <input type="radio" name="modalPop" id="pop13" />
      <label for="pop13">×</label>
      <div class="modalPopup2">
        <div class="modalPopup3">
          <h2 class="modalTitle">本当に退会しますか？</h2>
          <div class="modalMain">
            <p>
              退会後、30日以内であればログインすることで<br />
              アカウントを復元することが可能です。
            </p>
            <div class="withdrawal-btn-box">
              <a class="withdrawal-btn" @click="onSubmit">退会する</a>
              <a class="withdrawal-btn" href="index.html">いいえ</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="login" class="hide-area"></section>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import UserHelper from "../functons/userHelper";

export default {
  name: "Member-withdrawal",
  setup(props, context) {
    const data = reactive({
      em: null,
      maile: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const { LogCheck } = UserHelper();
    const schema = yup.object({
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
        password: "",
      },
    });
    const { value: password } = useField("password");
    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/DeleteUser";
      let params = new URLSearchParams();
      params.append("mail_address", data.maile);
      params.append("password", values.password);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          await Logout();
          router.push("/Member-withdrawal-decision");
        } else {
          data.em = true;
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    });
    const Logout = async () => {
      let proFlg;
      let reqstatus;
      let surl = "/Logout";
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.status) {
          return;
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    onMounted(async () => {
      let flg = await LogCheck();
      if (flg) {
        data.maile = flg;
      } else {
        router.push("/");
      }
    });
    return {
      data,
      errors,
      meta,
      password,
      onSubmit,
    };
  },
};
</script>
<style scoped>
.em {
  text-align: left;
  color: crimson;
  margin-left: 27%;
}
</style>
