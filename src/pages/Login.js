import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormLogin from '../components/FormLogin';
import getToken from '../services/api';
import { fetchToken, submitForm } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      loading: false,
    };
    this.validation = this.validation.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  validation() {
    const { nome, email } = this.state;
    if (!nome || !email) {
      return true;
    }
    return false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  async handleButton() {
    this.setState({
      loading: true,
    });
    const { history } = this.props;
    const { nome, email } = this.state;
    try {
      const { token } = await getToken();
      fetchToken(token);
      submitForm({ nome, email });
      localStorage.setItem('token', JSON.stringify(token));
      this.setState({ loading: false });
      history.push('/game');
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <section>
        <FormLogin
          validation={ this.validation }
          nome={ this.nome }
          email={ this.email }
          handleButton={ this.handleButton }
          handleInput={ this.handleInput }
          handleSettings={ this.handleSettings }
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(fetchToken(token)),
  submitForm: (inputs) => dispatch(submitForm(inputs)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
}.isRequired;
