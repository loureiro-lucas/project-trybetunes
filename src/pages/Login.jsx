import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isButtonDisable: true,
      loading: false,
    };
  }

  buttonValidation = () => {
    const { username } = this.state;
    const minNameLength = 3;
    if (username.length < minNameLength) {
      this.setState({
        isButtonDisable: true,
      });
    } else {
      this.setState({
        isButtonDisable: false,
      });
    }
  }

  changesHandler = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.buttonValidation());
  }

  buttonClickHandler = () => {
    this.setState({
      loading: true,
    }, () => {
      const { username } = this.state;
      createUser({ name: username })
        .then(() => {
          const { history } = this.props;
          history.push('/search');
        });
    });
  }

  render() {
    const { isButtonDisable, username, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div
        data-testid="page-login"
        id="login-page-container"
      >

        <img
          id="login-icon"
          src="https://img.icons8.com/cotton/64/000000/earbud-headphones.png"
          alt="earbuds"
        />

        <div id="login-page-inside-container">
          <label
            htmlFor="username"
            id="username-input-label"
          >
            <input
              type="text"
              id="username"
              data-testid="login-name-input"
              onChange={ this.changesHandler }
              value={ username }
              placeholder="username"
            />
          </label>

          <button
            type="submit"
            id="login-button"
            data-testid="login-submit-button"
            disabled={ isButtonDisable }
            onClick={ this.buttonClickHandler }
          >
            ENTRAR
          </button>

        </div>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Login;
