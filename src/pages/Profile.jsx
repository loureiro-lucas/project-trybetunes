import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    this.setState({
      loading: true,
    }, () => {
      getUser()
        .then((response) => this.setState({
          userData: response,
          loading: false,
        }));
    });
  }

  render() {
    const { userData, loading } = this.state;

    return (
      <div id="profile" data-testid="page-profile">
        <Header />
        <div id="user-profile">
          <img
            src={ userData.image }
            alt="usuário"
            data-testid="profile-image"
            id="profile-image"
          />
          <p id="profile-name">{ userData.name }</p>
          <p id="profile-email">
            { userData.email }
          </p>
          <p id="profile-description">
            { userData.description }
          </p>
          <Link id="edit-profile-link" to="/profile/edit">
            <div id="edit-profile-container"><p>Editar perfil</p></div>
          </Link>
        </div>
        {loading && <Loading />}
      </div>
    );
  }
}

export default Profile;
