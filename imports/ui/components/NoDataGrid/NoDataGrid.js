import React from 'react';
import PropTypes from 'prop-types';
import BootstrapPaginator from 'react-bootstrap-pagination';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading';

const NoDataGrid = (props) => {
  const {
    items,
    pagination,
    ready,
  } = props;

  if (!ready) { return <Loading />; }

  console.log(items);
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.deviceNumber}>Device No #{item.deviceNumber}</li>
        ))}
      </ul>

      <BootstrapPaginator
        pagination={pagination}
        limit={10}
        containerClass="text-right"
      />
    </div>
  );
};


NoDataGrid.defaultProps = {
  items: null,
};

NoDataGrid.propTypes = {
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object.isRequired,
};

export default createContainer(props => (
  {
    ready: props.pagination.ready(),
    items: props.pagination.getPage(),
  }
), NoDataGrid);
