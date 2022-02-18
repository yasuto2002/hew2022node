import {
  reactive
} from 'vue'
import axios from "axios";
export default function () {
  /**
   * メンバ変数的なリアクティブデータです
   */
  const user = reactive({
    id: 0,
    name: '',
  })
  /**
   * ユーザーをセットします
   * @param data
   */
  const setUser = (data) => Object.keys(data).forEach(key => user[key] = data[key])
  /**
   * ユーザーをゲットします
   */
  /**
   * ユーザーを編集します
   * @returns {string}
   */
  const editUser = () => user.name = user.name + 'さん'
  const LogCheck = async () => {
    let reqstatus;
    let surl = "/AuthLog";
    try {
      reqstatus = await axios.post(surl);
      if (reqstatus.data.status) {
        let maile = reqstatus.data.status;
        return maile;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const getUser = async (url, maile) => {
    let reqstatus;
    let surl = url + "/Mypage";
    let params = new URLSearchParams();
    params.append("mail_address", maile);
    try {
      reqstatus = await axios.post(surl, params);
      if (reqstatus.data.status) {
        let user = reqstatus.data.user;
        return user;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const getUserPoint = async (url, maile) => {
    let reqstatus;
    let surl = url + "/Mypage";
    let params = new URLSearchParams();
    params.append("mail_address", maile);
    try {
      reqstatus = await axios.post(surl, params);
      if (reqstatus.data.status) {
        let user = reqstatus.data.user;
        let point = reqstatus.data.point;
        let data = {
          user: user,
          point: point
        }
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const GetProperty = async (url, number) => {
    let reqstatus;
    let surl = url + "/GetProperty";
    let params = new URLSearchParams();
    params.append("number", number);
    try {
      reqstatus = await axios.post(surl, params);
      if (reqstatus.data.state) {
        let Property = reqstatus.data.property;
        return Property;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  return {
    setUser,
    getUser,
    editUser,
    LogCheck,
    GetProperty,
    getUserPoint
  }
}
