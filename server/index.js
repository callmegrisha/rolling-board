require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');

const connectDB = require('./config/db');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', router);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    connectDB();
  } catch (error) {
    console.error(error);
  }
};

start();
