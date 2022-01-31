//Expressのモジュールを取り込んで生成
const express = require('express')
const path = require('path')
const mysql = require('mysql');
const app = express()
const cors = require('cors');
const axios = require('axios');
const axiosJsonpAdapter = require("axios-jsonp");
const fs = require("fs");
const session = require('express-session');
const cors = require('cors')
var roomFile;
var room;
const crypto = require("crypto");

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.get('/match', (req, res) => {
  return res.render("match", {
    url: __dirname
  });
});
app.use(cors());

//サーバーを起動
const server = app.listen(3000, () => {
  console.log('sucsess!!')
})
// //サーバーを起動
// const server = app.listen(3000, () => {
//   console.log('sucsess!!')
// })

//セッション
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));

const {
  Server
} = require("socket.io");
const {
  exit
} = require('process');
var io = new Server(server);
app.get('/game', (req, res) => {
  if (req.session.flg && req.session.flg != null) {
    req.session.flg = null;
    io.on('connection', (socket) => {

      console.log('a user connected');
      socket.join(req.query.roomid);
      room = req.query.roomid;
      console.log(socket.rooms);
    });
    return res.render("game", {
      player_id: req.query.player_id,
      roomid: req.query.roomid
    });
  } else {
    res.redirect('/');
    return;
  }
});


function makeToken(id) {
  const str = SECRET_TOKEN + id;
  return (crypto.createHash("sha1").update(str).digest('hex'));
}
// app.use("/static", express.static(path.join(__dirname, "static")));

function getMemberList() {
  const list = [];
  console.log();
  for (let key in MEMBER) {
    const cur = MEMBER[key];
    if (cur.name !== null) {
      list.push({
        token: cur.count,
        name: cur.name
      });
    }
  }
  return (list);
}

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test'
});
app.get('/sql', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('sqltest.ejs', {
        items: results
      });
    }
  );
});


app.get('/matchRequest', (req, res) => {
  fs.readFile("room.json", {
    encoding: "utf-8",
    flag: 'r+',
  }, (err, data) => {
    if (err) throw err;
    roomFile = JSON.parse(data);
    let check = false;
    var resData;
    let i = 0;
    while (i < 3 && !check) {
      console.log(roomFile[i].player1);
      if (roomFile[i].player1 == null) {
        resData = {
          "judg": true,
          "roomid": roomFile[i].roomid,
          "playerid": 1
        };
        roomFile[i].player1 = true;
        roomFile = JSON.stringify(roomFile);
        fs.writeFile("room.json", roomFile, (err) => {
          if (err) throw err;
        });
        check = true;
        req.session.flg = true;
        res.json(resData);
      } else if (roomFile[i].player2 == null) {
        resData = {
          "judg": true,
          "roomid": roomFile[i].roomid,
          "playerid": 2
        };
        roomFile[i].player2 = true;
        roomFile = JSON.stringify(roomFile);
        fs.writeFile("room.json", roomFile, (err) => {
          if (err) throw err;
        });
        check = true;
        req.session.flg = true;
        res.json(resData);
      }
      i++;
    }
    if (!check) {
      resData = {
        "judg": false,
        "roomid": null,
        "playerid": null
      };
      res.json(resData);
    }
    // else {
    //   roomFile = JSON.stringify(roomFile);
    //   fs.writeFile("room.json", roomFile, (err) => {
    //     if (err) throw err;
    //     console.log('正常に書き込みが完了しました');
    //   });
    // }
  });
  // res.json(resData);
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.join("room1");
// });

const SECRET_TOKEN = "abcdefghijklmn12345";
const MEMBER = [{}];
let MEMBER_COUNT = 1;


// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });
io.on('connection', (socket) => {
  const token = makeToken(socket.id);
  MEMBER[socket.id] = {
    "token": token,
    "name": null,
    "count": MEMBER_COUNT
  };
  MEMBER_COUNT++;
  io.on("connection", (socket) => {
    const token = makeToken(socket.id);
    io.to(socket.id).emit("token", {
      token: token
    });
    console.log(socket.id);
    // ユーザーリストに追加
    MEMBER[socket.id] = {
      token: token,
      name: null,
      count: MEMBER_COUNT
    };
    MEMBER_COUNT++;
    console.log(MEMBER);
  });
  socket.on("join", (data) => {
    const memberlist = getMemberList();
    io.to(socket.id).emit("join-result", {
      status: true,
      list: memberlist
    });
    // メンバー一覧に追加
    MEMBER[socket.id].name = data.name;

    // 入室通知
    io.to(socket.id).emit("member-join", data);
    socket.broadcast.emit("member-join", {
      name: data.name,
      token: MEMBER[socket.id].count
    });
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg.value);
  });
  socket.on('chat message', (msg) => {
    io.to(msg.room).emit('chat message', msg);
  });
  socket.on('client_to_server_personal', (data) => {
    // io.to("room1").emit('client_to_server_personal', data.roomid);
    io.socketsLeave("room1");
    socket.join(data.roomid);
    console.log(socket.rooms);
  });
  socket.on('submit Location', (location) => {
    io.to(location.room).emit('submit Location', location);
  });
  socket.on('gameStart', (msg) => {

    io.to(msg.room).emit('gameStart', msg);
  });
  socket.on('Start', (msg) => {
    io.to(msg.room).emit('Start');
  });
  socket.on('disconnect', function () {
    if (room != "") {
      io.to(MEMBER[socket.id].name).emit('breakRoom', {
        name: MEMBER[socket.id].name
      });
      console.log(MEMBER[socket.id].name);
    }
    socket.broadcast.emit("member-quit", {
      token: MEMBER[socket.id].count,
      name: MEMBER[socket.id].name
    });
    delete MEMBER[socket.id];
  });
});



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//publicディレクトリ以下は自動で返す
app.use(express.static(path.join(__dirname, 'public')))
//トップへのアクセスを/publicへ流す
// app.get('/', (req, res) => {
//   res.redirect(302, '/public')
// })
app.get("/rest", function (req, res) {
  let url = "http://localhost:8080/rest";
  let data;
  let postData = async () => {
    try {
      data = await axios.get(url, {
        adapter: axiosJsonpAdapter,
        // callbackParamName: "cb",
        // params: {
        //   name: "foo",
        // },
      });
      console.log("成成功");
    } catch (error) {
      console.log("post Error");
      // ダメなときはエラー
      console.error(error);
    }
    return data;
  }
  return postData();
});

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
