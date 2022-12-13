import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, player, trackId, checked, onClick } = this.props;
    return (
      <div className="name-and-audio">
        <p className="music-name">{ musicName }</p>
        <audio
          data-testid="audio-component"
          className="audio-component"
          src={ player }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
        <br />
        <label htmlFor={ musicName }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ musicName }
            trackId={ trackId }
            onClick={ onClick }
            checked={ checked }
            className="favorite"
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MusicCard;
