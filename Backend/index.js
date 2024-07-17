// "index.js"
// Created by Jack Hunter
// 07-10-2024

import express from "express";
import cors from "cors";
import mysql from "mysql2";
import helmet from "helmet";
import {
  fileheader,
  imagesubheader,
  graphicsubheader,
  textsubheader,
  dessubheader,
} from "./TableResources.js";
import { tres } from "./tresList.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// route for "get" requests to "/" (root/homepage)
app.get("/", (req, res, next) => {
  res.json({ msg: "Message from the backend!!" });
  // backend response
});

app.listen(8080, () => {
  console.log("Listening on port 8080!");
  // backend server listening for requests on port 8080
});

// INSERT TABLE DATA INTO DB
async function insertData() {
  let headers = [
  fileheader,
  imagesubheader,
  graphicsubheader,
  textsubheader,
  dessubheader,
];
let headerNames = [
  "fileheader",
  "imagesubheader",
  "graphicsubheader",
  "textsubheader",
  "dessubheader",
];
const treName = Object.keys(tres);
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Password!",
      database: "db",
    });
    let i = 0;
    for (const element of headers) {
      for (const obj of element) {
        const sql = `INSERT INTO ${headerNames[i]} VALUES ('${obj.fieldName}','${obj.longName}',${obj.editable})`;
        connection.query(sql);
      }
      i++;
    }
    for (i = 0; i < treName.length; i++) {
      for (const element of tres[treName[i]]) {
        const sql = `INSERT INTO tre VALUES ('${treName[i]}','${element.fieldname}',"${element.longname}",${element.editable})`;
        connection.query(sql);
      }
    }
    console.log("Data Inserted Successfully!");
    connection.end();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}