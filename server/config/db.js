const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite',
    logging: false,
  });
}  else {
  // 'mysql' or 'mssql' (Azure SQL uses 'mssql')
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect,
      dialectOptions:
        dialect === 'mssql'
          ? {
              options: {
                encrypt: true,
                trustServerCertificate: false,
                connectTimeout: 60000, // wait up to 60s for serverless DB to wake up
                requestTimeout: 60000,
              },
            }
          : {},
      retry: {
        max: 3, // retry a failed connection up to 3 times
        match: [/ETIMEOUT/, /ConnectionError/, /ESOCKET/],
        backoffBase: 3000,
        backoffExponent: 1.5,
      },
      logging: false,
    }
  );
}

module.exports = sequelize;
