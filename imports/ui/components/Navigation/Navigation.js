import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';

import './Navigation.scss';

const Navigation = props => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Pup</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {!props.authenticated ? <PublicNavigation /> : <AuthenticatedNavigation {...props} />}
    </Navbar.Collapse>
  </Navbar>
);

Navigation.defaultProps = {
  name: '',
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Navigation;

const pageRegExp = /[?&]page=([0-9]+)/i;
export function getPageUrlValue(history) {
  if (history && history.location && history.location.search) {
    const matches = history.location.search.match(pageRegExp);

    if (matches && matches[1]) {
      return parseInt(matches[1], 10) || 1;
    }
  }

  return 1;
}

const pageRegReplaceExp = /(.*[?&]page=)[0-9]+(.*)/i;
export function changePage(history, page) {
  if (history && history.location) {
    const query = history.location.search.replace(pageRegReplaceExp, `$1${page}$2`);

    history.push({
      pathname: history.location.pathname,
      search: query,
      hash: history.location.hash,
      state: history.location.state,
    });

    return true;
  }

  return false;
}
