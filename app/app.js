require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");

const port = process.env.APP_PORT;

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connectiong to database", err);
  } else {
    console.log("Connectd to Database!");
  }
});

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "34.64.51.215",
  port: 5001,
  database: "samsamfarm",
  user: "root",
  password: "ghskfen@@",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connectiong to database", err);
  } else {
    console.log("Connectd to Database!");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

<<<<<<< Updated upstream
app.get("/books", (req, res) => {
=======
app.get("/TEST", (req, res) => {
>>>>>>> Stashed changes
  connection.query("SELECT * FROM Users", (error, result) => {
    if (error) {
      console.error("디비 쿼리 에러", error);
      res.status(500).send("삐~~ 에러");
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
