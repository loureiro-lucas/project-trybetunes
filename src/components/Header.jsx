import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      loading: false,
    };
  }

  returnUser = () => (
    this.setState({
      loading: true,
    }, () => {
      getUser()
        .then((response) => {
          this.setState({
            username: response.name,
            loading: false,
          });
        });
    })
  );

  componentDidMount = () => {
    this.returnUser();
  }

  render() {
    const { loading, username } = this.state;
    return (
      <header
        data-testid="header-component"
        id="header"
      >

        <div id="name-and-logo-container">

          <img
            id="login-icon"
            src="https://img.icons8.com/cotton/64/000000/earbud-headphones.png"
            alt="earbuds"
          />

          <div id="user-name-container">
            { loading
              ? <Loading />
              : (
                <p data-testid="header-user-name" id="user-name">
                  { username }
                </p>
              )}
          </div>

        </div>

        <nav id="navigation-container">
          <ul id="navigation">

            <li>
              <Link to="/search" data-testid="link-to-search">PESQUISA</Link>
            </li>

            <li>
              <Link to="/favorites" data-testid="link-to-favorites">FAVORITAS</Link>
            </li>

            <li>
              <Link to="/profile" data-testid="link-to-profile">PERFIL</Link>
            </li>

          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
