<template>
  <!-- パンくずリスト -->
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li>
        <router-link to="/">不動産・住宅情報サイトTROUBLE HOUSE</router-link>
      </li>
      <li>購入検索</li>
    </ul>
  </div>

  <!--stylecss表記-->

  <div class="sarchcart-property-title-box">
    <p class="sarchcart-property-title">購入検索</p>
  </div>
  <p class="em" v-if="data.em">
    購入番号またはメールアドレスが違います。再度正しく入力してください。
  </p>
  <p class="em">
    {{ errors.number }}
  </p>
  <p class="em" v-if="data.em">
    {{ errors.maile }}
  </p>
  <form>
    <div class="sarchcart-property-box">
      <div class="sarchcart-property-num-box">
        <div class="sarchcart-property-num">
          <p class="sarchcart-property-num-title">購入番号</p>
        </div>
        <div class="sarchcart-property-num-text">
          <input
            type="text"
            placeholder="購入番号"
            class="sarchcart-property-textbox"
            v-model="number"
            v-on:change="cheng"
          />
        </div>
      </div>

      <div class="sarchcart-property-mail-box">
        <div class="sarchcart-property-mail">
          <p class="sarchcart-property-mail-title">メールアドレス</p>
        </div>
        <div class="sarchcart-property-mail-text">
          <input
            type="email"
            placeholder="メールアドレス"
            class="sarchcart-property-textbox"
            v-model="maile"
            v-on:change="cheng"
          />
        </div>
      </div>

      <div class="sarchcart-property-btn-wrap">
        <a
          ><input
            class="sarchcart-property-btn"
            type="submit"
            value="購入を照会する"
            :disabled="!meta.valid"
            @click="onSubmit"
        /></a>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Sarchcart-property",
  setup() {
    const data = reactive({
      // maile: "",
      // password: "",
      em: false,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      maile: yup
        .string(em.String)
        .max(254, em.Smax)
        .required(em.Quired)
        .email(em.Maile),
      number: yup.string(em.String).max(6, em.Smax).required(em.Quired),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        maile: "",
        number: "",
      },
    });
    const { value: maile } = useField("maile");
    const { value: number } = useField("number");

    const onSubmit = handleSubmit(async (values) => {
      router.push({
        name: "Sarchcart-property-detail",
        params: { number: values.number, maile: values.maile },
      });
    });
    const cheng = () => {
      data.em = false;
    };
    onMounted(() => {});
    return {
      errors,
      data,
      maile,
      meta,
      onSubmit,
      cheng,
      number,
    };
  },
};
</script>
<style scoped>
.em {
  color: crimson;
  text-align: center;
}
</style>
