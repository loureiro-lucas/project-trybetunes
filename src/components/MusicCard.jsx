import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    const { music } = this.props;
    getFavoriteSongs()
      .then((favorites) => {
        const isFavorite = favorites.some((song) => song.trackId === music.trackId);
        if (isFavorite) {
          this.setState((current) => ({
            loading: false,
            isFavorite: !current.isFavorite,
          }));
        }
      });
  }

  addOrRemoveSong = (func, music, fetchFavorites) => {
    func(music)
      .then(() => {
        this.setState((current) => ({
          loading: false,
          isFavorite: !current.isFavorite,
        }));
        if (fetchFavorites) {
          fetchFavorites();
        }
      });
  }

  favoriteHandler = () => {
    const { music, fetchFavorites } = this.props;
    this.setState({
      loading: true,
    }, () => {
      const { isFavorite } = this.state;
      if (!isFavorite) {
        this.addOrRemoveSong(addSong, music, fetchFavorites);
      } else {
        this.addOrRemoveSong(removeSong, music, fetchFavorites);
      }
    });
  }

  render() {
    const { loading, isFavorite } = this.state;
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;

    if (loading) {
      return <Loading />;
    }

    return (
      <div id="music-card">
        <span id="music-name">{ trackName }</span>

        <audio id="player" data-testid="audio-component" src={ previewUrl } controls>

          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>

        </audio>

        <label
          htmlFor={ `checkbox-music-${trackId}` }
          className="favorite-input-container"
        >

          <span className="favorite-input-label">Favorita</span>

          <input
            type="checkbox"
            checked={ isFavorite }
            className="favorite"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoriteHandler }
          />

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number])).isRequired,
  fetchFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
