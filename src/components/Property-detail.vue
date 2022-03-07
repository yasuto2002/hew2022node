<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><router-link to="Property-search">物件検索</router-link></li>
      <li><a @click="$router.go(-1)">物件一覧</a></li>
      <li>物件詳細</li>
    </ul>
  </div>

  <div class="property-detail-title-box">
    <p class="property-detail-title">{{ data.datail.name }}</p>
  </div>

  <div class="property-detail-sidebar">
    <div class="property-detail-sidebar-box">
      <div class="property-detail-sidebar-minibox">
        <p class="property-detail-sidebar-price-txt">
          {{ data.datail.price }}万円
        </p>
        <p class="property-detail-sidebar-txt">
          共益費・管理費{{ data.datail.management_fee }}円
        </p>
      </div>
      <div class="property-detail-sidebar-minibox">
        <p class="property-detail-sidebar-favo-txt">お気に入り数</p>
        <p class="property-detail-sidebar-favo-txt-num">{{ data.count }}</p>
        <p class="property-detail-sidebar-favo-txt-num-sub">件</p>
        <div @mousedown="good" v-if="!data.viewFlg">
          <input type="checkbox" id="like" /><label for="like"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              /></svg
          ></label>
        </div>
        <div @mousedown="good" v-if="data.viewFlg">
          <input type="checkbox" id="like" checked /><label for="like"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              /></svg
          ></label>
        </div>
      </div>
    </div>
  </div>

  <!-- <img src="images/943400_s.jpg" class="property-img" /> -->
  <div class="main-property-img" style="">
    <img src="images/slider1.png" class="slider-img" @click="downImg" />
    <img
      :src="data.slider[data.imgCount]"
      class="center-property-img"
      :imgid="0"
    />
    <img src="images/slider2.png" class="slider-img" @click="upImg" />
  </div>

  <div class="img-column">
    <template v-for="(item, key) in data.images" :key="key">
      <!-- <img src="images/943400_s.jpg" class="img-column-box" />
      <img src="images/943400_s.jpg" class="img-column-box" />
      <img src="images/943400_s.jpg" class="img-column-box" />
      <img src="images/943400_s.jpg" class="img-column-box" /> -->
      <img
        :src="item.file_path"
        class="img-column-box"
        @click="imgClick(key + 1)"
        :imgid="key + 1"
      />
    </template>
  </div>

  <div class="property-detail-box">
    <div class="property-detail-box-title">
      <p class="property-detail-table-title">物件詳細</p>
    </div>
    <table class="property-detail-table">
      <tr class="property-detail-tr">
        <th class="property-detail-th">住所</th>
        <td class="property-detail-td">{{ data.datail.street_address }}</td>
      </tr>
      <tr class="property-detail-tr">
        <th class="property-detail-th">最寄り駅</th>
        <td class="property-detail-td">
          東武東上線
          {{ $store.state.station[data.datail.station_id] }} 徒歩{{
            data.datail.physical_distance
          }}m 徒歩{{ data.datail.station_walk }}分
        </td>
      </tr>
      <tr class="property-detail-tr">
        <th class="property-detail-th">事故内容</th>
        <td class="property-detail-td">{{ data.datail.trouble }}</td>
      </tr>
    </table>

    <div class="property-detail-table-box">
      <table class="property-detail-table-second">
        <tr class="property-detail-tr-second">
          <th class="property-detail-th-second">間取り</th>
          <td class="property-detail-td-second">
            {{ $store.state.floor_plan[data.datail.floor_plan] }}
          </td>
        </tr>
        <tr class="property-detail-tr-second">
          <th class="property-detail-th-second">建物面積</th>
          <td class="property-detail-td-second">28m²</td>
        </tr>
        <tr class="property-detail-tr-second">
          <th class="property-detail-th-second">築年数</th>
          <td class="property-detail-td-second">{{ data.date }}</td>
        </tr>
      </table>

      <table class="property-detail-table-third">
        <tr class="property-detail-tr-third">
          <th class="property-detail-th-third">部屋階数</th>
          <td class="property-detail-td-third">
            地上{{ data.datail.room_floor }}階
          </td>
        </tr>
        <tr class="property-detail-tr-third">
          <th class="property-detail-th-third">建物構造</th>
          <td class="property-detail-td-third">
            {{ $store.state.construction[data.datail.construction] }}
          </td>
        </tr>
        <tr class="property-detail-tr-third">
          <th class="property-detail-th-third">種別</th>
          <td class="property-detail-td-third">
            {{ $store.state.building_type[data.datail.building_type] }}
          </td>
        </tr>
      </table>
    </div>

    <div class="property-detail-buy">
      <a
        class="property-detail-buy-btn property-detail-buy-btn-c"
        @click="jump"
        :disabled="data.flg"
        :class="{ backgroud: data.flg }"
        ><i class="fas fa-shopping-cart"></i>購入する<i
          class="fas fa-chevron-right"
        ></i
      ></a>
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
import UserHelper from "../functons/userHelper";

