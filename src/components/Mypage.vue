<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>マイページ</li>
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
      <button class="mypage-minibox-btn" type="button" @click="jump">
        <a>変更する</a>
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
    <div class="mypage-favo-box" v-if="data.flg">
      <div class="mypage-info-favo-minibox">
        <p class="mypage-info-favo-title">お気に入りを<br />確認する</p>
        <p class="mypage-info-txt"></p>
        <div class="mypage-sarch-section" @click="goodJump">
          <a class="sarch-section-link">
            <h1 class="mypage-sarch-section-title">{{ data.first.name }}</h1>
            <div class="mypage-sarch-section-box">
              <img
                :src="data.first.thumbnails"
                style="width: 20%; margin: auto 5%"
                alt="新着物件イメージ画像"
              />
              <div class="mypage-sarch-section-box-txt">
                <dl>
                  <dt>物件名</dt>
                  <dd>{{ data.first.name }}</dd>
                  <dt>賃料</dt>
                  <dd style="color: red; font-weight: bold">
                    {{ data.first.price }}万円
                  </dd>
                  <dt>所在地</dt>
                  <dd>{{ data.first.street_address }}</dd>
                  <dt>沿線・駅</dt>
                  <dd>
                    {{ $store.state.root[data.first.station_id]
                    }}{{ $store.state.station[data.first.station_id] }}駅 徒歩{{
                      data.first.physical_distance
                    }}m徒歩{{ data.first.station_walk }}分
                  </dd>
                  <dt>間取</dt>
                  <dd>{{ $store.state.floor_plan[data.first.floor_plan] }}</dd>
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
      date: "",
      assumedName: "",
      assumedKName: "",
      id: "",
      first: null,
      flg: false,
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
          data.user = status.data.user;
          data.name = status.data.user.name.replace(".", "");
          data.kname = status.data.user.kname.replace(".", "");
          data.assumedName = status.data.user.name;
          data.assumedKName = status.data.user.kname;
          data.gender = status.data.user.sex;
          data.date = status.data.user.birthday;
          data.id = status.data.user.id;
          let birthday = status.data.user.birthday.split("-");
          data.birthday = `${birthday[0]} 年${birthday[1]} 月 ${birthday[2]} 日`;
          data.mail_address = status.data.user.mail_address;
          data.point = status.data.point;
          if (status.data.first != null) {
            data.first = status.data.first;
            data.flg = true;
          }
        } else {
          router.push("/Error");
        }
      } catch (error) {
        router.push("/Error");
      }
    };
    const jump = () => {
      let assumedName = data.assumedKName.split(".");
      let assumedKName = data.assumedName.split(".");
      router.push({
        name: "Mypage-change",
        params: {
          Umaile: data.mail_address,
          birthday: data.date,
          gender: data.gender,
          hsName: assumedName[0],
          hfName: assumedName[1],
          kfName: assumedKName[1],
          ksName: assumedKName[0],
        },
      });
    };
    const goodJump = () => {
      router.push({ name: "Fsearch-result", params: { page: 1 } });
    };
    onMounted(() => {
      getMypage();
    });
    return {
      data,
      jump,
      goodJump,
    };
  },
};
</script>
