<template>
  <div class="breadcrumb">
    <ul class="breadcrumb_ul">
      <li><a href="index.html">不動産・住宅情報サイトTROUBLE HOUSE</a></li>
      <li><a href="help.html">ヘルプ</a></li>
      <li>お問い合わせ</li>
    </ul>
  </div>

  <div class="contact-box">
    <h1 class="contact-box-title">お問い合わせ</h1>
    <!-- <form class="contact-form">
        <div class="contact-form-name-box">
          <span class="Form-Item-Label-Required">必須</span>
          <p class="contact-form-name-txt">姓</p><input type="text" class="contact-form-name-input">
          <p class="contact-form-name-txt">名</p><input type="text" class="contact-form-name-input">
        </div>
        <span class="Form-Item-Label-Required">必須</span>
        <p class="contact-form-txt">メールアドレス</p><input type="text" class="contact-form-input">
        <span class="Form-Item-Label-Required">必須</span>
        <p class="contact-form-txt">お問い合わせ</p><textarea class="Form-Item-Textarea"></textarea>
      </form> -->
    <div class="Form">
      <div class="Form-Item">
        <p class="Form-Item-Label">
          <span class="Form-Item-Label-Required">必須</span>氏名
        </p>
        <input
          type="text"
          class="Form-Item-Input"
          placeholder="例）山田太郎"
          v-model="name"
        />
      </div>
      <div class="Form-Item">
        <p class="Form-Item-Label">
          <span class="Form-Item-Label-Required">必須</span>メールアドレス
        </p>
        <input
          type="email"
          class="Form-Item-Input"
          placeholder="例）example@gmail.com"
          v-model="email"
        />
      </div>
      <div class="Form-Item">
        <p class="Form-Item-Label isMsg">
          <span class="Form-Item-Label-Required">必須</span>お問い合わせ内容
        </p>
        <textarea class="Form-Item-Textarea" v-model="content"></textarea>
      </div>
      <p class="Form-Item-Label-attention">
        内容をご記入の上、お問い合わせください。
      </p>
      <a href="contact-decision.html"
        ><input
          type="button"
          class="Form-Btn"
          value="送信する"
          @click="onSubmit"
          :disabled="!meta.valid"
      /></a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import axiosJsonpAdapter from "vue-jsonp";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Contact",
  setup(props, context) {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      email: yup
        .string(em.String)
        .max(254, em.Smax)
        .required(em.Quired)
        .email(em.Maile),
      name: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
      content: yup
        .string(em.String)
        .max(254, em.Smax)
        .matches(store.state.regex, em.Matches)
        .required(em.Quired),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
        name: "",
        content: "",
      },
    });
    const onSubmit = handleSubmit(async (values) => {
      let reqstatus;
      let surl = store.state.apiUrl + "/Content";
      let params = new URLSearchParams();
      params.append("mail_address", values.email);
      params.append("name", values.name);
      params.append("text", values.content);
      try {
        reqstatus = await axios.post(surl, params);
        if (reqstatus.data.state) {
          router.push("/Contact-decision");
        } else {
          router.push("/Error");
        }
      } catch (error) {
        router.push("/Error");
      }
    });
    const { value: email } = useField("email");
    const { value: name } = useField("name");
    const { value: content } = useField("content");
    return {
      data,
      email,
      name,
      content,
      meta,
      errors,
      onSubmit,
    };
  },
};
</script>
