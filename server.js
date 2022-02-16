//Expressのモジュールを取り込んで生成
const express = require('express')
const path = require('path')
const mysql = require('mysql');
const app = express()
const axios = require('axios');
const axiosJsonpAdapter = require("axios-jsonp");
const fs = require("fs");
const session = require('express-session');
const cors = require('cors')
var roomFile;
var room;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const crypto = require("crypto");
const {
  randomBytes
} = require('crypto')

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.get('/match', (req, res) => {
  return res.render("match", {
    url: __dirname
  });
});

// app.use(cors());

// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, access_token'
//   )

// // intercept OPTIONS method
// if ('OPTIONS' === req.method) {
//   res.send(200)
// } else {
//   next()
// }
// }
// app.use(allowCrossDomain)

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
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));

app.get('/help', (req, res) => {
  let maile = req.session.Log;
  return res.render("help", {
    maile: maile
  });
});
app.get('/help-first', (req, res) => {
  return res.render("help-first");
});
app.get('/help-member', (req, res) => {
  return res.render("help-member");
});
app.get('/help-pay', (req, res) => {
  return res.render("help-pay");
});

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

function generateRandomString(length) {
  return randomBytes(length).reduce((p, i) => p + (i % 32).toString(32), '')
}

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
    if (roomFile.length != 0) {
      while (i < roomFile.length && !check) {
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
          return;
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
          return;
        }
        i++;
      }
    }
    if (!check) {
      let random = generateRandomString(32);
      let roomjson = {
        "roomid": random,
        "player1": true,
        "player2": null
      }
      roomFile[i] = roomjson;
      resData = {
        "judg": true,
        "roomid": random,
        "playerid": 1
      };
      roomFile = JSON.stringify(roomFile);
      fs.writeFile("room.json", roomFile, (err) => {
        if (err) return;
      });
      req.session.flg = true;
      res.json(resData);
      return;
      // resData = {
      //   "judg": false,
      //   "roomid": null,
      //   "playerid": null
      // };
      // res.json(resData);
      // return;
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
    "count": MEMBER_COUNT,
    "id": null
  };
  MEMBER_COUNT++;
  io.on("connection", (socket) => {
    const token = makeToken(socket.id);
    io.to(socket.id).emit("token", {
      token: token
    });
    // ユーザーリストに追加
    MEMBER[socket.id] = {
      token: token,
      name: null,
      count: MEMBER_COUNT,
      "id": null
    };
    MEMBER_COUNT++;
  });
  socket.on("join", (data) => {
    const memberlist = getMemberList();
    io.to(socket.id).emit("join-result", {
      status: true,
      list: memberlist
    });
    io.of(data.name).sockets.size += 1;
    // メンバー一覧に追加
    MEMBER[socket.id].name = data.name;
    MEMBER[socket.id].id = data.id;
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
  });
  socket.on('submit Location', (location) => {
    io.to(location.room).emit('submit Location', location);
  });
  socket.on('gameStart', (msg) => {
    let name = msg.room;
    const count = io.of("/").to(msg.room).adapter.rooms;
    // count.forEach(function (element) {
    //   console.log(element);
    // });
    // console.log(count);
    // let roomnum = 0;
    // for (let props of count) {
    //   console.log(props);
    //   console.log();
    // }
    // console.log(roomnum);
    if (msg.player_id == 2) {
      console.log(count.get(name).size);
    }

    io.to(msg.room).emit('gameStart', msg);
  });
  socket.on('Start', (msg) => {
    io.to(msg.room).emit('Start');
  });
  socket.on('gameClea', (msg) => {
    io.to(msg.room).emit('gameClea', msg);
    deleteroom(msg.room);
    io.socketsLeave(msg.room);
    delete MEMBER[msg.room];
  });
  socket.on('numCheck', (msg) => {
    let name = msg.room;
    const count = io.of("/").to(msg.room).adapter.rooms;
    let num = count.get(name).size;
    io.to(msg.room).emit('numCheck', {
      room: msg.room,
      player_id: msg.player_id,
      num: count.get(name).size
    });
  });
  socket.on('disconnect', function () {
    if (room != "") {
      io.to(MEMBER[socket.id].name).emit('breakRoom', {
        name: MEMBER[socket.id].name
      });
    }
    deleteroom(MEMBER[socket.id].name);
    socket.broadcast.emit("member-quit", {
      token: MEMBER[socket.id].count,
      name: MEMBER[socket.id].name
    });
    io.socketsLeave(MEMBER[socket.id].name);
    delete MEMBER[socket.id];
  });
});


