import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CorrectAnswer extends Component {
  render() {
    const { text, answerClick, styleAlternative } = this.props;
    const styles = {
      border: '3px solid rgb(6, 240, 15)',
    };
    return (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ () => answerClick() }
        style={ styleAlternative ? styles : null }
      >
        {text}
      </button>
    );
  }
}

export default CorrectAnswer;

CorrectAnswer.propTypes = {
  text: PropTypes.string.isRequired,
  answerClick: PropTypes.func.isRequired,
  styleAlternative: PropTypes.bool.isRequired,
};
