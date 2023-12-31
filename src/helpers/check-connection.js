const mongoose = require('mongoose');

const countConnection = () => {
  const count = mongoose.connections.length;
  console.log('🚀 ~ file: check-connection.js:5 ~ countConnection ~ count:', count);
};

module.exports = {
  countConnection,
};
