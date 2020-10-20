const express = require('express');
const app = express();

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// POSTデータを取得する時に必要
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use(express.static('public'));

// routeの設定
app.use('/', require('./routes/index.js'));
app.listen(8888);