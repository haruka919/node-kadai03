const fetch = require('node-fetch')
module.exports = {
  // クイズデータを取得
  fetchQuizData (req, res) {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then(response => response.json())
      .then(result => {
        res.json({
          result: result.results
        });
      })
  }
}