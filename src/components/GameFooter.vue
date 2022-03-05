<template>
  <footer id="game-footer" class="footer-outer-block">
    <div class="footer-inner-block">
      <div class="footer-wrap">
        <div class="footer-logo">
          <router-link to="/"
            ><img
              src="images-game/hew-logo-bg.png"
              alt=""
              style="width: 150px; height: 63px"
          /></router-link>
        </div>
        <ul class="footer-nav">
          <li><router-link to="/">TOP</router-link></li>
          <li><router-link to="/Help">よくある質問</router-link></li>
          <li><router-link to="/Contact">お問い合わせ</router-link></li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      COPYRIGHT &copy; TROUBLEHOUSE Inc. All rights Reserved.
    </div>
  </footer>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "GameFooter",
  // setup(props, context) {
  //   const data = reactive({
  //     title: "HelloWorld",
  //     msg: "This is HelloWorld component.",
  //   });
  //   return {
  //     data,
  //   };
  // },
};
</script>