export default {
  name: "property-detail",
  props: {
    imgid: Number,
  },
  setup(props, context) {
    const data = reactive({
      datail: "",
      images: "",
      count: "",
      date: "",
      slider: [],
      imgCount: 0,
      checked: false,
      viewFlg: false,
      procesFlg: false,
      maile: null,
      number: "",
      flg: false,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { LogCheck } = UserHelper();
    const getDetail = async () => {
      let reqstatus;
      let surl = store.state.apiUrl + "/Detail";
      try {
        let params = new URLSearchParams();
        params.append("number", route.query.number);
        params.append("umaile", data.maile);
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          data.datail = reqstatus.data.detail;
          data.images = reqstatus.data.images;
          data.count = reqstatus.data.count;
          let date = reqstatus.data.detail.construction_date.split("-");
          data.date = `${date[0]}年${date[1]}月`;
          data.slider[0] = reqstatus.data.detail.thumbnails;
          if (reqstatus.data.detail.view_flg == 1) {
            data.flg = true;
            console.log(data.flg);
          }
          for (let i = 1; i <= reqstatus.data.images.length; i++) {
            data.slider[i] = reqstatus.data.images[i - 1].file_path;
          }
          data.viewFlg = reqstatus.data.flg;
          data.procesFlg = reqstatus.data.flg;
          data.number = route.query.number;
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const upImg = () => {
      if (data.imgCount < data.slider.length - 1) {
        data.imgCount++;
      }
    };
    const downImg = () => {
      if (data.imgCount != 0) {
        data.imgCount--;
      }
    };
    const good = async () => {
      let surl;
      if (!data.procesFlg) {
        if (data.maile != null) {
          surl = store.state.apiUrl + "/Good";
          let params = new URLSearchParams();
          params.append("mail_address", data.maile);
          params.append("id", route.query.number);
          let status;
          try {
            status = await axios.post(surl, params);
            // console.log(status.data);
            if (status.data.status) {
              data.count = status.data.count;
            } else {
              router.push("/Error");
            }
          } catch (error) {
            router.push("/Error");
          }
        } else {
          router.push("/Logreg");
        }
        data.procesFlg = true;
      } else {
        if (data.maile != null) {
          surl = store.state.apiUrl + "/Bad";
          let params = new URLSearchParams();
          params.append("mail_address", data.maile);
          params.append("id", route.query.number);
          let status;
          try {
            status = await axios.post(surl, params);
            if (status.data.status) {
              data.count = status.data.count;
            } else {
              router.push("/Error");
            }
          } catch (error) {
            console.log(error);
          }
          data.procesFlg = false;
        } else {
          router.push("/Error");
        }
        data.procesFlg = false;
      }
    };
    const imgClick = (num) => {
      data.imgCount = num;
    };
    const jump = () => {
      if (!data.flg) {
        router.push({
          name: "Buy-page",
          query: { number: data.number },
        });
      }
    };
    onMounted(async () => {
      let flg = await LogCheck();
      if (flg) {
        data.maile = flg;
        getDetail();
      }
      getDetail();
    });
    watch(data.checked, () => {
      console.log("check");
    });
    return {
      data,
      upImg,
      downImg,
      good,
      imgClick,
      jump,
    };
  },
};
</script>
<style scoped>
.main-property-img {
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
}
.center-property-img {
  width: 45vw;
  height: 25vw;
  object-fit: cover;
}
.slider-img {
  width: 10%;
}
.slider-img:hover {
  cursor: pointer;
}
.img-column-box {
  width: 15vw;
  height: 12vw;
  object-fit: cover;
}
input[type="checkbox"]:checked + label::after {
  top: -90px !important;
  left: -60px;
}
.backgroud {
  background-color: #d6779b !important;
}
a:hover {
  cursor: pointer;
}
</style>
