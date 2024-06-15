import mysql from "mysql";

// Database
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jualind_db",
});
