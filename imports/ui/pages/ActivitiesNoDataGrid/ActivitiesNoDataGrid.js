import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NoDataGrid } from '../../components/NoDataGrid';
import ActivitiesCollection from '../../../api/Activities/Activities';

class ActivitiesNoDataGrid extends Component {
  constructor(props) {
    super(props);

    const {
      match,
    } = props;

    this.filters = {};
    if (match.params._id) {
      this.filters = {
        createdBy: match.params._id,
      };
    }

    this.pagination = new Meteor.Pagination(ActivitiesCollection, {
      name: 'activities.paginatedList',
      filters: this.filters,
      sort: {},
      perPage: 10,
      reactive: false,
      debug: true,
    });
  }

  render() {
    const {
      pagination,
    } = this;

    return (
      <div className="data-grid-container">
        <NoDataGrid
          match={this.props.match}
          history={this.props.history}
          pagination={pagination}
        />
      </div>
    );
  }
}

ActivitiesNoDataGrid.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ActivitiesNoDataGrid;
