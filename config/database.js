const mongoose = require('mongoose');

require('dotenv').config();

module.exports = mongoose.createConnection(`mongodb://localhost:27017/sms`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});