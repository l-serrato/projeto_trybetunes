import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Loading from './Loading';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    inputArtistLenght: '',
    // isLoading: false,
    albumsArtist: [],
    message: false,
    name: '',
  };

  valueInputArtist = (event) => {
    const { value } = event.target;
    this.setState({ inputArtistLenght: value }, this.buttonArtistState);
  };

  buttonArtistState = () => {
    const { inputArtistLenght } = this.state;
    const caracteresInput = 2;
    if (inputArtistLenght.length >= caracteresInput) {
      return this.setState(() => ({ isButtonDisabled: false }));
    }
    return this.setState(() => ({ isButtonDisabled: true }));
  };

  searchAlbuns = async () => {
    const { inputArtistLenght } = this.state;
    const albums = await searchAlbumsAPI(inputArtistLenght);
    const nome = inputArtistLenght;
    this.setState({
      inputArtistLenght: '',
      albumsArtist: albums,
      message: true,
      name: nome,
    });
  };

  render() {
    const {
      inputArtistLenght,
      isButtonDisabled,
      albumsArtist,
      message,
      name,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div id="search-input-button">
          <input
            id="search-input"
            data-testid="search-artist-input"
            placeholder="O que você quer ouvir?"
            onChange={ this.valueInputArtist }
            value={ inputArtistLenght }
            autoComplete="off"
          />
          <button
            id="search-button"
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.searchAlbuns }
          >
            Pesquisar
          </button>
        </div>
        <div id="message-search">
          { message && albumsArtist
            .length !== 0
            ? (
              <p id="results-albuns">
                {`Resultado de álbuns de: ${name}`}
              </p>
            )
            : ''}
        </div>
        <div id="all-albuns">
          { albumsArtist.length === 0 && message
            ? (
              <p id="no-found-album">Nenhum álbum foi encontrado</p>
            )
            : (albumsArtist
              .map(({ collectionName, collectionId, artworkUrl100, artistName }) => (
                <div key={ collectionId } className="album-search">
                  <img
                    src={ artworkUrl100 }
                    alt={ collectionName }
                    className="album-img"
                  />
                  <div className="album-description">
                    <p
                      key={ collectionId }
                      className="collection-name"
                    >
                      { collectionName }
                    </p>
                    <p className="artist-name">{ artistName }</p>
                  </div>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                    className="go-to-album-button"
                  >
                    Ir para o album
                  </Link>
                </div>
              )))}
        </div>
      </div>
    );
  }
}

export default Search;
