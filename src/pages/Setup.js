import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setup from '../images/gear.png';
import back from '../images/back_4.png';
import '../App.css';
import CategoryOptions from '../components/CategoryOptions';
import { sendConfigOptionsAction } from '../redux/actions';
// import '../css/btnSetupScreen.css';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryConfig: '',
      answearConfig: '',
      dificultyConfig: '',
    };
    this.dificultyRender = this.dificultyRender.bind(this);
    this.confirmBtnRender = this.confirmBtnRender.bind(this);
    this.confirmBtnClickHandler = this.confirmBtnClickHandler.bind(this);
    this.answearTypeRender = this.answearTypeRender.bind(this);
    this.categoryTypeRender = this.categoryTypeRender.bind(this);
    this.selectChangeHandler = this.selectChangeHandler.bind(this);
  }

  categoryTypeRender() {
    return (
      CategoryOptions
        .map((item, index) => (
          <option key={ index } value={ item.value }>{item.category}</option>
        ))
    );
  }

  answearTypeRender() {
    const { answearConfig } = this.state;
    return (
      <select
        id="answearConfig"
        value={ answearConfig }
        onChange={ this.selectChangeHandler }
      >
        <option value="">Aleatória</option>
        <option value="multiple">Multipla escolha</option>
        <option value="boolean">Verdadeiro/Falso</option>
      </select>
    );
  }

  dificultyRender() {
    const { dificultyConfig } = this.state;
    return (
      <select
        id="dificultyConfig"
        value={ dificultyConfig }
        onChange={ this.selectChangeHandler }
      >
        <option value="">Aleatória</option>
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Hard</option>
      </select>
    );
  }

  confirmBtnClickHandler() {
    const {
      categoryConfig: category,
      answearConfig: answear,
      dificultyConfig: dificulty } = this.state;
    const { sendConfigToStore } = this.props;
    sendConfigToStore(category, answear, dificulty);
    alert('Configurações aplicadas com sucesso!');
  }

  selectChangeHandler(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  confirmBtnRender() {
    return (
      <Link to="/" style={ { textDecoration: 'none' } }>
        <div className="setup-back-home">
          <img src={ back } alt="Voltar" className="back-img-home" />
          <button
            type="button"
            className="btn-neon-blue back-home"
            onClick={ this.confirmBtnClickHandler }
          >
            Aplicar Configurações
          </button>
        </div>
      </Link>
    );
  }

  render() {
    const { categoryConfig } = this.state;
    return (
      <>
        <div className="header-setup">
          <img src={ setup } alt="Ranking" className="setup-img-gear" />
          <h2 data-testid="settings-title" className="title-setup">Configurações</h2>
        </div>
        <div className="options-container">
          <div className="options">
            <label htmlFor="dificultyConfig">
              Dificuldade:
              {this.dificultyRender()}
            </label>
            <label htmlFor="answearConfig">
              Tipo de resposta:
              {this.answearTypeRender()}
            </label>
            <label htmlFor="categoryConfig">
              Categoria:
              <select
                id="categoryConfig"
                value={ categoryConfig }
                onChange={ this.selectChangeHandler }
              >
                {this.categoryTypeRender()}
              </select>
            </label>
          </div>
        </div>
        <br />
        <br />
        {this.confirmBtnRender()}
        <br />
        <Link to="/" style={ { textDecoration: 'none' } }>
          <div className="setup-back-home">
            <img src={ back } alt="Voltar" className="back-img-home" />
            <button
              type="button"
              data-testid="btn-go-home"
              className="btn-neon-blue back-home"
            >
              Voltar ao login
            </button>
          </div>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendConfigToStore: (category, answear, dificulty) => (
    dispatch(sendConfigOptionsAction(category, answear, dificulty))),
});

export default connect(null, mapDispatchToProps)(Setup);

Setup.propTypes = {
  sendConfigToStore: PropTypes.func,
};

Setup.defaultProps = {
  sendConfigToStore: PropTypes.func,
};