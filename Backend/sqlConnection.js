import mysql from "mysql2";
const pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "Password!",
    database: "db",
});
export default {
    query : (queryText, params, callback) => {
        return pool.query(queryText, params, callback);
    }
};