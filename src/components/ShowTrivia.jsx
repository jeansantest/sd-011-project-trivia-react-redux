import React from 'react';
import PropTypes from 'prop-types';
import showQuestions from './showQuestions';

export default function ShowTrivia({ index,
  questions,
  arrayQuestions,
  showResults,
  answer,
  nextQuestion,
  setAnswer,
  setIndex,
  setPlayer,
  player }) {

  const addScore = () => {
    const { correct_answer, difficulty } = questions[index];
    const difficultyLevels = {
      easy: 1,
      medium: 2,
      hard: 3,
    }
    if (answer === correct_answer) {
      const level = difficultyLevels[difficulty];
      const { assertions, score } = player.player;
      const ass = assertions + 1;
      const scr = (score + (10 + (1 * level)))
      setPlayer({ ...player, player: { ...player.player, assertions: ass, score: scr } })
    }
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <span className="label label-warning gameIndex" data-testid="question-text">
              {index + 1}
            </span>
            {questions[index].question}
          </h3>
          <p data-testid="question-category">{questions[index].category}</p>
        </div>
        {arrayQuestions && showQuestions(arrayQuestions, showResults, index)}

        {answer && (
          <button
            type="button"
            onClick={() => {
              nextQuestion(setAnswer, index, questions, setIndex);
              addScore();
            }}
            className="btn btn btn-info btn-lg nextQuestion"
            data-testid="btn-next"
          >
            Próxima pergunta
          </button>
        )}

        <div className="modal-footer text-muted">
          <span id="answer" />
        </div>
      </div>
    </div>
  );
}
ShowTrivia.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.objectOf(PropTypes.object).isRequired,
  arrayQuestions: PropTypes.shape({}).isRequired,
  answer: PropTypes.objectOf(PropTypes.object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  showResults: PropTypes.func.isRequired,
  setAnswer: PropTypes.func.isRequired,

};