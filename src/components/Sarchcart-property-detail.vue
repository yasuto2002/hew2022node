<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>
        <router-link to="/Sarchcart-property">購入検索</router-link>
      </li>
      <li>購入検索詳細</li>
    </ul>
  </div>

  <!--stylecss表記-->

  <div class="sarchcart-property-title-box">
    <p class="sarchcart-property-title">購入検索詳細</p>
  </div>

  <div class="sarchcart-property-detail-wrap">
    <div class="sarchcart-property-detail-box">
      <div class="sarchcart-property-detail-title">
        <div class="sarchcart-property-detail-accordion">
          <div class="accordion-container">
            <div class="accordion-item">
              <div class="accordion-title js-accordion-title">
                <div class="sarch-day">
                  <h3>購入日時</h3>
                  <p>{{ data.buy.purchase_datetime }}</p>
                </div>
                <div class="sarch-price">
                  <h3>合計金額</h3>
                  <p>¥{{ data.buy.purchase_price }}</p>
                </div>
                <div class="sarch-datail">
                  <h3>詳細</h3>
                </div>
              </div>
              <!--/.accordion-title-->
              <div class="accordion-content">
                <div class="accordion-wrap">
                  <div class="buy-num">
                    <h3>購入番号</h3>
                    <p>{{ data.buy.search_password }}</p>
                  </div>
                  <div class="buy-card">
                    <h3>お支払い方法</h3>
                    <p>クレジットカード</p>
                    <p>xxxx-xxxx-xxxx-{{ data.buy.card }}</p>
                  </div>
                  <div class="buy-card">
                    <h3>購入内容</h3>
                    <dl>
                      <dt>価格</dt>
                      <dd>
                        ¥{{
                          data.buy.purchase_price -
                          data.buy.discount_amount -
                          1000
                        }}
                      </dd>
                    </dl>
                    <dl>
                      <dt>支払手数料</dt>
                      <dd>¥1,000</dd>
                    </dl>
                    <dl>
                      <dt>割引</dt>
                      <dd>¥{{ data.buy.discount_amount }}</dd>
                    </dl>
                  </div>
                  <div class="a">
                    <h3>合計金額</h3>
                    <p>¥{{ data.buy.purchase_price }}</p>
                  </div>
                </div>
              </div>
              <!--/.accordion-content-->
            </div>
          </div>
          <!-- /.accordion-container -->
        </div>
        <!-- .accordion -->

        <div class="mypage-sarch-section">
          <a class="sarch-section-link" @click="jump">
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
                  <dt>価格</dt>
                  <dd style="color: red; font-weight: bold">
                    {{
                      String(
                        data.buy.purchase_price -
                          data.buy.discount_amount -
                          1000
                      ).slice(0, -4)
                    }}万円
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
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import UserHelper from "../functons/userHelper";
import { Core as YubinBangoCore } from "yubinbango-core2";
import $ from "jquery";
export default {
  name: "Sarchcart-property-detail",
  props: {
    maile: String,
    number: String,
  },
  setup(props, context) {
    const data = reactive({
      buy: {
        purchase_datetime: null,
        purchase_price: null,
        search_password: null,
        card: null,
        discount_amount: null,
      },
      first: {
        name: null,
        street_address: null,
        thumbnails: null,
        floor_plan: null,
        station_walk: null,
        station_id: null,
        physical_distance: null,
        id: null,
      },
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const jump = () => {
      router.push({
        path: "/Property-detail",
        query: { number: data.first.id },
      });
    };
    onMounted(async () => {
      if (props.maile && props.number) {
        let surl = store.state.apiUrl + "/PurchaseSearch";
        let params = new URLSearchParams();
        params.append("mail_address", props.maile);
        params.append("number", props.number);
        try {
          let reqstatus;
          reqstatus = await axios.post(surl, params);
          if (reqstatus.data.status) {
            data.buy = reqstatus.data.buy;
            data.first = reqstatus.data.first;
          } else {
            router.push("/Error");
          }
          // console.log(reqstatus);
        } catch (error) {
          console.log(error);
          // router.push("/Error");
        }
      } else {
        router.push("/Error");
      }
      $(function () {
        // タイトルをクリックすると
        $(".js-accordion-title").on("click", function () {
          // クリックした次の要素を開閉
          $(this).next().slideToggle(300);
          // タイトルにopenクラスを付け外しして矢印の向きを変更
          $(this).toggleClass("open", 300);
        });
      });
    });
    return {
      data,
      jump,
    };
  },
};
</script>
<style scoped>
a:hover {
  cursor: pointer;
}
</style>
