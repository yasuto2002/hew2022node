<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><router-link to="Member">新規会員登録</router-link></li>
      <li>入力内容の確認</li>
    </ul>
  </div>

  <div class="member-confirmation-box">
    <h1 class="member-confirmation-box-title">入力内容の確認</h1>
    <p class="member-confirmation-box-txt">
      ご登録完了後、ご入力いただいたメールアドレスに、ご登録の確認メールをお送りします。<br />
      <br />
    </p>
    <div class="member-confirmation-minibox">
      <div class="member-confirmation-minibox01">お名前</div>
      <div class="member-confirmation-minibox02">{{ data.pName }}</div>
    </div>
    <div class="member-confirmation-minibox">
      <div class="member-confirmation-minibox01">フリガナ</div>
      <div class="member-confirmation-minibox02">{{ data.lName }}</div>
    </div>
    <div class="member-confirmation-minibox">
      <div class="member-confirmation-minibox01">性別</div>
      <div class="member-confirmation-minibox02">{{ data.gender }}</div>
    </div>
    <div class="member-confirmation-minibox">
      <div class="member-confirmation-minibox01">生年月日</div>
      <div class="member-confirmation-minibox02">{{ data.date }}</div>
    </div>
    <div class="member-confirmation-minibox">
      <div class="member-confirmation-minibox01">メールアドレス</div>
      <div class="member-confirmation-minibox02">{{ data.maile }}</div>
    </div>
    <div class="member-confirmation-minibox">
      <div class="member-confirmation-minibox01">パスワード</div>
      <div class="member-confirmation-minibox02">●●●●●●●●●●</div>
    </div>
    <p class="member-confirmation-box-txt">
      <br />
      上入力内容に誤りがないか確認してください。会員登録を完了するためにはメールアドレスの認証が必要です。<br />
      入力されたメールアドレスへ送信する認証コードを次のページで入力してください。<br />
      「入力画面に戻って変更する」ボタンを押すと、入力画面に戻ります。<br />
      <br />
    </p>
    <div class="member-confirmation-btn-box">
      <router-link to="/Member"
        ><input
          class="member-confirmation-btn"
          type="button"
          value="入力画面に戻る"
        />
      </router-link>
      <router-link to="/member-confirmation"
        ><input
          class="member-confirmation-btn"
          type="submit"
          value="認証コードを送る"
          @click="onSubmit"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import UserHelper from "../functons/userHelper";
export default {
  name: "memberauthentication",
  setup() {
    const data = reactive({
      pName: "",
      lName: "",
      maile: "",
      gender: "",
      password: "",
      date: "",
      jso: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { LogCheck } = UserHelper();
    const url = store.state.apiUrl + "/reg";
    const getUdata = async () => {
      let reqstatus;
      let surl = "/getUdata";
      let params = new URLSearchParams();
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.pName) {
          data.pName = reqstatus.data.pName;
          data.lName = reqstatus.data.lName;
          data.maile = reqstatus.data.maile;
          data.gender = reqstatus.data.gender;
          data.password = reqstatus.data.password;
          data.date = reqstatus.data.date;
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(console.error);
        router.push("/Error");
      }
    };
    const onSubmit = async () => {
      let params = new URLSearchParams();
      // params.append("id", data.password1);
      params.append("kName", data.pName);
      params.append("hName", data.lName);
      params.append("sex", data.gender);
      params.append("mail_address", data.maile);
      params.append("password", data.password);
      params.append("birthday", data.date);
      try {
        data.jso = await axios.post(
          url,
          // adapter: axiosJsonpAdapter,
          params
        );
      } catch (error) {
        router.push("/Error");
      }
      if (data.jso.data.state) {
        router.push("/memberauthentication");
      } else {
        router.push("/Error");
      }
    };
    onMounted(async () => {
      let flg = await LogCheck();
      if (flg) {
        router.push("/");
      }
      getUdata();
    });
    return {
      data,
      getUdata,
      onSubmit,
    };
  },
};
</script>
<style scoped>
.member-authentication {
  margin: 6% auto;
}
</style>
