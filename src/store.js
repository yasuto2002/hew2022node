import axios from "axios";
import {
  createStore
} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
        Pasmin: '10文字以上入力してください',
        Matches: "使用できない文字列が含まれています"
      },
      provisFlg: "",
      apiUrl: "http://localhost:8080",
      regex: /[^!"#$%&'()\*\+\-\,\/:;<=>?\[\\\]^_`{|}~]+/,
      properties: "",
      word: "",
      serch: {
        lower: null,
        upper: null,
        floor_plan: null,
        building_type: null,
        room_floor: null,
        construction: null,
        construction_date: null,
        station_walk: null
      }
    }
  },
  mutations: {
    addproperties: (state, ob) => {
      state.properties = ob;
    },
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
  },
  plugins: [
    createPersistedState({
      storage: window.localStrage
    }),
  ],
})
