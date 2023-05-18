import merge from 'lodash.merge';

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'prod') {
  envConfig = require('./prod').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

export default merge(
  {
    // default config
    stage,
    env: process.env.NODE_ENV,
    port: 3000,
    secret: {
      jwt: process.env.JWT_SECRET,
      dbURL: process.env.DATABASE_URL,
    },
  },
  envConfig
);
