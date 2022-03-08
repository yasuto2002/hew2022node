<template>
  <div class="headhead">
    <div class="head_img" v-bind:class="data.back[$store.state.topCount]"></div>
    <div class="head_img_sec">
      <h2 class="head_img_sec-title">
        <span class="head-img-title-bg">TROUBLE</span><br /><span
          class="head-img-title-bg"
          >HOUSE</span
        >
      </h2>
      <p class="head_img_sec-txt">
        <span class="head-img-txt-bg"
          >「趣味にお金を使いたい」「貯金したい」「駅近物件に住みたい」</span
        ><br />
        <span class="head-img-txt-bg"
          >そんな方々にオススメのお家をご提供致します。</span
        >
      </p>
    </div>
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

          <!--
      <div class="line-box">
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">新宿</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">池袋</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">秋葉原</span></label>
      </div>

      <div class="line-box">
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">新宿</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">池袋</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">秋葉原</span></label>
      </div>

      -->

          <div class="searchform_border">
            <p class="searchform_txt">賃料</p>
          </div>
          <div class="rent">
            <!-- <select name="rent_low">
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
      </select> -->
            <div class="rent-box">
              <div class="rent_ipselect rent_sl05">
                <select required name="rent_low" v-model="data.lower">
                  <option value="null">下限なし</option>
                  <option value="1000">1000万円~</option>
                  <option value="2000">2000万円~</option>
                  <option value="3000">3000万円~</option>
                  <option value="4000">4000万円~</option>
                </select>
              </div>
              <div class="rent_ipselect rent_sl05">
                <select required name="Rent_hight" v-model="data.upper">
                  <option value="null">上限なし</option>
                  <option value="1000">~1000万円</option>
                  <option value="2000">~2000万円</option>
                  <option value="3000">~3000万円</option>
                  <option value="4000">~4000万円</option>
                </select>
              </div>
            </div>
          </div>

          <div class="searchform_border">
            <p class="searchform_txt">間取りタイプ</p>
          </div>
          <div class="searchform_floor">
            <div class="floor-box">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="1"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">1R</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="2"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">1K</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="3"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">1DK</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="4"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">1LDK</span></label
              >
            </div>
            <div class="floor-box">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="5"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">2K</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="6"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">2DK</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="7"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">2LDK</span></label
              >
            </div>
            <div class="floor-box">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="8"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">3K</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="9"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">3DK</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="10"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">3LDK</span></label
              >
            </div>
            <div class="floor-box">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="11"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">4K</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="12"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">4DK</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor"
                  v-model="data.floor_plan"
                  value="13"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText">4LDK</span></label
              >
            </div>
            <label class="floor-radio"
              ><input
                class="floor-radio-Input"
                type="radio"
                name="floor"
                v-model="data.floor_plan"
                value="14"
              /><span class="floor-radio-DummyInput"></span
              ><span class="floor-radio-LabelText">5K以上</span></label
            >
          </div>

          <div class="searchform_border">
            <p class="searchform_txt">建物の種類</p>
          </div>
          <div class="searchform_floor">
            <div class="room-box">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="building_type"
                  value="1"
                  v-model="data.building_type"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">マンション</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="building_type"
                  value="2"
                  v-model="data.building_type"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">アパート</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="building_type"
                  value="3"
                  v-model="data.building_type"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">一戸建て</span></label
              >
            </div>
          </div>

          <div class="searchform_border">
            <p class="searchform_txt">部屋階数</p>
          </div>
          <div class="searchform_floor">
            <div class="sarch-display">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor_plan"
                  value="1"
                  v-model="data.room_floor"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">1階</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor_plan"
                  value="2"
                  v-model="data.room_floor"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">2階</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor_plan"
                  value="3"
                  v-model="data.room_floor"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">3階</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="floor_plan"
                  value="4"
                  v-model="data.room_floor"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">それ以上</span></label
              >
            </div>
            <!-- <label><input type="radio" name="floor">1階</label>
      <label><input type="radio" name="floor">2階</label>
      <label><input type="radio" name="floor">3階</label>
      <label><input type="radio" name="floor">それ以上</label> -->
          </div>

          <div class="searchform_border">
            <p class="searchform_txt">構造</p>
          </div>
          <div class="searchform_floor">
            <div class="building-box">
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="construction"
                  value="2"
                  v-model="data.construction"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">木造</span></label
              >
              <label class="floor-radio"
                ><input
                  class="floor-radio-Input"
                  type="radio"
                  name="construction"
                  value="1"
                  v-model="data.construction"
                /><span class="floor-radio-DummyInput"></span
                ><span class="floor-radio-LabelText-a">鉄筋</span></label
              >
            </div>
            <label class="floor-radio"
              ><input
                class="floor-radio-Input"
                type="radio"
                name="construction"
                value="3"
                v-model="data.construction"
              /><span class="floor-radio-DummyInput"></span
              ><span class="floor-radio-LabelText-a"
                >ブロック・それ以外</span
              ></label
            >
            <!-- <label><input type="radio" name="floor">木造</label>
      <label><input type="radio" name="floor">鉄筋</label>
      <label><input type="radio" name="floor">鉄骨</label><br>
      <label><input type="radio" name="floor">ブロック・それ以外</label> -->
          </div>

          <div class="searchform_border">
            <p class="searchform_txt">築年数</p>
          </div>

          <div class="rent-box">
            <div class="rent_ipselect rent_sl05">
              <select required name="rent_low" v-model="data.construction_date">
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
          </div>

          <div class="searchform_border">
            <p class="searchform_txt">駅徒歩</p>
          </div>
          <div class="rent-box">
            <div class="rent_ipselect rent_sl05">
              <select required v-model="data.station_walk">
                <option value="null">指定しない</option>
                <option value="5">5分以内</option>
                <option value="10">10分以内</option>
                <option value="15">15分以内</option>
                <option value="20">15分以上</option>
              </select>
            </div>
          </div>

          <div class="searchform_submit">
            <section>
              <a @click="getConditions()" class="btn_06"
                ><span>この条件で検索</span></a
              >
            </section>
          </div>
        </form>
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

  <div class="about-wrap">
    <h1>TROUBLE HOUSEとは<span>- ABOUT -</span></h1>
  </div>

  <div class="about-slider">
    <div class="slid-bg">
      <ul class="slider">
        <li><img src="images/slid-img01.jpg" alt="" /></li>
        <li><img src="images/slid-img02.jpg" alt="" /></li>
        <li><img src="images/slid-img03.jpg" alt="" /></li>
        <li><img src="images/slid-img04.jpg" alt="" /></li>
        <li><img src="images/slid-img05.jpg" alt="" /></li>
        <!--/slider-->
      </ul>

      <div class="slid-txt-wrap">
        <div class="slid-txt">
          <h1>お金も時間も有意義に</h1>
          <p>
            TROUBLEHOUSEでは増え続ける死の問題に真摯に向き合い流通を促すことで<br />
            「事故物件」の価値の向上と住み続けられるまちづくりを目指しています。
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="intro_section">
    <h1>TROUBLE HOUSE会員ができること<span>- SERVICE -</span></h1>
    <!-- <h1>TROUBLE HOUSE会員ができること</h1> -->

    <div class="intro_section_box">
      <div class="flex delayScroll">
        <div class="intro_section_minibox">
          <div class="border-radius">
            <img src="images/パソコンする女の子.png" alt="お気に入り" />
          </div>
          <p>新着物件をメールでお届け</p>
        </div>
        <!-- <p>新着物件をメールでお届け</p> -->
      </div>

      <div class="flex delayScroll">
        <div class="intro_section_minibox">
          <div class="border-radius">
            <img src="images/お気に入りする女の子.png" alt="お気に入り" />
          </div>
          <p>お気に入り登録ができる</p>
        </div>
        <!-- <p>お気に入り登録ができる</p> -->
      </div>

      <div class="flex delayScroll">
        <div class="intro_section_minibox">
          <div class="border-radius">
            <img src="images/ゲームする女の子.png" alt="お気に入り" />
          </div>
          <p>ゲームでポイントが貯めれる</p>
        </div>
      </div>
    </div>

    <router-link class="btn-section" to="/Member"
      >新規会員登録はこちら</router-link
    >
  </div>

  <!-- <div class="flow-wrap">
  <h1>契約までの流れ<span>- FLOW -</span></h1>

  <div class="">


  </div>

