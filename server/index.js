import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000000,
  })
);

const CONNECTION_URL = `mongodb+srv://waterproject:t2k4VkJn963j7guP@water.wn7b7lm.mongodb.net/`;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error));
