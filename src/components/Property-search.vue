<template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>物件検索</li>
    </ul>
  </div>

  <h1 class="property-search-title">駅名・エリア名で一発検索</h1>

  <div class="property-search-box">
    <h1 class="property-search-box-title">駅名・エリア名で一発検索</h1>
    <form method="get" action="#" class="search_container">
      <input
        type="text"
        size="30"
        placeholder="お探しの駅またはエリア名を入力"
        style="width: 1000px"
      />
      <input type="submit" value="検索" /><img
        src="images/地図マーカー.png"
        @click="GpsSerch"
      />
    </form>
  </div>

  <div class="search-box-content">
    <div class="search-box-content-box">
      <div class="search-box_left">
        <p class="search-box_head">絞り込み条件</p>
        <form class="search-box_line">
          <label><input type="radio" name="line" />山手線</label>
          <label><input type="radio" name="line" />中央線</label>
        </form>

        <div class="search-box_border">
          <p class="search-box_txt">賃料</p>
        </div>
        <div class="search-box-rent">
          <select name="rent_low">
            <option value="low">下限なし</option>
            <option value="aa">1000万円~</option>
            <option value="bb">2000万円~</option>
            <option value="cc">3000万円~</option>
            <option value="dd">4000万円~</option>
          </select>
          <select name="Rent_hight">
            <option value="hight">上限なし</option>
            <option value="ee">~1000万円</option>
            <option value="ff">~2000万円</option>
            <option value="gg">~3000万円</option>
            <option value="hh">~4000万円</option>
          </select>
        </div>

        <div class="search-box_border">
          <p class="search-box_txt">築年数</p>
        </div>
        <div class="search-box-rent">
          <select name="rent_low">
            <option value="zero">指定しない</option>
            <option value="ii">1年以内</option>
            <option value="jj">3年以内</option>
            <option value="kk">5年以内</option>
            <option value="ll">7年以内</option>
            <option value="nn">10年以内</option>
            <option value="mm">15年以内</option>
            <option value="oo">20年以内</option>
            <option value="pp">25年以内</option>
          </select>
        </div>

        <div class="search-box_border">
          <p class="search-box_txt">駅徒歩</p>
        </div>
        <div class="search-box-rent">
          <select name="rent_low">
            <option value="zeroo">指定しない</option>
            <option value="qq">5分以内</option>
            <option value="rr">10分以内</option>
            <option value="ss">15分以内</option>
            <option value="tt">15分以上</option>
          </select>
        </div>
      </div>

      <div class="search-box-right">
        <div class="search-box_border">
          <p class="search-box_txt">間取りタイプ</p>
        </div>
        <div class="search-box_floor">
          <label><input type="radio" name="floor" />1R</label>
          <label><input type="radio" name="floor" />1K</label>
          <label><input type="radio" name="floor" />1DK</label>
          <label><input type="radio" name="floor" />1LDK</label><br />
          <label><input type="radio" name="floor" />2K</label>
          <label><input type="radio" name="floor" />2DK</label>
          <label><input type="radio" name="floor" />2LDK</label><br />
          <label><input type="radio" name="floor" />3K</label>
          <label><input type="radio" name="floor" />3DK</label>
          <label><input type="radio" name="floor" />3LDK</label><br />
          <label><input type="radio" name="floor" />4K</label>
          <label><input type="radio" name="floor" />4DK</label>
          <label><input type="radio" name="floor" />4LDK</label><br />
          <label><input type="radio" name="floor" />5K以上</label>
        </div>

        <div class="search-box_border">
          <p class="search-box_txt">建物の種類</p>
        </div>
        <div class="search-box_floor">
          <label><input type="radio" name="floor" />マンション</label>
          <label><input type="radio" name="floor" />アパート</label>
          <label><input type="radio" name="floor" />一戸建て</label>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">部屋階数</p>
        </div>
        <div class="searchform_floor">
          <label><input type="radio" name="floor" />1階</label>
          <label><input type="radio" name="floor" />2階</label>
          <label><input type="radio" name="floor" />3階</label>
          <label><input type="radio" name="floor" />それ以上</label>
        </div>

        <div class="search-box_border">
          <p class="search-box_txt">構造</p>
        </div>
        <div class="search-box_floor">
          <label><input type="radio" name="floor" />木造</label>
          <label><input type="radio" name="floor" />鉄筋</label>
          <label><input type="radio" name="floor" />鉄骨</label><br />
          <label><input type="radio" name="floor" />ブロック・それ以外</label>
        </div>
      </div>
    </div>
    <div class="search-box_submit">
      <section>
        <a href="#" class="btn_06"><span>検索する</span></a>
      </section>
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
  name: "Property-search",
  setup(props, context) {
    const data = reactive({});
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const GpsSerch = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        //   // console.log(position.coords.latitude);
        //   // console.log(position.coords.longitude);
        //   let reqstatus;
        //   let surl = store.state.apiUrl + "/GpsSerch";
        //   let params = new URLSearchParams();
        //   params.append("latitude", position.coords.latitude);
        //   params.append("longitude", position.coords.longitude);
        //   params.append("page", 1);
        //   try {
        //     reqstatus = await axios.post(surl, params);
        //     console.log(reqstatus);
        //   } catch (error) {
        //     console.log(error);
        //     router.push("/Error");
        //   }
        // });
        try {
          await router.push({
            path: "/Gsearch-result",
            query: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              page: 1,
            },
          });
        } catch (error) {
          condole.log(error);
        }
      });
    };
    return {
      data,
      GpsSerch,
    };
  },
};
</script>
