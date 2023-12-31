const mongoose = require('mongoose');

module.exports = () => {
  console.log('connect DB');
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Successfully for MongoDB connected!!');
  } catch (err) {
    console.log(`Failed to connect to MongoDB - ${err.message}`);
    throw new Error(`Failed to connect to MongoDB`);
  }
};
