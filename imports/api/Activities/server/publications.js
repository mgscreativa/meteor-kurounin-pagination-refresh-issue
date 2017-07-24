/* eslint-disable consistent-return */

import _ from 'lodash';
import { publishPagination } from 'meteor/kurounin:pagination';
import Activities from '../Activities';

publishPagination(Activities, {
  name: 'activities.paginatedList',
  transform_options: (filters, options) => {
    const newOptions = options;
    const fields = {
      createdBy: 1,
      createdAt: 1,
      deviceNumber: 1,
      type: 1,
      duration: 1,
    };

    newOptions.fields = _.extend(fields, newOptions.fields);

    return newOptions;
  },
});
