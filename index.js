import express from "express";
import * as ejs from "ejs";
import path from "path";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  listAllRentals,
  deleteRental,
  doDeleteRental,
  addNewRental,
  doAddNewRental,
  editRental,
  doEditRental,
} from "./controller/list-rentals.controller.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine(".html", ejs.__express);

app.get("/", listAllRentals);
app.get("/edit/:id", editRental);
app.post("/edit/:id/confirm", doEditRental);
app.get("/delete/:id", deleteRental);
app.get("/delete/:id/confirm", doDeleteRental);
app.get("/new", addNewRental);
app.post("/new/confirm", doAddNewRental);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server listening on port: ${PORT}`)
);
