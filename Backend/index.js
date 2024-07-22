// "index.js"
// Created by Jack Hunter
// 07-10-2024

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sqlConnection from "./sqlConnection.js"
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
app.use(
  cors({
    origin : 'http://localhost:5173',
    credentials : true
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// route for "get" requests to "/" (root/homepage)
app.get("/", (req, res, next) => {
  res.json({ msg: "Message from the backend!!" });
  next();
});

// route for handling new ruleset creation
app.post("/new", (req, res, next) => {
  res.json({msg: "Create Ruleset Button Pressed"})
  const newRule = {
    name : req.body.name,
    classification : req.body.classification,
    country : req.body.country,
    releaseability : req.body.releaseability,
    sensor : req.body.sensor
  }
   try {
    const queryText = `INSERT INTO savedrulesets (Name, Classification, Country, Releaseability, Sensor) VALUES (?,?,?,?,?)`;
    const params = [newRule.name, newRule.classification, newRule.country, newRule.releaseability, newRule.sensor];
    sqlConnection.query(queryText, params, (error, results)=> {
      console.log(results);
      if (error) throw error;
    });
  } catch(error) {
    console.log("Error adding New Ruleset to Database: ", error);
  }
  next();
})


app.get('/open', (req, res, next) => {
  try {
    const queryText = `SELECT * FROM savedrulesets`;
    sqlConnection.query(queryText, (error,results)=> {
      console.log(results)
      if (error) throw error;
    })
  } catch(error) {
    console.log("Error fetching from database: ", error);
  }
  next();
})

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