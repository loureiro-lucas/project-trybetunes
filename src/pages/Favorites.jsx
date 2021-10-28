import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import './Favorites.css';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = () => {
    this.setState({
      loading: true,
    }, () => {
      getFavoriteSongs()
        .then((favorites) => {
          this.setState({
            loading: false,
            favoriteSongs: favorites,
          });
        });
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div id="page-favorites" data-testid="page-favorites">

        <Header />

        <p id="favorites-title">
          Favoritas
        </p>

        <div id="favorite-list">

          {favoriteSongs.map((music) => (
            <MusicCard
              key={ music.trackId }
              clasName="music"
              music={ music }
              fetchFavorites={ this.fetchFavorites }
            />))}

        </div>
      </div>
    );
  }
}

export default Favorites;
