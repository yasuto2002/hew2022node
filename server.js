//Expressのモジュールを取り込んで生成
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors');
const axios = require('axios');
const axiosJsonpAdapter = require("axios-jsonp");






//サーバーを起動
app.listen(3000, () => {
  console.log('sucsess!!')
})

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
