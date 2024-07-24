// "index.js"
// Created by Jack Hunter
// 07-10-2024

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sqlConnection from "./sqlConnection.js"

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
    releasability : req.body.releasability,
    sensor : req.body.sensor
  }
   try {
    const queryText = `INSERT INTO savedrulesets (Name, Classification, Country, Releasability, Sensor) VALUES (?,?,?,?,?)`;
    const params = [newRule.name, newRule.classification, newRule.country, newRule.releasability, newRule.sensor];
    sqlConnection.query(queryText, params, (error, results)=> {
      if (error) throw error;
    });
  } catch(error) {
    console.log("Error adding New Ruleset to Database: ", error);
  }
  next();
})

let savedRulesets = [];
app.get('/open', (req, res, next) => {
  try {
  const queryText = `SELECT * FROM savedrulesets`;
  sqlConnection.query(queryText, (error,results)=> {
    savedRulesets = results;
    if (error) throw error;
  })
  } catch (error) {
    console.log("Error fetching from database: ", error);
  }
  console.log("Saved Rulesets: ", savedRulesets)
  res.send(savedRulesets)
})

app.listen(8080, () => {
  console.log("Listening on port 8080!");
  // backend server listening for requests on port 8080
});

