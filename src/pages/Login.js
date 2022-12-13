import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    loginName: '',
    loginBtn: false,
    loading: false,
  };

  handleChangeLoginInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validLoginInput());
  };

  validLoginInput = () => {
    const { loginName } = this.state;
    const minLength = 3;

    if (loginName.length >= minLength) {
      this.setState({
        loginBtn: true,
      });
    } else {
      this.setState({
        loginBtn: false,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { loginName } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: loginName });
      history.push('/search');
    });
  };

  render() {
    const {
      loginName,
      loginBtn,
      loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <h2>
          Login
        </h2>
        <label htmlFor="name-input">
          Usuário
          <input
            type="text"
            name="loginName"
            data-testid="login-name-input"
            value={ loginName }
            onChange={ this.handleChangeLoginInput }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ !loginBtn }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
