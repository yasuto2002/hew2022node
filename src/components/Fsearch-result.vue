 <template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="property-search.html"></a>物件検索</li>
      <li>ＪＲ山手線(東京都)から探すマンションの購入情報 検索結果一覧</li>
    </ul>
  </div>

  <div class="main_box">
    <div class="main">
      <!--左側　新着物件-->
      <LeftSerch />
      <!--右側　新着物件-->
      <div class="right-sarch-column">
        <template v-for="(item, key) in data.properties" :key="key">
          <div class="sarch-section" v-if="key < 4" @click="say(item.id)">
            <h1 class="sarch-section-title">{{ item.name }}</h1>
            <div class="sarch-section-box">
              <img
                :src="item.thumbnails"
                style="width: 20%; margin: auto 5%"
                alt="新着物件イメージ画像"
              />
              <div class="sarch-section-box-txt">
                <dl>
                  <dt>物件名</dt>
                  <dd>{{ item.name }}</dd>
                  <dt>賃料</dt>
                  <dd style="color: red; font-weight: bold">
                    {{ item.price }}
                    万円
                  </dd>
                  <dt>所在地</dt>
                  <dd>{{ item.street_address }}</dd>
                  <dt>沿線・駅</dt>
                  <dd>
                    {{ $store.state.root[item.station_id]
                    }}{{ $store.state.station[item.station_id] }}駅 徒歩{{
                      item.physical_distance
                    }}m徒歩{{ item.station_walk }}分
                  </dd>
                  <dt>間取</dt>
                  <dd>{{ $store.state.floor_plan[item.floor_plan] }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </template>

        <nav class="pagination">
          <div class="nav-links">
            <!-- <a class="first page-numbers" href="">&laquo;</a> -->

            <!-- <a class="prev page-numbers" href="">&lsaquo;</a> -->
            <!-- <span aria-current="page" class="page-numbers current">1</span>
            <a class="page-numbers" href="search-result-second.html">2</a>
            <a class="page-numbers" href="">3</a>
            <span class="page-numbers dots">…</span>
            <a class="page-numbers" href="">10</a> -->
            <template v-if="data.page <= 1">
              <template v-for="n in data.count" :key="n">
                <span
                  v-if="n == 1"
                  aria-current="page"
                  class="page-numbers current"
                  >{{ n }}</span
                >
                <router-link
                  v-if="n == 2"
                  :to="{
                    name: 'Fsearch-result',
                    params: { maile: data.maile, page: n },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
                <router-link
                  v-if="n == 3"
                  :to="{
                    name: 'Fsearch-result',
                    params: { maile: data.maile, page: n },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
              </template>
              <template v-if="3 < data.count">
                <span class="page-numbers dots">…</span>
                <router-link
                  :to="{
                    name: 'Fsearch-result',
                    params: { maile: data.maile, page: data.count },
                  }"
                  class="page-numbers"
                  >{{ data.count }}</router-link
                >
              </template>
              <!-- <router-link
                :to="{
                  path: '/Wsearch-result',
                  query: {
                    word: $route.query.word,
                    page: data.next,
                  },
                }"
                class="last page-numbers"
                v-if="data.page < data.count"
                >&raquo;</router-link
              > -->
            </template>

            <template v-else>
              <router-link
                :to="{
                  name: 'Fsearch-result',
                  params: { maile: data.maile, page: data.page - 1 },
                }"
                class="last page-numbers"
                >&laquo;</router-link
              >
              <template v-for="n in data.count" :key="n">
                <router-link
                  v-if="n == data.page - 1"
                  :to="{
                    name: 'Fsearch-result',
                    params: { maile: data.maile, page: n },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
                <span
                  v-if="n == data.page"
                  aria-current="page"
                  class="page-numbers current"
                  >{{ n }}</span
                >
                <router-link
                  v-if="n == data.next"
                  :to="{
                    name: 'Fsearch-result',
                    params: { maile: data.maile, page: n },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
              </template>
              <template v-if="data.next < data.count">
                <span class="page-numbers dots">…</span>
                <router-link
                  :to="{
                    name: 'Fsearch-result',
                    params: { maile: data.maile, page: data.count },
                  }"
                  class="page-numbers"
                  >{{ data.count }}</router-link
                >
              </template>
            </template>
            <router-link
              :to="{
                name: 'Fsearch-result',
                params: { maile: data.maile, page: data.next },
              }"
              class="last page-numbers"
              v-if="data.page < data.count"
              >&raquo;</router-link
            >

            <!-- <a class="next page-numbers" href="">&rsaquo;</a> -->
            <!-- <a class="last page-numbers" href="">&raquo;</a> -->
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useField, useForm } from "vee-validate";
import LeftSerch from "./LeftSerch.vue";
import UserHelper from "../functons/userHelper";
export default {
  name: "Search-result",
  components: {
    LeftSerch,
  },
  props: {
    page: String,
  },
  setup(props) {
    const data = reactive({
      properties: "",
      count: null,
      page: props.page,
      next: null,
      maile: null,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { LogCheck } = UserHelper();
    const getProperties = async () => {
      let reqstatus;
      let surl = store.state.apiUrl + "/Favorites";
      let params = new URLSearchParams();
      params.append("mail_address", data.maile);
      params.append("skip", (props.page - 1) * 4);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          data.properties = reqstatus.data.properties;
          data.count = Math.ceil(reqstatus.data.count / 4);
          data.page = route.params.page;
          data.next = parseInt(data.page) + 1;
          console.log(data.count);
          console.log(data.page);
          console.log(data.next);
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const updateProperties = async (page, maile) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/Favorites";
      let params = new URLSearchParams();
      params.append("mail_address", maile);
      params.append("skip", (page - 1) * 4);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          data.properties = reqstatus.data.properties;
          data.count = Math.ceil(reqstatus.data.count / 4);
          data.page = page;
          data.next = parseInt(data.page) + 1;
          console.log(data.count);
          console.log(data.page);
          console.log(data.next);
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const serch = (num) => {
      router.push({
        name: "Wsearch-result",
        query: { word: route.query.word, page: num },
      });
      router.go(0);
    };
    const say = (st) => {
      router.push({
        path: "/Property-detail",
        query: { number: st },
      });
    };
    onMounted(async () => {
      // if (props.page == null) {
      //   router.push("/");
      // }
      data.maile = await LogCheck();
      if (data.maile) {
        getProperties();
      } else {
        router.push("/");
      }
    });
    onBeforeRouteUpdate((to, from, next) => {
      updateProperties(to.params.page, data.maile);
      next();
    });
    return {
      serch,
      data,
      say,
    };
  },
};
</script>
<style scoped>
.pagination {
  justify-content: center;
}
.searchform_submit {
  width: 19vw;
  margin: 2vw 0px 0px 20px;
}
.sarch-section:hover {
  cursor: pointer;
}
</style>
