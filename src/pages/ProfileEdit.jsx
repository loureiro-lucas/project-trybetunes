import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isButtonDisabled: true,
      userName: '',
      userEmail: '',
      userDescription: '',
      userImage: '',
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
        .then((response) => {
          this.setState({
            userName: response.name,
            userEmail: response.email,
            userDescription: response.description,
            userImage: response.image,
            loading: false,
          }, this.validateButton);
        });
    });
  }

  validateButton = () => {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
    } = this.state;

    if (
      userName.length > 0
      && userEmail.length > 0
      && userDescription.length > 0
      && userImage.length > 0
    ) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  }

  changesHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validateButton);
  }

  buttonClickHandler = () => {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
    } = this.state;

    updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
      isButtonDisabled,
      loading,
    } = this.state;

    return (
      <div id="page-profile-edit" data-testid="page-profile-edit">
        <Header />
        <form id="profile-edit-form">

          <label htmlFor="edit-input-name">
            <span className="profile-edit-span">Nome: </span>
            <input
              type="text"
              name="userName"
              id="edit-input-name"
              className="profile-edit-input"
              data-testid="edit-input-name"
              value={ userName }
              onChange={ this.changesHandler }
            />
          </label>

          <label htmlFor="edit-input-email">
            <span className="profile-edit-span">Email: </span>
            <input
              type="text"
              name="userEmail"
              id="edit-input-email"
              className="profile-edit-input"
              data-testid="edit-input-email"
              value={ userEmail }
              onChange={ this.changesHandler }
            />
          </label>

          <label htmlFor="edit-input-description">
            <span className="profile-edit-span">Descrição: </span>
            <input
              type="text"
              name="userDescription"
              id="edit-input-description"
              className="profile-edit-input"
              data-testid="edit-input-description"
              value={ userDescription }
              onChange={ this.changesHandler }
            />
          </label>

          <label htmlFor="edit-input-image">
            <span className="profile-edit-span">URL imagem de perfil: </span>
            <input
              type="text"
              name="userImage"
              id="edit-input-image"
              className="profile-edit-input"
              data-testid="edit-input-image"
              value={ userImage }
              onChange={ this.changesHandler }
            />
          </label>

          <button
            type="button"
            data-testid="edit-button-save"
            id="edit-button-save"
            onClick={ this.buttonClickHandler }
            disabled={ isButtonDisabled }
          >
            SALVAR
          </button>

        </form>
        {loading && <Loading />}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ProfileEdit;
