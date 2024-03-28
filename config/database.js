const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect("mongodb://localhost/ChatXSocket");
}

module.exports = connect;