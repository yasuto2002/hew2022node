<template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="help.html">ヘルプ</a></li>
      <li>会員情報について</li>
    </ul>
  </div>

  <div class="help-box">
    <h1 class="help-box-title">初めてのお客さま</h1>
    <div class="help-first-accordion-box">
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
            <h3 class="title">
              TROUBLE HOUSE ではどのようなお支払い方法がありますか？
            </h3>
            <div class="box">
              <p>「クレジットカード」のみとなります。<br /></p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">TROUBLE HOUSE は18歳未満でも登録できますか？</h3>
            <div class="box">
              <p>
                TROUBLE
                HOUSEでは、18歳未満の方の登録はご遠慮いただいております。
              </p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">新規会員登録とは</h3>
            <div class="box">
              <p>
                TROUBLE
                HOUSEでは会員登録をするとスムーズにお買い物いただけます。<br />
                ご登録後は、本登録のメールアドレス、パスワードでログインが可能です。<br />
                サイト内の「<router-link class="link" to="/Member"
                  >新規会員登録ページ</router-link
                >」から登録可能です。
              </p>
            </div>
          </section>
        </li>
        <li>
          <section>
            <h3 class="title">登録が完了できません</h3>
            <div class="box">
              <p>
                会員登録ができない場合には、以下の理由が考えられます。<br />
                <br />
                【お客さまのご入力に誤りがある場合】<br />
                赤文字で表示されるエラーをご確認のうえ、会員登録をお願いいたします。<br />
                <br />
                【「ご指定のメールアドレスは登録できません
                」と表示される場合】<br />
                既に同メールアドレスにてご登録がございます。未登録のアドレスをご入力ください。<br />
                <br />
                ご登録内容をお忘れの場合は、 サイト内の「<router-link
                  to="/pass-change"
                  class="link"
                  href="#.html"
                  >パスワードを忘れた方 </router-link
                >」画面より、パスワードの再設定をしてください。
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
  name: "Help-first",
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
