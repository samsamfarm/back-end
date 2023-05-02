const express = require("express");
const app = express();
const port = 5000;

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

app.get("/books", (req, res) => {
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
