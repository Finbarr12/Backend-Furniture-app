import express, { Application } from "express";
import router from "./Router/router";
import cors from "cors";
const app: Application = express();
const Port = 2001;
app.use(express.json());
require("./Config/Db");
app.use(cors());
app.use("/api", router);

app.listen(Port, () => {
  console.log("Server is listening");
});
