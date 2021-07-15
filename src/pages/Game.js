import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);

    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
    };
  }

  componentDidMount() {
    const tokenStr = localStorage.getItem('token');
    const tokenObj = JSON.parse(tokenStr);

    this.fetchQuestions(tokenObj.token);
  }

  async fetchQuestions(token) {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();

    console.log(questions.results);

    this.setState({
      questions: questions.results,
      loading: false,
    });

    // const { loading } = this.state;

    // if (!loading) {
    //   this.setState({
    //     loading: false,
    //   });
    // } else {
    //   this.setState({
    //     loading: true,
    //   });
    // }
  }

  renderQuestions() {
    const { questions, questionNum } = this.state;

    return (
      <>
        <h1 data-testid="question-text">
          { questions[questionNum].question }
        </h1>
        <h2 data-testid="question-category">
          { questions[questionNum].category }
        </h2>
        {this.renderAnswers(questions[questionNum])}
      </>
    );
  }

  renderAnswers(question) {
    console.log(question.incorrect_answers);
    if (question.type === 'multiple') {
      const incorrectAnswers = question.incorrect_answers.map((answer, index) => (
        <button
          data-testid={ `wrong-answer-${index}` }
          type="button"
          key={ index }
        >
          { answer }
        </button>
      ));
      return (
        <>
          {incorrectAnswers}
          <button
            data-testid="correct-answer"
            type="button"
          >
            { question.correct_answer }
          </button>
        </>
      );
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Header />
        {
          loading ? <div>Carregando</div> : this.renderQuestions()
        }
        <div>
          <h2>Categoria da pergunta</h2>
          <div>
            Alternativas
          </div>
        </div>
      </div>
    );
  }
}

export default Game;