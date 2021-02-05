/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './styles.scss';

const MoreResultBtn = ({ loading, onMorePage, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <Button
      color="blue"
      className="more-button"
      loading={loading}
      fluid
      onClick={onMorePage}
    >Afficher plus
    </Button>
  );
};

MoreResultBtn.propTypes = {
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  onMorePage: PropTypes.func,
};

MoreResultBtn.defaultProps = {
  visible: false,
  loading: false,
  onMorePage: () => { },
};

export default MoreResultBtn;
