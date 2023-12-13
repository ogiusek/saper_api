import mysql from "mysql2/promise";

const connection = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`
});

setInterval(() => connection.then(db => db.query(`SELECT 1;`)), 60000);

export { connection };
export default connection;