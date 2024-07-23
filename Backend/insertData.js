import {
  fileheader,
  imagesubheader,
  graphicsubheader,
  textsubheader,
  dessubheader,
} from "./TableResources.js";
import { tres } from "./tresList.js";

export async function insertData() {
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