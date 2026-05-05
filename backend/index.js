import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import chatbotRoutes from "./routes/chartbot.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));




app.use("/bot/v1/", chatbotRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});