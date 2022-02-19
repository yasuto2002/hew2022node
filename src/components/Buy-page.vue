<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="search-result.html">物件検索</a></li>
      <li><a href="property-detail.html">練馬区の賃貸 物件一覧</a></li>
      <li><a href="index.html">東京都練馬区大泉学園町</a></li>
      <li>お支払い</li>
    </ul>
  </div>

  <div class="buy-page-box-title-box">
    <p class="buy-page-box-title">お支払い方法</p>
  </div>

  <div class="buy-page-main">
    <div class="buy-page-box">
      <div class="buy-page-box-left">
        <form>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">お名前</p>
            <p class="buy_page-Form-Item-Label-mini1">姓</p>
            <input
              type="text"
              class="buy_page-Form-Item-Input-mini"
              placeholder="田中"
              v-model="hsName"
            />
            <p class="buy_page-Form-Item-Label-mini1">名</p>
            <input
              type="text"
              class="buy_page-Form-Item-Input-mini"
              placeholder="太郎"
              v-model="hfName"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">フリガナ</p>
            <p class="buy_page-Form-Item-Label-mini2">セイ</p>
            <input
              type="text"
              class="buy_page-Form-Item-Input-mini"
              placeholder="タナカ"
              v-model="ksName"
            />
            <p class="buy_page-Form-Item-Label-mini2">メイ</p>
            <input
              type="text"
              class="buy_page-Form-Item-Input-mini"
              placeholder="タロウ"
              v-model="kfName"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">電話番号</p>
            <input
              type="tel"
              class="buy_page-Form-Item-Input"
              placeholder="0330000000"
              v-model="collNumber"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">メールアドレス</p>
            <input
              type="email"
              class="buy_page-Form-Item-Input"
              placeholder="XXXXX@gmail.com"
              v-model="email"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">郵便番号</p>
            <input
              id="input"
              class="zipcode"
              type="text"
              name="zipcode"
              placeholder="8120012"
              v-model="postal"
              maxlength="8"
            />
            <button id="search" type="button" @click="serch">住所検索</button>
            <p id="error">{{ data.error }}</p>
          </div>

          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">都道府県</p>
            <input
              id="address1"
              type="text"
              name="address1"
              v-model="address1"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">市区町村</p>
            <input
              id="address2"
              type="text"
              name="address2"
              v-model="address2"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">町域</p>
            <input
              id="address3"
              type="text"
              name="address3"
              v-model="address3"
            />
          </div>
          <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">それ以降の住所</p>
            <input
              type="txt"
              class="buy_page-Form-Item-Input"
              v-model="address4"
            />
          </div>
          <div class="buy_page-Form-Item" style="border-bottom: 1px solid #fff">
            <p class="buy_page-Form-card-Item-Label">クレジットカード</p>
            <div class="card-box">
              <div class="buy_page-Form-Item">
                <p class="buy_page-Form-cardnum-Item-Label">カード番号</p>
                <input
                  type="txt"
                  class="buy_page-cardForm-Item-Input"
                  maxlength="16"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  v-model="cardNumber"
                />
              </div>
              <div class="buy_page-Form-Item">
                <p class="buy_page-Form-cardnum-Item-Label">名義人名</p>
                <input
                  type="txt"
                  class="buy_page-cardForm-Item-Input"
                  maxlength="25"
                  placeholder="name"
                  v-model="cardName"
                />
              </div>
              <div class="buy_page-Form-Item">
                <p class="buy_page-Form-cardnum-Item-Label">有効期限</p>
                <input
                  type="txt"
                  class="buy_page-Form-miniItem-Input1"
                  maxlength="2"
                  placeholder="02"
                  v-model="cardMonth"
                />
                <p class="buy_page-Form-cardnum-miniItem-Label">月</p>
                <input
                  type="txt"
                  class="buy_page-Form-miniItem-Input2"
                  maxlength="2"
                  placeholder="27"
                  v-model="cardYear"
                />
                <p class="buy_page-Form-cardnum-miniItem-Label">年</p>
              </div>
              <div class="buy_page-Form-Item">
                <p class="buy_page-Form-cardnum-Item-Label">CSV</p>
                <input
                  type="txt"
                  class="buy_page-cardForm-Item-Input"
                  placeholder="&#9679;&#9679;&#9679;"
                  v-model="cardCsv"
                  maxlength="4"
                />
              </div>
            </div>
          </div>
          <!-- <div class="buy_page-Form-Item">
            <p class="buy_page-Form-Item-Label">ポイント</p>
            <label class="ECM_RadioInput"><input class="ECM_RadioInput-Input" type="radio" name="radio"><span class="ECM_RadioInput-DummyInput"></span><span class="ECM_RadioInput-LabelText">使用しない</span></label>
            <label class="ECM_RadioInput"><input class="ECM_RadioInput-Input" type="radio" name="radio"><span class="ECM_RadioInput-DummyInput"></span><span class="ECM_RadioInput-LabelText">使用する</span></label>
            <p class="buy_page_point_possible_label">使用可能ポイント</p>
            <input type="text" class="buy_page_point_possible-Form-Item-Input">
            <p class="buy_page_point_possible_label">ポイント</p>
          </div> -->

          <!-- <p class="buy_page-Form-card-Item-title">クレジットカード</p> -->

          <!-- <div class="buy_page-Form-card-Item">
                <p class="buy_page-Form-card-Item-Label">カード番号</p>
                <input type="text" class="buy_page-Form-card-Item-Input">
              </div>
              <div class="buy_page-Form-card-Item">
                <p class="buy_page-Form-card-Item-Label">セキュリティコード</p>
                <input type="text" class="buy_page-Form-card-Item-Input">
              </div>
              <div class="buy_page-Form-card-Item">
                <p class="buy_page-Form-card-Item-Label">有効期限</p>
                <input type="number" class="buy_page-Form-card-Item-Input">
              </div>
              <div class="buy_page-Form-card-Item">
                <p class="buy_page-Form-card-Item-Label">支払い回数</p>
                <input type="number" class="buy_page-Form-card-Item-Input">
              </div> -->

          <!-- <article class="part card-details">
                          <form action="" if="cc-form" autocomplete="off">
                              <div class="group card-number">
                                  <label for="first" class="buy_page-Form-card-Item-Label">カード番号</label>
                                  <input type="text" id="first" class="cc-num" type="text" maxlength="16" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">

                              </div>
                              <div class="group card-name">
                                  <label for="name" class="buy_page-Form-card-Item-Label">名義人名</label>
                                  <input type="text" id="name" class="buy_page-Form-card-Item-Input" type="text" maxlength="25" placeholder="name">
                              </div>
                              <div class="group card-expiry">
                                  <div class="input-item expiry">
                                      <label for="expiry" class="buy_page-Form-card-Item-Label">有効期限</label>
                                      <input type="text" class="month" id="expiry" placeholder="02">
                                      <input type="text" class="year" id="" placeholder="2027">
                                  </div>
                                  <div class="input-item csv">
                                      <label for="csv" class="buy_page-Form-card-Item-Label">CSV</label>
                                      <input type="text" class="csv-num">
                                  </div>
                              </div>
                          </form>
                      </article>
                      <div class="part bg"></div>
                  </div> -->
        </form>
      </div>
      <div class="buy-page-box-right">
        <div class="buy-page-box-right-minibox">
          <button
            type="button"
            class="buy-page-minibox-btn"
            @click="onSubmit"
            :disabled="!meta.valid"
          >
            次へ進む
          </button>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt">物件詳細</p>
            <p class="buy-page-box-box-txt">{{ data.propertyName }}</p>
          </div>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt">物件価格</p>
            <p class="buy-page-box-box-txt">¥{{ data.propertyPrice }}0000</p>
          </div>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt">支払い手数料</p>
            <p class="buy-page-box-box-txt">¥1000</p>
          </div>
          <div class="buy-page-box-box">
            <p class="buy-page-box-box-txt" style="font-weight: bold">
              合計（税込）
            </p>
            <p
              class="buy-page-box-box-txt"
              style="font-weight: bold; color: rgb(230, 71, 71)"
            >
              ¥{{ data.sum }}
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
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import axiosJsonpAdapter from "axios-jsonp";
import * as yup from "yup";
import UserHelper from "../functons/userHelper";
import { Core as YubinBangoCore } from "yubinbango-core2";
export default {
  name: "Buy-page",
  props: {
    number: String,
  },
  setup(props, context) {
    const data = reactive({
      error: "",
      number: "",
      user: null,
      Udata: null,
      hname: null,
      kname: null,
      property: null,
      propertyName: null,
      propertyPrice: null,
      sum: 0,
      point: 0,
    });
    const { getUserPoint } = UserHelper();
    const { LogCheck } = UserHelper();
    const { GetProperty } = UserHelper();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      postal: yup
        .string(em.Fraud)
        .min(7, em.Fraud)
        .max(8, em.Fraud)
        .required(em.Quired),
      address1: yup
        .string(em.String)
        .max(7, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      address2: yup
        .string(em.String)
        .max(7, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      address3: yup
        .string(em.String)
        .max(7, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      address4: yup
        .string(em.String)
        .max(7, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      ksName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      kfName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      hsName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      hfName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      email: yup
        .string(em.String)
        .max(254, em.Smax)
        .required(em.Quired)
        .email(em.Maile),
      cardNumber: yup
        .string(em.Fraud)
        .min(14, em.Fraud)
        .max(16, em.Fraud)
        .required(em.Quired),
      cardName: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      cardMonth: yup
        .string(em.Fraud)
        .min(2, em.Fraud)
        .max(2, em.Fraud)
        .required(em.Quired),
      cardYear: yup
        .string(em.Fraud)
        .min(2, em.Fraud)
        .max(2, em.Fraud)
        .required(em.Quired),
      cardCsv: yup
        .string(em.Fraud)
        .min(3, em.Fraud)
        .max(4, em.Fraud)
        .required(em.Quired),
      collNumber: yup
        .string(em.Fraud)
        .min(10, em.Fraud)
        .max(11, em.Fraud)
        .required(em.Quired),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        postal: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        ksName: "",
        kfName: "",
        hsName: "",
        hfName: "",
        email: data.user,
        cardNumber: "",
        cardName: "",
        cardMonth: "",
        cardYear: "",
        cardCsv: "",
        collNumber: "",
      },
    });
    const { value: postal } = useField("postal");
    const { value: address1 } = useField("address1");
    const { value: address2 } = useField("address2");
    const { value: address3 } = useField("address3");
    const { value: address4 } = useField("address4");
    const { value: ksName } = useField("ksName");
    const { value: kfName } = useField("kfName");
    const { value: hsName } = useField("hsName");
    const { value: hfName } = useField("hfName");
    const { value: email } = useField("email");
    const { value: cardNumber } = useField("cardNumber");
    const { value: cardName } = useField("cardName");
    const { value: cardMonth } = useField("cardMonth");
    const { value: cardYear } = useField("cardYear");
    const { value: cardCsv } = useField("cardCsv");
    const { value: collNumber } = useField("collNumber");
    const serch = async () => {
      let value = 0;
      value = postal.value;
      value = value.replace("-", "");
      try {
        new YubinBangoCore(value, (values) => {
          address1.value = values.region;
          address2.value = values.locality;
          address3.value = values.street;
        });
      } catch (error) {
        console.log(error);
        data.error = "郵便番号から住所が見つかりませんでした。";
      }
      // let reqstatus;
      // let surl = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";
      // let value = 0;
      // value = postal.value;
      // value = value.replace("-", "");
      // try {
      //   reqstatus = await axios.get(surl + value, {
      //     adapter: axiosJsonpAdapter,
      //   });
      //   address1.value = reqstatus.data.results[0].address1;
      //   address2.value = reqstatus.data.results[0].address2;
      //   address3.value = reqstatus.data.results[0].address3;
      // } catch (error) {
      //   console.log(error);
      //   data.error = "郵便番号から住所が見つかりませんでした。";
      // }
    };
    const onSubmit = async () => {
      router.push({
        name: "Buy-page-Confirmation",
        params: {
          kName: ksName.value + kfName.value,
          hName: hsName.value + hfName.value,
          collNumber: collNumber.value,
          email: email.value,
          address:
            address1.value + address2.value + address3.value + address4.value,
          cardNumber: cardNumber.value,
          postal: postal.value,
          number: data.number,
          point: data.point,
        },
      });
    };
    onMounted(async () => {
      if (route.query.number == undefined) {
        router.push("/Error");
      }
      data.number = route.query.number;
      let flg = await LogCheck();
      if (flg) {
        data.user = flg;
        data.Udata = await getUserPoint(store.state.apiUrl, flg);
        data.hname = data.Udata.user.name.split(".");
        data.kname = data.Udata.user.kname.split(".");
        data.point = data.Udata.point;
        ksName.value = data.kname[0];
        kfName.value = data.kname[1];
        hsName.value = data.hname[0];
        hfName.value = data.hname[1];
        email.value = data.user;
      }
      data.property = await GetProperty(store.state.apiUrl, data.number);
      if (data.property) {
        data.propertyName = data.property.name;
        data.propertyPrice = data.property.price;
        data.sum = parseInt(data.propertyPrice + "0000") + parseInt(1000);
      } else {
        router.push("/Error");
      }
    });
    return {
      data,
      postal,
      onSubmit,
      address1,
      address2,
      address3,
      ksName,
      kfName,
      hsName,
      hfName,
      serch,
      email,
      address4,
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      cardCsv,
      collNumber,
      meta,
      errors,
    };
  },
};
</script>
<style scoped>
.buy-page-minibox-btn:hover {
  cursor: pointer;
}
.buy-page-box-right-minibox {
  height: 290px;
}
.buy-page-minibox-btn {
  color: #fff;
}
</style>
