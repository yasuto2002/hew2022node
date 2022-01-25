<template>
  <div class="alert alert-primary">
    <h1>{{ data.title }}</h1>
    <p class="mt-3 h5">{{ data.msg }}</p>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "Hello",
  setup(props, context) {
    const data = reactive({
      title: "Hello",
      msg: "This is Hello component.",
    });
    return {
      data,
    };
  },
};
</script>
