const title = document.getElementById('title');
const question = document.getElementById('question');
const info = document.getElementById('info');
const answerList = document.getElementById('answer-list');

// ページの読み込みが完了したら、クイズデータを取得
window.addEventListener('load', () => {
  const quiz = new Quiz();
  quiz.init();
})

class Quiz {
  constructor() {
    // クイズに関する情報を格納
    this.quizInfo = {
      quizzes: [],
      currentQuizIndex: 0,
      correctCount: 0
    }
  }
  
  async init() {
    // クイズデータを取得する
    const quizData = await axios.get('/api/quizes')

    this.quizInfo.quizzes = quizData.data.result
    this.quizInfo.currentQuizIndex = 0;
    this.quizInfo.correctCount = 0;
    // 取得したクイズデータをセット
    this.setQuiz();
  }

  // クイズをセット
  setQuiz() {
    // 前回の回答リストをリセット
    answerList.innerHTML = '';

    // クイズ画面 or 最終問題であれば終了画面を表示
    if (this.quizInfo.currentQuizIndex < this.quizInfo.quizzes.length) {
      let currentQuiz = this.quizInfo.quizzes[this.quizInfo.currentQuizIndex];
      this.makeQuiz(this.quizInfo.currentQuizIndex, currentQuiz);
    } else {
      this.finishQuiz();
    }
  }

  // クイズを作成
  makeQuiz(index, quiz) {
    title.textContent = `問題${index + 1}`;
    info.hidden = false;
    document.getElementById('category').textContent = `[ジャンル]${quiz.category}`;
    document.getElementById('difficulty').textContent = `[難易度]${quiz.difficulty}`;
    question.innerHTML = quiz.question;

    // ランダムに並べた回答リスト（配列）を取得
    const answers = this.makeAnswers(quiz);

    answers.forEach((answer) => {
      // 回答ボタンを作成
      let answerButton = document.createElement('button');
      answerList.appendChild(answerButton);
      answerButton.innerHTML = answer;

      answerButton.addEventListener('click', (e) => {
        // 正解であれば、正答数カウントを1増やす
        if (e.target.textContent === quiz.correct_answer) {
          this.quizInfo.correctCount++;
        }
        // インデックスカウントを増やし、次のクイズをセット
        this.quizInfo.currentQuizIndex++;
        this.setQuiz();
      });
    });
  }


  // ランダムに並べた回答リストを作成
  makeAnswers(quiz) {
    const answers = [quiz.correct_answer, ...quiz.incorrect_answers];
    return this.shuffle(answers);
  }

  // 配列をシャッフルする
  shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  // 終了画面
  finishQuiz() {
    info.hidden = true;
    title.textContent = `あなたの正答数は${this.quizInfo.correctCount}問です。`;
    question.textContent = '再度チャレンジしたい場合は以下をクリック！！';

    // ホームへ戻るボタンを作成
    let backHomeButton = document.createElement('button');
    document.querySelector('.container').appendChild(backHomeButton);
    backHomeButton.textContent = 'ホームに戻る';

    // ホームへ戻るボタンをクリックしたら、ホームボタンを削除・初期化処理を行う
    backHomeButton.addEventListener('click', (e) => {
      backHomeButton.remove();
      window.location.href = '/';
    })
  }
}
