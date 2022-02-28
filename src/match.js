import axios from "axios";
var interval_id = null;
var flg = false;
var data;
interval_id = setInterval(async () => {
  if (!flg) {
    try {
      let surl = '/matchRequest';
      let request;
      request = await axios.get(surl);
      data = request.data;
      if (request.data.judg == true) {
        // stopInterval(data);
        flg = true;
      }
    } catch (er) {
      console.log(er);
    }
  } else {
    try {
      let surl = '/matchconf?id=' + data.roomid;
      let request = await axios.get(surl);
      let pdata = request.data;
      if (pdata.judg == true) {
        console.log(pdata.judg);
        stopInterval(data);
      }
    } catch (er) {
      console.log(er)
    }
  }
}, 5000);

function stopInterval(urldata) {
  clearInterval(interval_id);
  location.href = `/game?player_id=${urldata.playerid}&roomid=${urldata.roomid}`;
}
