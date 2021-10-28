import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Albuns.css';

class Albuns extends React.Component {
  returnSubtitle = () => {
    const { artist } = this.props;
    return `Resultado de álbuns de: ${artist}`;
  }

  render() {
    const { albuns } = this.props;

    return (
      <div id="albuns-list">
        <span id="albuns-list-subtitle">
          { this.returnSubtitle() }
        </span>

        <div id="albuns-container">

          {albuns.map((album) => (
            <div key={ album.collectionId } className="album-container">

              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                className="album-link"
              >

                <div id="album-card">

                  <img id="album-cover" src={ album.artworkUrl100 } alt="album cover" />

                  <div id="album-info">

                    <p id="album-name">{ album.collectionName }</p>

                    <p id="artist-name">{ album.artistName }</p>

                    <p id="track-count">
                      { album.trackCount }
                      faixas
                    </p>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Albuns.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};

export default Albuns;
