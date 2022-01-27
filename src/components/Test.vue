<template>
  <p v-if="$store.state.flg">{{ $store.state.message }}</p>
  <!-- <label>name</label>
  <input type="text" v-model="data.player" class="form-group" />
  <button @click="getData" class="btn btn primary">Button</button> -->
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "Hello",
  // setup() {
  //   const data = reactive({
  //     player: "yasuto",
  //     flg: false,
  //   });
  // },
};
</script>
