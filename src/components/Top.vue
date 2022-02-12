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

        <div class="searchform_border">
          <p class="searchform_txt">絞り込み条件</p>
        </div>
        <form class="search_line">
          <label><input type="radio" name="line" />山手線</label>
          <label><input type="radio" name="line" />中央線</label>
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
          <div class="card">
            <img src="images/house.png" alt="" />

            <div class="card__textbox">
              <div class="card__titletext">東京都新宿区</div>
              <div class="card__titletext_price">1200万円</div>
              <div class="card__overviewtext">
                JR山手線<br />JR中央・青海線快速
              </div>
              <div class="card__overviewtext">徒歩9分 / 38㎡ / 1LDK</div>
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
import { ref, reactive } from "vue";
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
        },
      });
    };
    return {
      data,
      word,
      getWord,
      meta,
      getConditions,
    };
  },
};
</script>
<style>
.head_img {
  object-fit: cover;
}
</style>
