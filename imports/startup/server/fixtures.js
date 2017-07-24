import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/Documents/Documents';
import Activities from '../../api/Activities/Activities';

const wipeData = false;
const environments = ['development', 'staging', 'production'];
const activityTypes = ['Estilo Libre', 'Spinning Simple', 'Spinning Multiple', 'Circuito Aeróbico'];

const documentsSeed = userId => ({
  collection: Documents,
  environments,
  wipe: wipeData,
  noLimit: true,
  modelCount: 15,
  model(dataIndex) {
    return {
      owner: userId,
      title: `Document #${dataIndex + 1}`,
      body: `This is the body of document #${dataIndex + 1}`,
    };
  },
});

const activitiesSeed = (userId) => {
  seeder(Activities, {
    environments,
    wipe: wipeData,
    noLimit: true,
    modelCount: 15,
    model(index, faker) {
      return {
        createdBy: userId,
        deviceNumber: faker.random.number(9999),
        type: faker.random.arrayElement(activityTypes),
        duration: faker.random.number({ min: 600, max: 3600 }),
      };
    },
  });
};

seeder(Meteor.users, {
  environments,
  wipe: wipeData,
  noLimit: true,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin'],
    data(userId) {
      activitiesSeed(userId);
      return documentsSeed(userId);
    },
  }],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        activitiesSeed(userId);
        return documentsSeed(userId);
      },
    };
  },
});
