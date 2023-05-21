import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import waterRoute from "./routes/Water.Route.js";
import cyberRoute from "./routes/Cyber.Route.js";
import triggerRoute from "./routes/Trigger.Route.js";
import identifiersRoute from "./routes/Identifiers.Route.js";
import configConditionRoute from "./routes/configCondition.Route.js";
import ParameterRoute from "./routes/Parameter.Route.js";
import ConnectionRoute from "./routes/Connection.Route.js";

const app = express();
const server = http.createServer(app);
import path from "path";
import { fileURLToPath } from "url";
// app.use(express.bodyParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000000,
  })
);
app.use("/WaterData", waterRoute);
app.use("/CyberProblem", cyberRoute);
app.use("/Triggers", triggerRoute);
app.use("/Identifiers", identifiersRoute);
app.use("/configConditions", configConditionRoute);
app.use("/Parameters", ParameterRoute);
app.use("/Connection", ConnectionRoute);

const CONNECTION_URL = `mongodb+srv://waterproject:t2k4VkJn963j7guP@water.wn7b7lm.mongodb.net/`;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error));

console.log("Talal");
