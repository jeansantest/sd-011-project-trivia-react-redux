import { fetchQuestions } from '../services/API';

export const GRAVATAR_IMAGE = 'GRAVATAR_IMAGE';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';
export const HANDLE_ANSWERS_BUTTONS = 'HANDLE_ANSWERS_BUTTONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const QUESTION_DIFFICULTY = 'QUESTION_DIFFICULTY';

export const gravatarImage = (payload) => ({
  type: GRAVATAR_IMAGE,
  payload,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const requestQuestionsSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

export const requestQuestionsError = (payload) => ({
  type: REQUEST_QUESTIONS_ERROR,
  payload,
});

export const fetchQuestionsAPI = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const response = await fetchQuestions(token);
    dispatch(requestQuestionsSuccess(response));
  } catch (error) {
    dispatch(requestQuestionsError(error));
  }
};

export const handleAnswersButtons = (payload) => ({
  type: HANDLE_ANSWERS_BUTTONS,
  payload,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const questionDifficulty = (payload) => ({
  type: QUESTION_DIFFICULTY,
  payload,
});
