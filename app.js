const express = require('express');
const app = express();

// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')
app.use(cors())

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
app.use('/api/quizes', require('./api/quizes.js'));

app.listen(8888);