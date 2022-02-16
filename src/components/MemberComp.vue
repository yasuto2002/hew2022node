 <template>
  <div class="member-comp-box">
    <h1 class="member-comp-box-title">会員登録が完了しました</h1>
    <p class="member-comp-box-txt">
      TROUBLE HOUSEに登録いただき、ありがとうございます。<br />
      この後も、TROUBLE HOUSEでのお買い物をどうぞお楽しみください。<br />
      <br />
    </p>
    <router-link to="/" class="member-comp-box-link">TOPへ戻る</router-link>
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
export default {
  name: "MemberComp",
  setup(props, context) {
    const data = reactive({
      title: "HelloWorld",
      msg: "This is HelloWorld component.",
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    onMounted(async () => {});
    return {
      data,
    };
  },
};
</script>
