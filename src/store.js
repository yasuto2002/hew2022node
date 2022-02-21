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
        Matches: "使用できない文字列が含まれています",
        Fraud: "不正な値です"
      },
      provisFlg: "",
      apiUrl: "http://localhost:8080",
      regex: /[^!"#$%&'()\*\+\-\,\/:;<=>?\[\\\]^_`{|}~]+/g,
      // regex: /^(?!.*!|"|#|\$|%|&|'|(|)|\*|\+|\-|\,|\/|:|;|<|=|>|\[|\\|\]|_|`|{|\||}|~|).+$/,
      properties: "",
      word: "",
      Umaile: null,
      serch: {
        lower: null,
        upper: null,
        floor_plan: null,
        building_type: null,
        room_floor: null,
        construction: null,
        construction_date: null,
        station_walk: null
      },
      station: {
        1: "新宿",
        2: "代々木",
        3: "原宿",
        4: "渋谷",
        5: "恵比寿",
        6: "目黒",
        7: "五反田",
        8: "大崎",
        9: "品川",
        10: "高輪ゲートウェイ",
        11: "浜松町",
        12: "有楽町",
        13: "東京",
        14: "神田",
        15: "恵比寿",
        16: "秋葉原",
        17: "御徒町",
        18: "上野",
        19: "鶯谷",
        20: "日暮里",
        21: "西日暮里",
        22: "田端",
        23: "駒込",
        24: "巣鴨",
        25: "大塚",
        26: "目白",
        27: "高田馬場",
        28: "新大久保",
        29: "田町",
      },
      root: {
        1: "山手線",
        2: "中央線",
        3: "山手線",
        4: "山手線",
        5: "山手線",
        6: "山手線",
        7: "山手線",
        8: "山手線",
        9: "山手線",
        10: "山手線",
        11: "山手線",
        12: "山手線",
        13: "山手線",
        14: "山手線",
        15: "山手線",
        16: "山手線",
        17: "山手線",
        18: "山手線",
        19: "山手線",
        20: "山手線",
        21: "山手線",
        22: "山手線",
        23: "山手線",
        24: "山手線",
        25: "山手線",
        26: "山手線",
        27: "山手線",
        28: "山手線",
        29: "山手線",
      },
      floor_plan: {
        1: "ワンルーム",
        2: "1K",
        3: "1DK",
        4: "1LDK",
        5: "2K",
        6: "2DK",
        7: "2LDK",
        8: "3K",
        9: "3DK",
        10: "3LDK",
        11: "4K",
        12: "4DK",
        13: "3LDK",
        14: "5k以上",
      },
      building_type: {
        1: "マンション",
        2: "アパート",
        3: "一戸建て・その他"
      },
      construction: {
        1: "鉄筋コンクリート",
        2: "木造",
        3: "ブロック・その他"
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
