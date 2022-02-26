console.log("url");
var interval_id = null;
var flg = false;
var data;
interval_id = setInterval(() => {
  if (!flg) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          data = JSON.parse(request.responseText);
          // JSON.parse(request.responseText);
          if (data.judg == true) {
            // stopInterval(data);
            flg = true;
          }

        }
      }
    }
    request.open('GET', '/matchRequest', true);
    request.send();
  } else {
    let surl = '/matchconf?id=' + data.roomid;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          let pdata = JSON.parse(request.responseText);
          if (pdata.judg == true) {
            console.log(pdata.judg);
            stopInterval(data);
          }

        }
      }
    }
    request.open('GET', surl, true);
    request.send();
  }

}, 5000);

function stopInterval(urldata) {
  clearInterval(interval_id);
  location.href = `/game?player_id=${urldata.playerid}&roomid=${urldata.roomid}`;
}
