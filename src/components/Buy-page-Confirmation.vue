<template>
  <!-- パンくずリスト-->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="search-result.html">物件検索</a></li>
      <li><a href="search-result.html">練馬区の賃貸 物件一覧</a></li>
      <li><a href="property-detail.html">東京都練馬区大泉学園町</a></li>
      <li><a href="buy-page.html">お支払い方法</a></li>
      <li>お支払い方法の確認</li>
    </ul>
  </div>

  <div class="buy-page-conbox-title-box">
    <p class="buy-page-conbox-title">お支払い方法の確認</p>
  </div>

  <div class="buy-page-conmain">
    <div class="buy-page-conmain-box">
      <div class="buy-page-conmain-left">
        <!-- <h1 class="buy-page-conmain-left-title">購入情報の確認</h1> -->
        <div class="buy-page-conmain-left-box">
          <div class="buy-page-conmain-title">注文者情報</div>
          <div class="orde-box">
            <dl>
              <dt class="buy-page-conmain-dt">お名前</dt>
              <dd>{{ data.hName }}</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">フリガナ</dt>
              <dd>{{ data.kName }}</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">電話番号</dt>
              <dd>{{ data.collNumber }}</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">メールアドレス</dt>
              <dd>{{ data.email }}</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">郵便番号</dt>
              <dd>〒{{ data.postal }}</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">住所</dt>
              <dd>{{ data.address }}</dd>
            </dl>
          </div>
          <div class="pointo-box">
            <div class="buy-page-conmain-title">ポイント使用</div>
            <dl>
              <dt class="buy-page-conmain-dt">ご利用可能ポイント</dt>
              <dd>{{ data.conpoint }}pt</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">ご利用ポイント</dt>
              <dd style="width: 280px">
                <input
                  type="number"
                  class="point-input"
                  placeholder="0"
                  v-model="data.poinnt"
                  @change="poinntChenge"
                  min="0"
                  :max="data.conpoint"
                />
                pt
              </dd>
            </dl>
          </div>
          <div class="pay-box">
            <div class="buy-page-conmain-title">お支払い情報</div>
            <dl>
              <dt class="buy-page-conmain-dt">支払い方法</dt>
              <dd>クレジットカード</dd>
            </dl>
            <dl>
              <dt class="buy-page-conmain-dt">カード番号</dt>
              <dd>
                <template v-for="n in data.cardLength" :key="n">*</template>
                {{ data.cardValue }}
              </dd>
            </dl>
          </div>
          <div class="property-box">
            <div class="buy-page-conmain-title">購入物件の確認</div>
            <dl>
              <dt class="buy-page-conmain-dt">物件名</dt>
            </dl>
          </div>
          <div class="buy-page-sarch-section">
            <router-link
              :to="{ name: 'Property-detail', query: { number: data.number } }"
              target="_blank"
              class="buy-page-sarch-section-link"
            >
              <h1 class="buy-page-sarch-section-title">
                {{ data.propertyName }}
              </h1>
              <div class="buy-page-sarch-section-box">
                <img
                  :src="data.imgPath"
                  style="width: 20%; margin: auto 5%"
                  alt="新着物件イメージ画像"
                />
                <div class="buy-page-sarch-section-box-txt">
                  <dl>
                    <dt>物件名</dt>
                    <dd>{{ data.propertyName }}</dd>
                    <dt>賃料</dt>
                    <dd style="color: red; font-weight: bold">
                      {{ data.propertyPrice }}万円
                    </dd>
                    <dt>所在地</dt>
                    <dd>{{ data.propertyStreet_address }}</dd>
                    <dt>沿線・駅</dt>
                    <dd>
                      山手線{{ data.propertyStation_id }}駅<br />徒歩{{
                        data.propertyPhysical_distance
                      }}m徒歩{{ data.propertyStation_walk }}分
                    </dd>
                    <dt>間取</dt>
                    <dd>{{ data.propertyFloor_plan }}</dd>
                  </dl>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="buy-page-conmain-right">
        <div class="buy-page-box-comright-minibox">
          <a class="buy-page-minibox-btn">購入する</a>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt">物件価格</p>
            <p class="buy-page-box-box-txt">¥{{ data.propertyPrice }}0000</p>
          </div>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt">支払い手数料</p>
            <p class="buy-page-box-box-txt">¥1000</p>
          </div>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt">ポイント使用料</p>
            <p class="buy-page-box-box-txt">1000pt</p>
          </div>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt" style="font-weight: bold">
              合計（税込）
            </p>
            <p
              class="buy-page-box-box-txt"
              style="font-weight: bold; color: rgb(230, 71, 71)"
            >
              {{ data.sum }}円
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive } from "vue";
import { onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import axiosJsonpAdapter from "axios-jsonp";
import * as yup from "yup";
import UserHelper from "../functons/userHelper";
import { object } from "yup/lib/locale";

export default {
  name: "Buy-page-Confirmation",
  props: {
    kName: String,
    hName: String,
    collNumber: String,
    email: String,
    address: String,
    cardNumber: String,
    number: String,
    postal: String,
    point: String,
  },
  setup(props, context) {
    const data = reactive({
      kName: props.kName,
      hName: props.hName,
      email: props.email,
      postal: props.postal,
      address: props.address,
      collNumber: props.collNumber,
      property: null,
      cardLength: null,
      cardValue: null,
      propertyName: null,
      propertyPrice: null,
      propertyStreet_address: null,
      propertyStation_id: null,
      propertyPhysical_distance: null,
      propertyStation_walk: null,
      propertyFloor_plan: null,
      imgPath: null,
      number: props.number,
      poinnt: props.point,
      conpoint: 0,
      sum: 0,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { GetProperty } = UserHelper();
    let watchEffectResult = parseInt(
      1000 + data.propertyPrice * 10000 - data.poinnt
    );
    const poinntChenge = () => {
      data.sum = parseInt(1000 + data.propertyPrice * 10000 - data.poinnt);
    };
    onMounted(async () => {
      if (props.number == undefined || props.number == null) {
        router.push("/Error");
      }
      try {
        data.cardLength = String(props.cardNumber).length - 4;
        data.cardValue = String(props.cardNumber).substr(-4);
      } catch (eroor) {
        router.push("/Error");
      }
      data.property = await GetProperty(store.state.apiUrl, props.number);
      if (data.property) {
        data.propertyName = data.property.name;
        data.propertyPrice = data.property.price;
        data.propertyStreet_address = data.property.street_address;
        data.propertyStation_id = store.state.station[data.property.station_id];
        data.propertyPhysical_distance = data.property.physical_distance;
        data.propertyStation_walk = data.property.station_walk;
        data.propertyFloor_plan =
          store.state.floor_plan[data.property.floor_plan];
        data.imgPath = data.property.thumbnails;
      } else {
        router.push("/Error");
      }
      try {
        data.conpoint = data.poinnt;
        data.sum = parseInt(1000 + data.propertyPrice * 10000 - data.poinnt);
      } catch (error) {
        router.push("/Error");
      }
    });
    return {
      data,
      poinntChenge,
    };
  },
};
</script>
