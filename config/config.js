module.exports = {
  development: {
    username: 'postgres',
    password: 'drevnieslezi2012',
    database: 'db_for_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  stage: {
    username: 'stage_db_userName',
    password: 'stage_pass',
    database: 'stage_database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'postgres',
  },
};
