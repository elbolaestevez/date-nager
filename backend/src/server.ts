import express, { json } from "express";
import dotenv from "dotenv";
import { allRoutes } from "./routes/index";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use("/api", allRoutes);

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
