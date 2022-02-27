<template>
  <div class="headhead">
    <div class="head_img">a</div>
  </div>

  <div class="main_box">
    <div class="main">
      <!--左側　新着物件-->
      <div class="left-column">
        <p class="searchform_head">駅名・エリア名で一発検索</p>
        <form
          method="get"
          action="#"
          class="search_container"
          @submit="getWord"
        >
          <input
            type="text"
            class="searchform_text-form"
            size="30"
            placeholder="お探しの駅またはエリア名を入力"
            v-model="word"
          />
          <input type="submit" value="検索" :disabled="!meta.valid" />
        </form>

        <form class="search_property">
          <div class="searchform_border">
            <p class="searchform_txt">絞り込み条件</p>
          </div>

          <ul class="select-radio select-radio-inline">
            <li class="select-radio-item">
              <input
                checked
                id="radio-btn1"
                name="line"
                type="radio"
                value="1"
                v-model="data.root"
              />
              <label class="select-radio-label" for="radio-btn1">山手線</label>
            </li>
            <li class="select-radio-item">
              <input
                id="radio-btn2"
                name="line"
                type="radio"
                value="2"
                v-model="data.root"
              />
              <label class="select-radio-label" for="radio-btn2">中央線</label>
            </li>
          </ul>

          <!-- <div class="line-box">
            <label class="line_CheckboxInput"
              ><input class="line_CheckboxInput-Input" type="checkbox" /><span
                class="line_CheckboxInput-DummyInput"
              ></span
              ><span class="line_CheckboxInput-LabelText">新宿</span></label
            >
            <label class="line_CheckboxInput"
              ><input class="line_CheckboxInput-Input" type="checkbox" /><span
                class="line_CheckboxInput-DummyInput"
              ></span
              ><span class="line_CheckboxInput-LabelText">池袋</span></label
            >
            <label class="line_CheckboxInput"
              ><input class="line_CheckboxInput-Input" type="checkbox" /><span
                class="line_CheckboxInput-DummyInput"
              ></span
              ><span class="line_CheckboxInput-LabelText">秋葉原</span></label
            >
          </div>

          <div class="line-box">
            <label class="line_CheckboxInput"
              ><input class="line_CheckboxInput-Input" type="checkbox" /><span
                class="line_CheckboxInput-DummyInput"
              ></span
              ><span class="line_CheckboxInput-LabelText">新宿</span></label
            >
            <label class="line_CheckboxInput"
              ><input class="line_CheckboxInput-Input" type="checkbox" /><span
                class="line_CheckboxInput-DummyInput"
              ></span
              ><span class="line_CheckboxInput-LabelText">池袋</span></label
            >
            <label class="line_CheckboxInput"
              ><input class="line_CheckboxInput-Input" type="checkbox" /><span
                class="line_CheckboxInput-DummyInput"
              ></span
              ><span class="line_CheckboxInput-LabelText">秋葉原</span></label
            >
          </div> -->
          <!--
      <label><input type="checkbox" name="line">山手線</label>
      <label><input type="checkbox" name="line">中央線</label> -->
        </form>

        <div class="searchform_border">
          <p class="searchform_txt">賃料</p>
        </div>
        <div class="rent">
          <select name="rent_low" v-model="data.lower">
            <option value="null">下限なし</option>
            <option value="1000">1000万円~</option>
            <option value="2000">2000万円~</option>
            <option value="3000">3000万円~</option>
            <option value="4000">4000万円~</option>
          </select>
          <select name="Rent_hight" v-model="data.upper">
            <option value="null">上限なし</option>
            <option value="1000">~1000万円</option>
            <option value="2000">~2000万円</option>
            <option value="3000">~3000万円</option>
            <option value="4000">~4000万円</option>
          </select>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">間取りタイプ</p>
        </div>
        <div class="searchform_floor">
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="1"
            />1R</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="2"
            />1K</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="3"
            />1DK</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="4"
            />1LDK</label
          ><br />
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="5"
            />2K</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="6"
            />2DK</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="7"
            />2LDK</label
          ><br />
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="8"
            />3K</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="9"
            />3DK</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="10"
            />3LDK</label
          ><br />
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="11"
            />4K</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="12"
            />4DK</label
          >
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="13"
            />4LDK</label
          ><br />
          <label
            ><input
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="14"
            />5K以上</label
          >
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">建物の種類</p>
        </div>
        <div class="searchform_floor">
          <label
            ><input
              type="radio"
              name="building_type"
              value="1"
              v-model="data.building_type"
            />マンション</label
          >
          <label
            ><input
              type="radio"
              name="building_type"
              value="2"
              v-model="data.building_type"
            />アパート</label
          >
          <label
            ><input
              type="radio"
              name="building_type"
              value="3"
              v-model="data.building_type"
            />一戸建て</label
          >
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">部屋階数</p>
        </div>
        <div class="searchform_floor">
          <label
            ><input
              type="radio"
              name="floor_plan"
              value="1"
              v-model="data.room_floor"
            />1階</label
          >
          <label
            ><input
              type="radio"
              name="floor_plan"
              value="2"
              v-model="data.room_floor"
            />2階</label
          >
          <label
            ><input
              type="radio"
              name="floor_plan"
              value="3"
              v-model="data.room_floor"
            />3階</label
          >
          <label
            ><input
              type="radio"
              name="floor_plan"
              value="4"
              v-model="data.room_floor"
            />それ以上</label
          >
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">構造</p>
        </div>
        <div class="searchform_floor">
          <label
            ><input
              type="radio"
              name="construction"
              value="1"
              v-model="data.construction"
            />鉄筋</label
          >
          <label
            ><input
              type="radio"
              name="construction"
              value="2"
              v-model="data.construction"
            />木造</label
          >
          <label
            ><input
              type="radio"
              name="construction"
              value="3"
              v-model="data.construction"
            />ブロック・それ以外</label
          >
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">築年数</p>
        </div>
        <div class="rent">
          <select name="rent_low" v-model="data.construction_date">
            <option value="null">指定しない</option>
            <option value="-1">1年以内</option>
            <option value="-3">3年以内</option>
            <option value="-5">5年以内</option>
            <option value="-7">7年以内</option>
            <option value="-10">10年以内</option>
            <option value="-15">15年以内</option>
            <option value="-20">20年以内</option>
            <option value="-25">25年以内</option>
          </select>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">駅徒歩</p>
        </div>
        <div class="rent">
          <select name="rent_low" v-model="data.station_walk">
            <option value="null">指定しない</option>
            <option value="5">5分以内</option>
            <option value="10">10分以内</option>
            <option value="15">15分以内</option>
            <option value="20">15分以上</option>
          </select>
        </div>

        <div class="searchform_submit">
          <section>
            <a class="btn_06" @click="getConditions()"><span>BUTTON</span></a>
          </section>
        </div>
      </div>

      <!--右側　新着物件-->
      <div class="right-column">
        <!-- <div class="object">
      <section class="object-card">
          <img class="object-card-img" src="https://placehold.jp/300x200.png" alt="">
              <div class="object-card-content">
                  <h1 class="object-card-title">Webクリエイターボックス</h1>
                  <p class="object-card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
              </div>
      </section>
      <section class="object-card">
          <img class="object-card-img" src="https://placehold.jp/300x200.png" alt="">
              <div class="object-card-content">
                  <h1 class="object-card-title">Webクリエイターボックス</h1>
                  <p class="object-card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
              </div>
      </section>
      <section class="object-card">
          <img class="object-card-img" src="https://placehold.jp/300x200.png" alt="">
              <div class="object-card-content">
                  <h1 class="object-card-title">Webクリエイターボックス</h1>
                  <p class="object-card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
              </div>
      </section>
    </div> -->

        <div class="wrap">
          <!-- <div class="card">
            <img src="images/house.png" alt="" />

            <div class="card__textbox">
              <div class="card__titletext">東京都新宿区</div>
              <div class="card__titletext_price">1200万円</div>
              <div class="card__overviewtext">
                JR山手線<br />JR中央・青海線快速
              </div>
              <div class="card__overviewtext">徒歩9分 / 38㎡ / 1LDK</div>
            </div>
          </div> -->
          <template v-for="(item, key) in data.property" :key="key">
            <div class="card" @click="say(item.id)">
              <img :src="item.thumbnails" alt="物件画像" />

              <div class="card__textbox">
                <div class="card__titletext">{{ item.name }}</div>
                <div class="card__titletext_price">{{ item.price }}万円</div>
                <div class="card__overviewtext">
                  JR山手線<br />{{ $store.state.station[item.station_id] }} 駅
                </div>
                <div class="card__overviewtext">
                  徒歩{{ item.station_walk }}分 /{{ item.physical_distance }}㎡
                  /
                  {{ $store.state.floor_plan[item.floor_plan] }}
                </div>
              </div>
            </div>
          </template>

          <!-- <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <div class="intro_section">
    <h1>TROUBLE HOUSE会員ができること</h1>

    <div class="intro_section_box">
      <div class="intro_section_minibox">
        <div class="border-radius">
          <img src="images/パソコンする女の子.png" alt="お気に入り" />
        </div>
        <p>新着物件をメールでお届け</p>
      </div>
      <!-- <p>新着物件をメールでお届け</p> -->

      <div class="intro_section_minibox">
        <div class="border-radius">
          <img src="images/お気に入りする女の子.png" alt="お気に入り" />
        </div>
        <p>お気に入り登録ができる</p>
      </div>
      <!-- <p>お気に入り登録ができる</p> -->

      <div class="intro_section_minibox">
        <div class="border-radius">
          <img src="images/ゲームする女の子.png" alt="お気に入り" />
        </div>
        <p>ゲームでポイントが貯めれる</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Top",
  setup(props, context) {
    const data = reactive({
      lower: null,
      upper: null,
      floor_plan: null,
      building_type: null,
      room_floor: null,
      construction: null,
      construction_date: null,
      station_walk: null,
      property: null,
      root: 1,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      word: yup.string().required(),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        word: "",
      },
    });
    const { value: word } = useField("word");

    const getWord = handleSubmit(async (values) => {
      store.state.word = values.word;
      router.push({
        name: "Wsearch-result",
        query: { word: values.word, page: 1 },
      });
    });
    const getConditions = () => {
      console.log(data.root);
      router.push({
        name: "Csearch-result",
        query: {
          lower: data.lower,
          upper: data.upper,
          floor_plan: data.floor_plan,
          building_type: data.building_type,
          room_floor: data.room_floor,
          construction: data.construction,
          construction_date: data.construction_date,
          station_walk: data.station_walk,
          page: 1,
          root: data.root,
        },
      });
    };
    const newArrivals = async () => {
      let reqstatus;
      let surl = store.state.apiUrl + "/NewArrivals";
      // let params = new URLSearchParams();
      // params.append("latitude", position.coords.latitude);
      // params.append("longitude", position.coords.longitude);
      // params.append("page", 1);
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.state) {
          data.property = reqstatus.data.property;
        } else {
          router.push("/Error");
        }
      } catch (error) {
        console.log(error);
        router.push("/Error");
      }
    };
    const say = (st) => {
      router.push({
        path: "/Property-detail",
        query: { number: st },
      });
    };
    onMounted(async () => {
      await newArrivals();
    });
    return {
      data,
      word,
      getWord,
      meta,
      getConditions,
      newArrivals,
      say,
    };
  },
};
</script>
<style>
.head_img {
  object-fit: cover;
}
.card img {
  height: 132px;
  object-fit: cover;
}
.card {
  cursor: pointer;
}
.card__titletext {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
