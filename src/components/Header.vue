<template>
  <header class="header">
    <div class="headerNavOuter flexBox">
      <!-- ロゴ -->
      <!-- <h1 class="siteIcon">
          <a href="#">
              <img src="https://drive.google.com/uc?export=view&id=1mu_N2iTeoQCeUiuWRgJ0xwjR4AZ-29bL" alt="">
          </a>
      </h1> -->
      <!-- ナビゲーション -->
      <nav class="headerNav">
        <ul class="navList flexBox">
          <li class="navItem navItemHome" v-if="data.viewflg">
            <!-- <a href="member.html"> 会員登録 </a> -->
            <router-link to="/Member"> 会員登録 </router-link>
          </li>
          <li class="navItem navItemHome" v-else>
            <!-- <a href="member.html"> 会員登録 </a> -->
            <router-link to="/Mypage"> マイページ </router-link>
          </li>
          <li class="navItem navItemIntroduce" v-if="data.viewflg">
            <!-- <a href="login-member.html"> ログイン </a> -->
            <router-link to="/Login"> ログイン </router-link>
          </li>
          <li class="navItem navItemIntroduce" v-else>
            <!-- <a href="login-member.html"> ログイン </a> -->
            <a @click="Logout"> ログアウト </a>
          </li>
          <li class="navItem navItemAbout">
            <router-link to="/Sarchcart-property"> 購入検索 </router-link>
          </li>
          <li class="logo" v-if="$route.path != '/'" @click="jump">
            <a><img src="images/hew-logo.png" alt="" /></a>
          </li>
          <li class="logo" v-else @click="imgswitch">
            <a><img src="images/hew-logo.png" alt="" /></a>
          </li>
          <li class="navItem navItemAccess">
            <router-link to="/Property-search"> 物件検索 </router-link>
          </li>
          <li class="navItem navItemGame">
            <router-link to="/GameSelect"> ゲーム </router-link>
          </li>
          <li class="navItem navItemContact">
            <router-link to="/Help"> ヘルプ </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
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
import $ from "jquery";

export default {
  name: "Hello",
  setup(props, context) {
    const data = reactive({
      viewflg: true,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { LogCheck } = UserHelper();
    const Logout = async () => {
      let proFlg;
      let reqstatus;
      let surl = "/Logout";
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.status) {
          console.log(reqstatus.data.status);
          data.viewflg = true;
          router.push("/");
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const update = async () => {
      let flg = await LogCheck();
      if (flg) {
        data.viewflg = false;
      }
    };
    const imgswitch = () => {
      if (store.state.topCount < 5) {
        store.state.topCount = parseInt(store.state.topCount) + 1;
      } else {
        store.state.topCount = 0;
      }
    };
    const jump = () => {
      router.push("/");
    };
    onMounted(async () => {
      let flg = await LogCheck();
      if (flg) {
        data.viewflg = false;
      }
      $("#serch").click(function () {
        console.log("333");
      });
    });
    return {
      data,
      Logout,
      update,
      imgswitch,
      jump,
    };
  },
};
</script>
<style scoped>
.navItemIntroduce a:hover {
  cursor: pointer;
}
a:hover {
  cursor: pointer;
}
</style>
