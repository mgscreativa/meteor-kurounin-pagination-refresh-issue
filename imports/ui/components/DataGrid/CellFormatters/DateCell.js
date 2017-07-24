import React from 'react';
import PropTypes from 'prop-types';

const DateCell = ({ value }) => (
  <div>
    <div>
      {value}
    </div>
  </div>
);

DateCell.defaultProps = {
  value: null,
};

DateCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

export default DateCell;
