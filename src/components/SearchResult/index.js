/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Segment, Message } from 'semantic-ui-react';
import Repository from './Repository';

import './styles.scss';

const SearchResult = ({ repositories }) => {
  if (repositories.length === 0) {
    return (
      <Segment>
        <Message
          info
          header="Aucun repository à afficher"
          content="Données issues de l'API Github"
        />
      </Segment>
    );
  }

  return (
    <Card.Group
      itemsPerRow={3}
      stackable
      doubling
      className="search-result"
    >
      {repositories.map((repository) => (
        <Repository {...repository} key={repository.id.toString()} />
      ))}
    </Card.Group>
  );
};

SearchResult.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

SearchResult.defaultProps = {
  repositories: [],
};

export default SearchResult;
