console.log("url");
var interval_id = null;

interval_id = setInterval(() => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let data = JSON.parse(request.responseText);
        // JSON.parse(request.responseText);
        console.log(data);
        if (data.judg == true) {
          stopInterval(data);
        }

      }
    }
  }
  request.open('GET', 'http://52.197.166.43/matchRequest', true);
  request.send();


}, 5000);

function stopInterval(urldata) {
  clearInterval(interval_id);
  location.href = `/game?player_id=${urldata.playerid}&roomid=${urldata.roomid}`;
}