function judroom(id) {
  fs.readFile("room.json", {
    encoding: "utf-8",
    flag: 'r+',
  }, (err, data) => {
    if (err) throw err;
    roomFile = JSON.parse(data);
    for (let i = 0; i < roomFile.length; i++) {
      if (roomFile[i].roomid == id) {
        if (roomFile[i].player1 && roomFile[i].player2) {
          return true;
        } else {
          return false;
        }
      }
    }
  })
}

function deleteroom(id) {
  fs.readFile("room.json", {
    encoding: "utf-8",
    flag: 'r+',
  }, (err, data) => {
    if (err) throw err;
    roomFile = JSON.parse(data);
    for (let i = 0; i < roomFile.length; i++) {
      if (roomFile[i].roomid == id) {
        roomFile.splice(i, 1);
      }
    }
    roomFile = JSON.stringify(roomFile);
    fs.writeFile("room.json", roomFile, (err) => {
      if (err) throw err;
    });
  })
}



// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));

//publicディレクトリ以下は自動で返す
app.use(express.static(path.join(__dirname, 'public')))
//トップへのアクセスを/publicへ流す
// app.get('/', (req, res) => {
//   res.redirect(302, '/public')
// })




app.post("/reqSession", function (req, res) {
  // req.session.destroy()
  try {
    let Udata = {
      maile: req.body.rmaile,
      pName: req.body.pName,
      lName: req.body.lName,
      gender: req.body.gender,
      password: req.body.password,
      date: req.body.date
    }
    req.session.Udata = Udata;
    // req.session.pName = req.body.pName;
    // req.session.lName = req.body.lName;
    let ob = {
      status: true
    };
    res.json(ob);
    req.session.save();
    return;
  } catch (err) {
    console.log(err);
    let ob = {
      status: false
    };
    res.json(ob);
    return;
  }
});

app.post("/getUdata", function (req, res) {
  try {
    let Udata = req.session.Udata;
    res.json(Udata);
    return Udata;
  } catch (err) {
    console.log(err)
    let Udata = {
      status: false
    };
    return;
  }
})

app.post("/authSession", function (req, res) {
  try {
    req.session.Log = req.body.maile;
    req.session.save();
    let ob = {
      status: true
    };
    res.json(ob);
    return;
  } catch (err) {
    console.log(err)
    let ob = {
      status: false
    };
    res.json(ob);
    return;
  }
})

app.post("/LogSession", function (req, res) {
  try {
    req.session.Log = req.body.mail_address;
    req.session.save();
    let ob = {
      status: true
    };
    res.json(ob);
    return;
  } catch (err) {
    console.log(err)
    let ob = {
      status: false
    };
    res.json(ob);
    return;
  }
})

app.post("/AuthLog", function (req, res) {
  try {
    if (typeof req.session.Log != 'undefined') {
      let ob = {
        status: req.session.Log
      };
      res.json(ob);
      return;
    } else {
      let ob = {
        status: false
      };
      res.json(ob);
      return;
    }
  } catch (err) {
    console.log(err)
    let ob = {
      status: false
    };
    res.json(ob);
    return;
  }
})

app.post("/Logout", function (req, res) {
  try {
    delete req.session.Log;
    let ob = {
      status: true
    };
    res.json(ob);
    return;
  } catch (err) {
    console.log(err)
    let ob = {
      status: false
    };
    res.json(ob);
    return;
  }
})

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
