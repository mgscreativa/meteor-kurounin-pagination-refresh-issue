import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, LinkDetailsCell, DateCell, ActivityByUserCell } from '../../components/DataGrid';
import ActivitiesCollection from '../../../api/Activities/Activities';

class Activities extends Component {
  constructor(props) {
    super(props);

    const {
      history,
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

    this.columns = [
      {
        key: 'type',
        name: 'Tipo de Ejercicio',
        formatter: <LinkDetailsCell history={history} match={match} />,
        getRowMetaData: row => ({ _id: row._id }),
        sortable: true,
        cellClass: 'cell',
      },
      {
        key: 'deviceNumber',
        name: 'Dispositivo',
        sortable: true,
        cellClass: 'device-number-cell',
      },
      {
        key: 'createdBy',
        name: 'Creator',
        formatter: <ActivityByUserCell history={history} match={match} />,
        sortable: true,
        cellClass: 'cell',
      },
      {
        key: 'createdAt',
        name: 'Creado',
        formatter: <DateCell />,
        sortable: true,
        cellClass: 'updated-at-cell',
      },
    ];

    this.buttonsConfig = [];
  }

  searchFilter = searchTerm => (
    {
      $or: [
        { type: { $regex: searchTerm, $options: 'i' } },
      ],
    }
  );

  render() {
    const {
      pagination,
      searchFilter,
      columns,
      buttonsConfig,
    } = this;

    return (
      <div className="data-grid-container">
        <DataGrid
          match={this.props.match}
          history={this.props.history}
          pagination={pagination}
          columns={columns}
          searchFilter={searchFilter}
          searchField="type"
          buttonsConfig={buttonsConfig}
        />
      </div>
    );
  }
}

Activities.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Activities;
