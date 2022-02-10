<template>
  <header class="header">
    <div class="headerNavOuter flexBox">
      <!-- ロゴ -->
      <!-- <h1 class="siteIcon">
          <a href="#">
              <img src="https://drive.google.com/uc?export=view&id=1mu_N2iTeoQCeUiuWRgJ0xwjR4AZ-29bL" alt="">
          </a>
      </h1> -->
      <!-- ナビゲーション -->
      <nav class="headerNav">
        <ul class="navList flexBox">
          <li class="navItem navItemHome">
            <!-- <a href="member.html"> 会員登録 </a> -->
            <router-link to="/Member"> 会員登録 </router-link>
          </li>
          <li class="navItem navItemIntroduce">
            <!-- <a href="login-member.html"> ログイン </a> -->
            <router-link to="/Login"> ログイン </router-link>
          </li>
          <li class="navItem navItemAbout">
            <a href="#"> 購入検索 </a>
          </li>
          <li class="logo">
            <router-link to="/"
              ><img src="images/hew-logo.png" alt=""
            /></router-link>
          </li>
          <li class="navItem navItemAccess">
            <a href="#"> 物件検索 </a>
          </li>
          <li class="navItem navItemContact">
            <a href="./login.html"> ゲーム </a>
          </li>
          <li class="navItem navItemContact">
            <a href="./login.html"> ヘルプ </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
// import { ref, reactive } from "vue";

export default {
  name: "Hello",
};
</script>
