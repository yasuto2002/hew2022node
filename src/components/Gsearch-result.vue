 <template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><router-link to="Property-search">物件検索</router-link></li>
      <li>検索結果一覧</li>
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
                    path: '/Gsearch-result',
                    params: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      page: n,
                    },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
                <router-link
                  v-if="n == 3"
                  :to="{
                    path: '/Gsearch-result',
                    params: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      page: n,
                    },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
              </template>
              <template v-if="3 < data.count">
                <span class="page-numbers dots">…</span>
                <router-link
                  :to="{
                    path: '/Gsearch-result',
                    params: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      page: data.count,
                    },
                  }"
                  class="page-numbers"
                  >{{ data.count }}</router-link
                >
              </template>
              <!-- <router-link
                :to="{
                  path: '/Gsearch-result',
                  params: {
                    latitude: data.latitude,
                    longitude: data.longitude,
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
                  path: '/Gsearch-result',
                  params: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    page: data.page - 1,
                  },
                }"
                class="last page-numbers"
                >&laquo;</router-link
              >
              <template v-for="n in data.count" :key="n">
                <router-link
                  v-if="n == data.page - 1"
                  :to="{
                    path: '/Gsearch-result',
                    params: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      page: n,
                    },
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
                    path: '/Gsearch-result',
                    params: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      page: n,
                    },
                  }"
                  class="page-numbers"
                  >{{ n }}</router-link
                >
              </template>
              <template v-if="data.next < data.count">
                <span class="page-numbers dots">…</span>
                <router-link
                  :to="{
                    path: '/Gsearch-result',
                    params: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      page: data.count,
                    },
                  }"
                  class="page-numbers"
                  >{{ data.count }}</router-link
                >
              </template>
            </template>
            <router-link
              :to="{
                path: '/Gsearch-result',
                params: {
                  latitude: data.latitude,
                  longitude: data.longitude,
                  page: data.next,
                },
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
export default {
  name: "Gsearch-result",
  components: {
    LeftSerch,
  },
  props: {
    latitude: String,
    longitude: String,
    page: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      properties: "",
      count: null,
      page: route.query.page,
      next: null,
      latitude: route.query.latitude,
      longitude: route.query.longitude,
    });
    const GpsSerch = async () => {
      let reqstatus;
      let surl = store.state.apiUrl + "/GpsSerch";
      let params = new URLSearchParams();
      params.append("latitude", data.latitude);
      params.append("longitude", data.longitude);
      params.append("page", 1);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          data.properties = reqstatus.data.properties;
          data.count = Math.ceil(reqstatus.data.count[0].count / 4);
          data.next = parseInt(data.page) + 1;
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const updateProperties = async (page, latitude, longitude) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/GpsSerch";
      let params = new URLSearchParams();
      params.append("latitude", latitude);
      params.append("longitude", longitude);
      params.append("page", page);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          data.properties = reqstatus.data.properties;
          data.count = Math.ceil(reqstatus.data.count[0].count / 4);
          data.page = page;
          data.next = parseInt(data.page) + 1;
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    // const serch = (num) => {
    //   router.push({
    //     name: "Wsearch-result",
    //     query: { word: route.query.word, page: num },
    //   });
    //   router.go(0);
    // };
    const say = (st) => {
      router.push({
        path: "/Property-detail",
        query: { number: st },
      });
    };
    onMounted(() => {
      if (
        route.query.latitude == undefined ||
        route.query.latitude == null ||
        route.query.longitude == undefined ||
        route.query.longitude == null ||
        route.query.page == undefined ||
        route.query.page == null
      ) {
        router.push("/Error");
      }
      GpsSerch();
    });
    onBeforeRouteUpdate((to, from, next) => {
      updateProperties(
        route.query.latitude,
        route.query.longitude,
        route.query.page
      );
      next();
    });
    return {
      // serch,
      data,
      say,
      GpsSerch,
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
.sarch-section-box img {
  height: 160px;
  width: 160px !important;
  object-fit: cover;
}
</style>
