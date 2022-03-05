<template>
  <div class="game-wrap">
    <div class="game-select">
      <div class="aaa">
        <div class="select-one" @mousedown="Solojump">
          <!-- <div class="aa-txt">１人で遊ぶ</div> -->
        </div>

        <div class="select-second" @mousedown="Maljump">
          <!-- <div class="aa-txt">みんなで遊ぶ</div> -->
        </div>
      </div>
    </div>

    <div class="game-explanation">
      <div class="game-explanation-box-one"></div>
      <div class="game-explanation-box-second"></div>
    </div>
  </div>

  <p id="game-page-top"><router-link to="/">Page Top</router-link></p>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "GameSelect",
  setup(props, context) {
    const data = reactive({});
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const Solojump = () => {
      location.href = "/soleGame";
    };
    const Maljump = () => {
      location.href = "/match";
    };
    return {
      data,
      Solojump,
      Maljump,
    };
  },
};
</script>
<style scoped>
.select-one:hover {
  cursor: pointer;
}
.select-second {
  cursor: pointer;
}
</style>
