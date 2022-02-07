import axios from "axios";
import {
  createStore
} from 'vuex'
export const store = createStore({
  state() {
    return {
      message: 'This is store data.',
      loginflg: true,
      em: {
        String: '文字列で入力してください',
        Quired: '必須項目です',
        Date: '年月日を選択してください',
        Maile: '有効なメールアドレスを入力してください',
        OneOf: 'パスワードが一致しません',
        Smax: '255文字以下で入力してください',
        Pasmax: '20文字以下で入力してください',
        Pasmin: '10文字以上入力してください'
      },
      provisFlg: "",
    }
  },
  mutations: {
    getProvisional: async (state) => {
      let reqstatus;
      let surl = "/getUdata";
      let params = new URLSearchParams();
      try {
        reqstatus = await axios.post(surl);
        if (reqstatus.data.maile != null) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  }
})
