const mongoose = require("mongoose");

const uri = "mongodb+srv://bcerit:1@ecommercedb.k9pyfxk.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("MongoDB connection is successfully"))
        .catch((err) => console.log("Connection error! error is :" + err.message));
}

module.exports = connection;