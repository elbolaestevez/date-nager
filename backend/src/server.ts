import express, { json } from "express";
import dotenv from "dotenv";
import { allRoutes } from "./routes/index";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4040;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
