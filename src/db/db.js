// import mysql from "mysql2/promise";
// import db_connetion from "../configs/db.js";
const mysql = require("mysql2/promise");
const db_connetion = require("../configs/db.js");
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool(db_connetion);

module.exports=pool;
