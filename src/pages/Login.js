import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/* import { getTokenAction } from '../action'; */
import md5 from 'crypto-js/md5';
import { createUserName, createUserEmail, createUserHash } from '../actions';
import getToken from '../service/getToken';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  verifyLogin() {
    const { name, email } = this.state;
    const si = /\S+@\S+\.\S+/;
    const no = /\S/;
    if (si.test(email) && no.test(name)) {
      return false;
    }
    return true;
  }

  handleClick() {
    const { addUserName, addUserEmail, addUserHash } = this.props;
    const { name, email } = this.state;
    const hash = md5(email).toString();
    const tok = getToken();
    tok.then(({ token }) => localStorage.setItem('token', token));
    addUserName(name);
    addUserEmail(email);
    addUserHash(hash);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              name="name"
              value={ name }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              type="email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ this.verifyLogin() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </div>
        <div>
          <Link to="/settings" data-testid="btn-settings">Configurações</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserName: (name) => dispatch(createUserName(name)),
  addUserEmail: (email) => dispatch(createUserEmail(email)),
  addUserHash: (hash) => dispatch(createUserHash(hash)),
});

Login.propTypes = {
  addUserName: PropTypes.func,
  addUserEmail: PropTypes.func,
  addUserHash: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
