import React from 'react';
import PropTypes from 'prop-types';

const onClickHandler = (history, match, dependentValues) => (
  history.push(`${match.url}/${dependentValues._id}`)
);

const LinkDetailsCell = (props) => {
  const {
    value,
    cellType,
    history,
    match,
    dependentValues,
  } = props;

  let outputValue = value;

  if (cellType) {
    switch (cellType) {
      case 'userName':
        outputValue = `${value.first} ${value.last}`;
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <span className="link-details-cell" onClick={() => onClickHandler(history, match, dependentValues)} >
        {outputValue}
      </span>
    </div>
  );
};

LinkDetailsCell.defaultProps = {
  value: null,
  cellType: null,
  dependentValues: null,
};

LinkDetailsCell.propTypes = {
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

export default LinkDetailsCell;
