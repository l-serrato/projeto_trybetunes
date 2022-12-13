import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: true,
    userName: '',
  };

  componentDidMount() {
    this.exhibitName();
  }

  exhibitName = () => {
    getUser().then(({ name }) => {
      this.setState({
        userName: name,
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <>
        <div id="header">
          {isLoading ? (
            <Loading />
          ) : (
            <header data-testid="header-component" id="name-and-title">
              <div data-testid="header-user-name" id="dados-header">
                <span id="trybe-tunes">TrybeTunes</span>
                <span id="userName">{`Olá, ${userName}`}</span>
              </div>
            </header>
          )}
        </div>
        <div id="links">
          <Link to="/search" data-testid="link-to-search" className="link">
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="link">
            Profile
          </Link>
        </div>
      </>
    );
  }
}

export default Header;
