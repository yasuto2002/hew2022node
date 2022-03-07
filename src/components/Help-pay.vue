<template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li><router-link to="/Help">ヘルプ</router-link></li>
      <li>お支払いについて</li>
    </ul>
  </div>
  <div class="help-title-box">
    <p class="help-title">お支払いについて</p>
  </div>
  <div class="help-box">
    <div class="help-pay-accordion-box">
      <ul class="accordion-area">
        <li>
          <section>
            <h3 class="title">支払い方法</h3>
            <div class="box">
              <p>「クレジットカード」のみとなります。</p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">
              他の支払い方法へ変更するには、どのようにするのですか？
            </h3>
            <div class="box">
              <p>
                当サイトでは、クレジットカードでのお支払いのみとなりますので変更ができません。<br />
              </p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">ポイントを貯めるにはどうしたらいいですか？</h3>
            <div class="box">
              <p>
                サイト内の「<a class="link" href="/match">ゲーム</a
                >」からポイントを貯めれます。
              </p>
            </div>
          </section>
        </li>
      </ul>
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
  name: "Help-pay",
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
