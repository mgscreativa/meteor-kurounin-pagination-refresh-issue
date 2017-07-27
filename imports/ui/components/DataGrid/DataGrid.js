import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import BootstrapPaginator from 'react-bootstrap-pagination';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading';
import ButtonBar from './ButtonBar';

class DataGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndexes: [],
    };
  }

  onGridSort = (sortColumn, sortDirection) => {
    switch (sortDirection) {
      case 'ASC':
        this.props.pagination.sort({ [sortColumn]: 1 });
        break;

      case 'DESC':
        this.props.pagination.sort({ [sortColumn]: -1 });
        break;

      default:
        this.props.pagination.sort({});
        break;
    }
  };

  onRowsSelected = (rows) => {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(_.map(rows, r => r.row._id)),
    });
  };

  onRowsDeselected = (rows) => {
    const rowIndexes = _.map(rows, r => r.row._id);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
    });
  };

  getSearchPlaceholder = (columns, searchField) => {
    const column = _.find(columns, { key: searchField });

    return (column && column.name) ? `${column.name}...` : 'Buscar...';
  };

  deleteSelected = (event) => {
    event.preventDefault();

    const {
      selectedIndexes,
    } = this.state;

    const {
      history,
      match,
    } = this.props;

    if (!selectedIndexes.length) {
      alert('Debes seleccionar al menos un item');
      return;
    }

    if (confirm('Are you sure? This is permanent!')) {
      console.log(`[DataGrid.deleteSelected] Deleting items: ${selectedIndexes}`);
      Meteor.call(`${this.props.pagination.collection._name.toLowerCase()}.remove`, { selectedIndexes }, (error) => {
        if (error) {
          alert(error.reason);
        } else {
          alert('Document deleted!');
          history.push(match.url);
        }
      });
    }
  };

  limitChange = (event) => {
    event.preventDefault();

    const {
      pagination,
    } = this.props;

    pagination.perPage(parseInt(this.perPageSelect.value, 10));
  };

  searchItems = (event) => {
    event.preventDefault();

    const searchTerm = this.search.value.trim();

    if (searchTerm === '') {
      alert('Debes indicar el término de búsqueda.');
      return;
    } else if (!isNaN(searchTerm)) {
      alert('No puedes buscar solo números.');
      return;
    }

    const {
      pagination,
      searchFilter,
    } = this.props;

    pagination.filters(searchFilter(searchTerm));
    pagination.currentPage(1);
  };

  render() {
    const {
      items,
      pagination,
      columns,
      searchField,
      buttonsConfig,
      ready,
    } = this.props;

    if (!ready) { return <Loading />; }

    if (items.length > 0) {
      const pageLimits = Meteor.settings.public.pageLimits;

      const tableHeight = (35 * (items.length + 1)) + 9;

      let showingFrom = (pagination.currentPage() * pagination.perPage()) - pagination.perPage();
      showingFrom = (showingFrom === 0) ? 1 : showingFrom;

      let showingTo = pagination.currentPage() * pagination.perPage();
      if (pagination.currentPage() === pagination.totalPages()) {
        showingTo = pagination.totalItems();
      }

      return (
        <div className="panel custom-panel" id="users">
          <div className="panel-heading">
            <div className="panel-heading-controls">

              <ButtonBar buttonsConfig={buttonsConfig} deleteSelected={this.deleteSelected} />

              <div className="pull-right">
                <div className="m-r-2 pull-right">
                  <label htmlFor="limit">Ver:</label>
                  <select
                    ref={c => (this.perPageSelect = c)}
                    name="per-page"
                    defaultValue={pagination.perPage()}
                    className="form-control input-sm custom-select m-l-1"
                    onChange={this.limitChange}
                  >
                    {_.map(pageLimits, limit => (
                      <option key={limit} value={limit}>{limit}</option>
                    ))}
                  </select>
                </div>

                <div className="m-r-2 pull-right">
                  <form className="searchForm" onSubmit={this.searchItems}>
                    <label htmlFor="search">
                      <input
                        name="search"
                        ref={c => (this.search = c)}
                        type="search"
                        className="form-control input-sm"
                        placeholder={this.getSearchPlaceholder(columns, searchField)}
                      />
                    </label>

                    <button className="btn btn-sm btn-success pull-right m-l-1" type="submit">
                      <span className="btn-label-icon left fa fa-search" />
                      Buscar
                    </button>
                  </form>
                </div>

              </div>

            </div>
          </div>

          <div className="panel-body custom-data-grid">
            <ReactDataGrid
              columns={columns}
              rowGetter={i => (items[i])}
              rowsCount={items.length}
              minHeight={tableHeight}
              onGridSort={this.onGridSort}
              rowSelection={{
                showCheckbox: true,
                enableShiftSelect: true,
                onRowsSelected: this.onRowsSelected,
                onRowsDeselected: this.onRowsDeselected,
                selectBy: {
                  keys: {
                    values: this.state.selectedIndexes,
                    rowKey: '_id',
                  },
                },
              }}
            />
          </div>

          <div className="panel-footer clearfix">
            <div className="panel-footer-controls">
              <div className="data-grid-info">
                Mostrando {showingFrom} a {showingTo} de {pagination.totalItems()} items
              </div>

              <BootstrapPaginator
                pagination={pagination}
                limit={10}
                containerClass="text-right"
              />

            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="alert alert-warning alert-dark">
        <strong>Ups...</strong> Todavía no hay items
        {alert('Todavía no hay items')}
      </div>
    );
  }
}

DataGrid.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  searchFilter: PropTypes.func.isRequired,
  searchField: PropTypes.string,
  buttonsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string.isRequired,
      route: PropTypes.string,
      buttonClassType: PropTypes.string.isRequired,
      onClick: PropTypes.string,
      iconClassName: PropTypes.string,
    }).isRequired,
  ),
};

export default createContainer(props => (
  {
    ready: props.pagination.ready(),
    items: props.pagination.getPage(),
  }
), DataGrid);
