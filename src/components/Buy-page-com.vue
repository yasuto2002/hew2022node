<template>
  <div class="error-box">
    <h1 class="error-box-title">Thanks you!</h1>
    <h1 class="error-box-title">購入内容の確認</h1>
    <h1 class="error-box-title">購入番号：{{ data.num }}</h1>
    <p class="error-box-txt">
      この度はTROUBLE HOUSEでのお買い物ありがとうございました。<br />
      手続き完了後、お知らせメールを再度配信させていただきますので<br />
      手続き完了までもうしばらくお待ちください。<br />
    </p>
    <img src="images/おばけ.jpg" style="width: 20%" />
    <!--なおす-->
  </div>
</template>
<script>
import { ref, reactive } from "vue";

export default {
  name: "Buy-page-com",
  props: {
    num: String,
  },
  setup(props, context) {
    const data = reactive({
      num: props.num,
    });
    return {
      data,
    };
  },
};
</script>
