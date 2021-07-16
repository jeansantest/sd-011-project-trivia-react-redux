import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderGame from '../components/HeaderGame';

class Feedback extends Component {
  constructor() {
    super();
    this.resultQuestions = this.resultQuestions.bind(this);
  }

  resultQuestions() {
    const lessThree = 'Podia ser melhor...';
    const moreThree = 'Mandou bem!';
    const numberHits = 3;
    const { questions } = this.props;
    if (questions >= numberHits) {
      return (
        <h1 data-testid="feedback-text">
          {moreThree}
        </h1>);
    }
    return (
      <h1 data-testid="feedback-text">
        {lessThree}
      </h1>);
  }

  render() {
    const { score, questions } = this.props;
    return (
      <div>
        <HeaderGame />
        <div>
          {this.resultQuestions()}
        </div>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ questions }</p>
        <Link data-testid="btn-play-again" to="/">Jogar novamente</Link>
        <Link data-testid="btn-ranking" to="/ranking">Ver Ranking</Link>
      </div>
    );
  }
}

// verificar caminho
const mapStateToProps = ({ gameReducer }) => ({
  questions: gameReducer.correctAnswers,
  score: gameReducer.score,
});

Feedback.propTypes = ({
  questions: PropTypes.string,
  store: PropTypes.number,
}).isRequired;

export default connect(mapStateToProps)(Feedback);