import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Albuns from '../components/Albuns';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      isButtonDisabled: true,
      loading: false,
      albuns: [],
      noAlbum: false,
      lastArtist: '',
    };
  }

  changesHandler = ({ target }) => {
    this.setState({
      searchInput: target.value,
    }, () => {
      this.validateButton();
    });
  }

  validateButton = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= 2) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  searchIt = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    }, () => {
      const { searchInput } = this.state;
      searchAlbumsAPI(searchInput)
        .then((albuns) => {
          this.setState((current) => ({
            lastArtist: current.searchInput,
            searchInput: '',
            loading: false,
            albuns,
          }), this.checkAlbuns(albuns));
        });
    });
  }

  checkAlbuns = (albuns) => {
    if (albuns.length === 0) {
      this.setState({
        noAlbum: true,
      });
    } else {
      this.setState({
        noAlbum: false,
      });
    }
  }

  render() {
    const {
      isButtonDisabled,
      searchInput,
      loading,
      albuns,
      noAlbum,
      lastArtist,
    } = this.state;

    return (
      <div data-testid="page-search">

        <Header />

        <form id="search-container">
          <label id="search-input-container" htmlFor="search-input">

            <input
              type="text"
              data-testid="search-artist-input"
              id="search-input"
              placeholder="nome do artista"
              value={ searchInput }
              onChange={ this.changesHandler }
            />
          </label>

          <button
            type="submit"
            data-testid="search-artist-button"
            id="search-button"
            disabled={ isButtonDisabled }
            onClick={ this.searchIt }
          >
            PESQUISAR
          </button>

        </form>

        {loading && <Loading />}

        {albuns.length !== 0 && <Albuns albuns={ albuns } artist={ lastArtist } />}

        {noAlbum && <span id="no-album">Nenhum álbum foi encontrado</span>}

      </div>
    );
  }
}

export default Search;
