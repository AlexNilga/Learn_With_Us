require('dotenv').config(); // Optional: for loading env variables

module.exports = {
  development: {
    username: 'FileServerAppUser',
    password: 'MySecretPassword',
    database: 'FileServer',
    host: '127.0.0.1',
    port: '1433',
    dialect: 'mssql'
  }/*,
  test: {
    username: 'your_db_username',
    password: 'your_db_password',
    database: 'your_database_name_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }*/
};