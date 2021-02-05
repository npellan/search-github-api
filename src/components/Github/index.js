// == Import npm
import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import logo from 'src/assets/images/logo-github.png';
import axios from 'axios';

// == Import
import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import SearchResult from 'src/components/SearchResult';
import MoreResultBtn from 'src/components/MoreResultBtn';
import './styles.scss';

// == Composant
const Github = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [negativeMessage, setNegativeMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  /**
   * Fonction qui clear tous les states dépendant d'une recherche lors d'une nouvelle recherche
   * @param {string} searchInputValue
   */
  const newSearch = (searchInputValue) => {
    setSearch(searchInputValue);
    setMessage(null);
    setRepos([]);
    setPage(1);
  };

  /**
   * Fonction qui lance une nouvelle recherche via l'API
   */
  const refreshRepositories = () => {
    setNegativeMessage(false);
    setLoading(true);
    setMessage('Recherche en cours, veuillez patienter ...');
    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=${page}&per_page=9`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Une erreur est survenue durant la recherche des repositories');
        }
        return response.data;
      })
      .then((data) => {
        setRepos([...repos, ...data.items]);
        setMessage(`La recherche a donné ${data.total_count} résultats`);
      })
      .catch((error) => {
        setMessage(error.message);
        setNegativeMessage(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * On refresh les repositories uniquement si search ou page changent d'état
   */
  useEffect(() => {
    // Le useEffect se lance une première fois au montage du composant
    // Pour éviter de faire une recherche à vide, on teste
    if (search !== '') {
      refreshRepositories();
    }
  }, [search, page]);

  return (
    <Container textAlign="left" className="github">
      <header className="top">
        <img className="top__img" src={logo} alt="Logo Github" />
      </header>
      <SearchBar loading={loading} onSearchSubmit={newSearch} />
      <Message
        negative={negativeMessage}
        message={message}
      />
      <SearchResult repositories={repos} />
      <MoreResultBtn
        visible={!!repos.length}
        loading={loading}
        onMorePage={() => {
          setPage(page + 1);
        }}
      />
    </Container>
  );
};

// == Export
export default Github;