</div> -->

  <div class="main-contact-wrap">
    <div class="contact-txtbox">
      <h1>お問い合わせ・ヘルプ<span>- CONTACT -</span></h1>
    </div>
    <router-link to="/Contact" class="btn-section-a"
      >お問い合わせはこちら</router-link
    >
  </div>
</template>
<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css"; // 追加
import "slick-carousel/slick/slick-theme.css";
// import * as slick from "slick-carousel";
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
      back: ["back0", "back1", "back2", "back3", "back4", "back5"],
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
      // console.log(data.root);
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
    onBeforeMount(() => {
      store.state.topCount = 0;
    });
    onMounted(async () => {
      await newArrivals();
      $(".slider").slick({
        arrows: false, //左右の矢印はなし
        autoplay: true, //自動的に動き出すか。初期値はfalse。
        autoplaySpeed: 0, //自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
        speed: 13000, //スライドのスピード。初期値は300。
        infinite: true, //スライドをループさせるかどうか。初期値はtrue。
        pauseOnHover: false, //オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
        pauseOnFocus: false, //フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
        cssEase: "linear", //動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
        slidesToShow: 2, //スライドを画面に4枚見せる
        slidesToScroll: 1, //1回のスライドで動かす要素数
        responsive: [
          {
            breakpoint: 769, //モニターの横幅が769px以下の見せ方
            settings: {
              slidesToShow: 2, //スライドを画面に2枚見せる
            },
          },
          {
            breakpoint: 426, //モニターの横幅が426px以下の見せ方
            settings: {
              slidesToShow: 1.5, //スライドを画面に1.5枚見せる
            },
          },
        ],
      });

      /* 会員ができること */
      function delayScrollAnime() {
        var time = 0.2; //遅延時間を増やす秒数の値
        var value = time;
        $(".delayScroll").each(function () {
          var parent = this; //親要素を取得
          var elemPos = $(this).offset().top; //要素の位置まで来たら
          var scroll = $(window).scrollTop(); //スクロール値を取得
          var windowHeight = $(window).height(); //画面の高さを取得
          var childs = $(this).children(); //子要素を取得

          if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {
            //指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
            $(childs).each(function () {
              if (!$(this).hasClass("fadeUp")) {
                //アニメーションのクラス名が指定されているかどうかをチェック

                $(parent).addClass("play"); //親要素にクラス名playを追加
                $(this).css("animation-delay", value + "s"); //アニメーション遅延のCSS animation-delayを追加し
                $(this).addClass("fadeUp"); //アニメーションのクラス名を追加
                value = value + time; //delay時間を増加させる

                //全ての処理を終わったらplayを外す
                var index = $(childs).index(this);
                if (childs.length - 1 == index) {
                  $(parent).removeClass("play");
                }
              }
            });
          } else {
            $(childs).removeClass("fadeUp"); //アニメーションのクラス名を削除
            value = time; //delay初期値の数値に戻す
          }
        });
      }

      // 画面をスクロールをしたら動かしたい場合の記述
      $(window).scroll(function () {
        delayScrollAnime(); /* アニメーション用の関数を呼ぶ*/
      }); // ここまで画面をスクロールをしたら動かしたい場合の記述

      // 画面が読み込まれたらすぐに動かしたい場合の記述
      $(window).on("load", function () {
        delayScrollAnime(); /* アニメーション用の関数を呼ぶ*/
      }); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述
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
.wrap {
  row-gap: 60px !important;
}
</style>
