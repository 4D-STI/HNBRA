module.exports = {
  "username": process.env.DB_USERNAME || 'postgres',
  "password": process.env.DB_PASSWORD || 'postgres',
  "database": process.env.DB_DATABASE_DEV || 'sdin-hnbra',
  "host": process.env.DB_HOST || 'localhost',
  "dialect": 'postgres'
}
