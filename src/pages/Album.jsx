import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import './Album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMusics()
      .then((musics) => {
        this.setState({
          musics,
          loading: false,
        });
      });
  }

  fetchMusics = () => {
    const { match } = this.props;
    const { id } = match.params;
    return getMusics(id);
  }

  render() {
    const { musics, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div id="page-album" data-testid="page-album">

        <Header />

        <div id="album-header">

          <img id="album-image" src={ musics[0].artworkUrl100 } alt="" />

          <div id="album-artist-and-name">
            <h4 data-testid="artist-name">{musics[0].artistName}</h4>

            <h3 data-testid="album-name">{musics[0].collectionName}</h3>
          </div>
        </div>

        <div id="music-list">
          {musics.slice(1).map((music) => (

            <MusicCard
              key={ music.trackId }
              clasName="music"
              music={ music }
              isFavorite={ this.favoriteHandler }
            />))}

        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Album;
