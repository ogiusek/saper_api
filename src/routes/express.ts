import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app .post .get .patch .remove crud

// app.post('/post', (req, res) => {
//   const body = req.body;

export { app };