<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li>物件検索</li>
    </ul>
  </div>

  <div class="mypage-title-box">
    <p class="mypage-title">マイページ</p>
  </div>

  <div class="mypage-box">
    <p class="mypage-box-title">登録会員情報</p>
    <div class="mypage-info-box">
      <div class="mypage-info-minibox">
        <p class="mypage-info-title">基本情報</p>
        <p class="mypage-info-txt">
          {{ data.name }}（{{ data.kname }}）<br />
          {{ data.gender }}<br />
          {{ data.birthday }}<br />
          {{ data.mail_address }}
        </p>
      </div>
      <button class="mypage-minibox-btn" type="button">
        <a href="mypage-change.html">変更する</a>
      </button>
    </div>
    <div class="mypage-info-pass-box">
      <div class="mypage-info-minibox">
        <p class="mypage-info-title">パスワード</p>
        <p class="mypage-info-txt">********</p>
      </div>
      <button class="mypage-minibox-btn" type="button">
        <router-link to="/pass-change"> 変更する </router-link>
      </button>
    </div>
    <div class="mypage-info-point-box">
      <div class="mypage-info-minibox">
        <p class="mypage-info-title">所得ポイント</p>
        <p class="mypage-info-txt">{{ data.point }}pt</p>
      </div>
      <button class="mypage-minibox-btn" type="button">
        <a href="#">ポイントを貯める</a>
      </button>
    </div>
    <div class="mypage-confirmation-box">
      <div class="mypage-confirmation-info-minibox">
        <p class="mypage-info-title">注文確認</p>
        <p class="mypage-info-txt"></p>

        <div class="mypage-sarch-section">
          <a href="property-detail.html" class="sarch-section-link">
            <h1 class="mypage-sarch-section-title">東京都練馬区大泉学園町</h1>
            <div class="mypage-sarch-section-box">
              <img
                src="images/220x220.png"
                style="width: 20%; margin: auto 5%"
                alt="新着物件イメージ画像"
              />
              <div class="mypage-sarch-section-box-txt">
                <dl>
                  <dt>物件名</dt>
                  <dd>東京都練馬区大泉学園町</dd>
                  <dt>賃料</dt>
                  <dd style="color: red; font-weight: bold">1800万円</dd>
                  <dt>所在地</dt>
                  <dd>東京都練馬区大泉学園町</dd>
                  <dt>沿線・駅</dt>
                  <dd>東武東上線朝霞駅 徒歩2960m徒歩37分</dd>
                  <dt>間取</dt>
                  <dd>2K</dd>
                </dl>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="mypage-favo-box">
      <div class="mypage-info-favo-minibox">
        <p class="mypage-info-favo-title">お気に入りを<br />確認する</p>
        <p class="mypage-info-txt"></p>
        <div class="mypage-sarch-section">
          <a href="property-detail.html" class="sarch-section-link">
            <h1 class="mypage-sarch-section-title">東京都練馬区大泉学園町</h1>
            <div class="mypage-sarch-section-box">
              <img
                src="images/220x220.png"
                style="width: 20%; margin: auto 5%"
                alt="新着物件イメージ画像"
              />
              <div class="mypage-sarch-section-box-txt">
                <dl>
                  <dt>物件名</dt>
                  <dd>東京都練馬区大泉学園町</dd>
                  <dt>賃料</dt>
                  <dd style="color: red; font-weight: bold">1800万円</dd>
                  <dt>所在地</dt>
                  <dd>東京都練馬区大泉学園町</dd>
                  <dt>沿線・駅</dt>
                  <dd>東武東上線朝霞駅 徒歩2960m徒歩37分</dd>
                  <dt>間取</dt>
                  <dd>2K</dd>
                </dl>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
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
export default {
  name: "Mypage",
  setup(props, context) {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
      user: null,
      name: "",
      kname: "",
      gender: "",
      birthday: "",
      mail_address: "",
      point: "",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const getMypage = async () => {
      let reqstatus;
      let surl = "/AuthLog";
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.status) {
        } else {
          router.push("/");
          return;
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
        return;
      }
      surl = store.state.apiUrl + "/Mypage";
      let params = new URLSearchParams();
      params.append("mail_address", reqstatus.data.status);
      let status;
      try {
        status = await axios.post(surl, params);
        console.log(status.data);
        if (status.data.status) {
          data.name = status.data.user.name.replace(".", "");
          data.kname = status.data.user.kname.replace(".", "");
          data.gender = status.data.user.sex;
          let birthday = status.data.user.birthday.split("-");
          data.birthday = `${birthday[0]} 年${birthday[1]} 月 ${birthday[2]} 日`;
          data.mail_address = status.data.user.mail_address;
          data.point = status.data.user.point;
        } else {
          router.push("/Error");
        }
      } catch (error) {
        router.push("/Error");
      }
    };
    onMounted(() => {
      getMypage();
    });
    return {
      data,
    };
  },
};
</script>
