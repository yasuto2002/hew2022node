<template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li>ヘルプ</li>
    </ul>
  </div>

  <div class="help-box">
    <h1 class="help-box-title">よくある質問</h1>
    <div class="help-accordion-box">
      <ul class="accordion-area">
        <li>
          <section>
            <h3 class="title">TROUBLE HOUSEとは</h3>
            <div class="box">
              <p>
                TROUBLE HOUSEとは「事故物件」を売却しているサイトです。<br />
                都内で物件を買いたい方に不動産情報を提供します。
              </p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">事故物件とは</h3>
            <div class="box">
              <p>
                事故物件とは「心理的瑕疵のある物件」のことです。<br />
                「心理的瑕疵」とは、心理的な抵抗を感じるような事実がある物件のことを指します。
              </p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">退会手続き方法を知りたい</h3>
            <div class="box">
              <p>
                サイト内の「<router-link class="link" to="/Member-withdrawal"
                  >退会ページ</router-link
                >」より退会が可能です。
              </p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">対応エリアを知りたい</h3>
            <div class="box">
              <p>2021年3月現在、都内のみ物件を売却をしております。</p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">お問い合わせ方法を教えてください</h3>
            <div class="box">
              <p>
                サイト内の「<router-link class="link" to="/Contact"
                  >問い合わせフォーム</router-link
                >」よりお問い合わせください。
                何かお困りのことがございましたら、ぜひご活用ください。
              </p>
            </div>
          </section>
        </li>
      </ul>
    </div>
    <div class="help-accordion-category">
      <h1 class="help-accordion-category-title"><span>カテゴリー</span></h1>
      <div class="help-accordion-category-box">
        <div class="help-accordion-categorymini-box">
          <p class="help-accordion-categorymini-txt">初めてのお客さま</p>
          <router-link to="/Help-first"
            ><img src="images/初めてのお客様.png" style="width: 85%"
          /></router-link>
        </div>
        <div class="help-accordion-categorymini-box">
          <p class="help-accordion-categorymini-txt">会員情報について</p>
          <router-link to="help-member"
            ><img src="images/アカウント.png" style="width: 85%"
          /></router-link>
        </div>
        <div class="help-accordion-categorymini-box">
          <p class="help-accordion-categorymini-txt">お支払いについて</p>
          <router-link to="help-pay"
            ><img src="images/支払いする女の子.png" style="width: 85%"
          /></router-link>
        </div>
      </div>
    </div>
    <div class="help-contact">
      <h1 class="help-contact-title">問題は解決しましたか？</h1>
      <p class="help-contact-txt">
        解決しない場合はこちらよりお問い合わせください
      </p>
      <router-link to="/Contact" class="help-contact-btn help-contact-btn-c"
        ><i class="far fa-envelope"></i>お問い合わせはこちら<i
          class="fas fa-chevron-right"
        ></i
      ></router-link>
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
import $ from "jquery";
export default {
  name: "help",
  setup(props, context) {
    const data = reactive({});
    onMounted(async () => {
      $(".title").on("click", function () {
        //タイトル要素をクリックしたら
        $(".box").slideUp(500); //クラス名.boxがついたすべてのアコーディオンを閉じる

        var findElm = $(this).next(".box"); //タイトル直後のアコーディオンを行うエリアを取得

        if ($(this).hasClass("close")) {
          //タイトル要素にクラス名closeがあれば
          $(this).removeClass("close"); //クラス名を除去
        } else {
          //それ以外は
          $(".close").removeClass("close"); //クラス名closeを全て除去した後
          $(this).addClass("close"); //クリックしたタイトルにクラス名closeを付与し
          $(findElm).slideDown(500); //アコーディオンを開く
        }
      });

      //ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
      $(window).on("load", function () {
        $(".accordion-area li:first-of-type section").addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
        $(".open").each(function (index, element) {
          //openクラスを取得
          var Title = $(element).children(".title"); //openクラスの子要素のtitleクラスを取得
          $(Title).addClass("close"); ///タイトルにクラス名closeを付与し
          var Box = $(element).children(".box"); //openクラスの子要素boxクラスを取得
          $(Box).slideDown(500); //アコーディオンを開く
        });
      });
    });
    return {
      data,
    };
  },
};
</script>
