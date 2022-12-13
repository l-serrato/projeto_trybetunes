import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    returnApi: null,
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      returnApi: favorite,
    });
  };

  removeSongFavorite = async ({ target }) => {
    const { returnApi } = this.state;
    const track = Number(target.attributes.trackId.value);
    const trackRemoved = returnApi.find((element) => element.trackId === track);
    const tracksNotRemoved = returnApi.filter((element) => element.trackId !== track);
    this.setState({
      isLoading: true,
    });
    await removeSong(trackRemoved);
    this.setState({
      returnApi: tracksNotRemoved,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, returnApi } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading />
          : returnApi.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicName={ music.trackName }
              player={ music.previewUrl }
              trackId={ music.trackId }
              onClick={ this.removeSongFavorite }
              checked
            />
          ))}
      </div>
    );
  }
}

export default Favorites;
