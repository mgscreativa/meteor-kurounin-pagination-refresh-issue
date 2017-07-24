/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Activities = new Mongo.Collection('Activities');

Activities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Activities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Activities.schema = new SimpleSchema({
  createdBy: {
    type: String,
    label: 'The ID of the user that created this activity.',
  },
  createdAt: {
    type: String,
    label: 'The date this activity was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  deviceNumber: {
    type: Number,
    label: 'The Number of device used to exercise.',
  },
  type: {
    type: String,
    label: 'The type of activity.',
    allowedValues: ['Estilo Libre', 'Spinning Simple', 'Spinning Multiple', 'Circuito Aeróbico'],
  },
  duration: {
    type: Number,
    label: 'The duration of this activity.',
    max: 86400,
  },
});

Activities.attachSchema(Activities.schema);

export default Activities;
