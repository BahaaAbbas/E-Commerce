const mongoose = require('mongoose');


async function connectMDB() {
    try {
       await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error);
    }



}

module.exports = connectMDB