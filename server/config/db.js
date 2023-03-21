const mongoose = require('mongoose');

const connectDB = () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected...'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
