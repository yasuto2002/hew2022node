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
        Maile: '有効なメールアドレスを入力してください'
      }
    }
  }
})
