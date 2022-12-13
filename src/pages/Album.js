import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    musicas: [],
    artistName: '',
    albumName: '',
    image: '',
    isLoading: false,
    checked: [],
  };

  componentDidMount() {
    this.listOfMusics();
    this.getFavorites();
  }

  listOfMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    const excludesFirstElement = musics.filter((track) => track.trackId);
    const name = musics[0].artistName;
    const album = musics[0].collectionName;
    const imageAlbum = musics[0].artworkUrl100;
    this.setState({
      musicas: excludesFirstElement,
      artistName: name,
      albumName: album,
      image: imageAlbum,
    });
  };

  favoriteSong = async (event) => {
    const { musicas, checked } = this.state;
    const trackIdChecked = event.target.attributes.trackId.value;
    const stringToNumber = parseInt(trackIdChecked, 10);
    const objectTrackId = musicas.find((track) => track.trackId === stringToNumber);
    const musicIsAlreadyChecked = checked.some((music) => music === objectTrackId
      .trackId);
    const deleteMusic = checked.filter((music) => music !== objectTrackId.trackId);
    if (musicIsAlreadyChecked === false) {
      this.setState({
        isLoading: true,
      });
      await addSong(objectTrackId);
      this.setState((prevState) => ({
        isLoading: false,
        checked: [...prevState.checked, stringToNumber],
      }));
    } else {
      this.setState({
        isLoading: true,
      });
      await removeSong(objectTrackId);
      this.setState({
        isLoading: false,
        checked: deleteMusic,
      });
    }
  };

  getFavorites = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    const funcGetFavoritesSongs = await getFavoriteSongs();
    const excludesFirstElement = musics.filter((track) => track.trackId);
    const filterTrackIdLocalStorage = funcGetFavoritesSongs.map((item) => item.trackId);
    const filterTrackIdMusics = excludesFirstElement.map((item) => item.trackId);
    const checkedElements = filterTrackIdLocalStorage.filter((item) => filterTrackIdMusics
      .includes(item));
    this.setState({
      checked: checkedElements,
    });
  };

  render() {
    const { musicas, artistName, albumName, image, isLoading, checked } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <br />
        <div id="album-artist-collection">
          <img src={ image } alt={ albumName } />
          <div id="artist-collection">
            <p data-testid="artist-name" id="artist-name">{artistName}</p>
            <p data-testid="album-name" id="album-name">{ albumName }</p>
          </div>
        </div>
        <div id="sound-track">
          {isLoading ? <Loading /> : (
            musicas.map(({ trackName, previewUrl, trackId }) => (
              <MusicCard
                key={ trackId }
                musicName={ trackName }
                player={ previewUrl }
                trackId={ trackId }
                onClick={ this.favoriteSong }
                checked={ checked.includes(trackId) }
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
};

export default Album;
