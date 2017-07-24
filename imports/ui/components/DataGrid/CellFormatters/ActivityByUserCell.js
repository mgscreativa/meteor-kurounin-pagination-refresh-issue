import React from 'react';
import PropTypes from 'prop-types';

const onClickHandler = (history, match, value) => (
  history.push(`${match.url}/user/${value}`)
);

const ActivityByUserCell = (props) => {
  const {
    value,
    history,
    match,
  } = props;

  return (
    <div>
      <span
        className="link-details-cell"
        style={{ cursor: 'pointer' }}
        onClick={() => onClickHandler(history, match, value)}
      >
        {value}
      </span>
    </div>
  );
};

ActivityByUserCell.defaultProps = {
  value: null,
  cellType: null,
  dependentValues: null,
};

ActivityByUserCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  cellType: PropTypes.string,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dependentValues: PropTypes.object,
};

export default ActivityByUserCell;
