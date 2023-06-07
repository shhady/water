import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import triggerRoute from "./routes/Trigger.Route.js";
import TriggerTypeRoute from "./routes/TriggerType.Route.js";
import SensorsRoute from "./routes/Sensors.Route.js";
import SystemRoute from "./routes/System.Route.js";
import WaterInfrastructureRoute from "./routes/WaterInfrastructure.Route.js";

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
app.use("/Triggers", triggerRoute);
app.use("/TriggerTypes", TriggerTypeRoute);
app.use("/Sensors", SensorsRoute);
app.use("/Systems", SystemRoute);
app.use("/WaterInfras", WaterInfrastructureRoute);

//------- Talal's db
//const CONNECTION_URL = `mongodb+srv://waterproject:t2k4VkJn963j7guP@water.wn7b7lm.mongodb.net/`;
// ADMIN PASSWORD : sJ0NbKZcc05yx2mL
const CONNECTION_URL = `mongodb+srv://admin:sJ0NbKZcc05yx2mL@water.oijj2lx.mongodb.net/`;
const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     server.listen(PORT, () => console.log(`server running on port : ${PORT}`));
//     console.log("Connected to DB");
//   })
//-------------
//const CONNECTION_URL = `mongodb+srv://password:n2s4Yw9LZWTMld15@cluster0.47tub.mongodb.net/?retryWrites=true&w=majority`;
//const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => console.log(`server running on port : ${PORT}`));
  })
  .catch((error) => console.log(error));
