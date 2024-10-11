const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true, useUnifiedTopology : true})
        console.log('MongoDB connected');
    } catch(error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
// mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser : true, useUnifiedTopology : true})
// .then((res)=>console.log('> DB Connected...'))
// .catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`))
module.exports = { dbConnect }