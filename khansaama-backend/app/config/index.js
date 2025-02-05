const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;
const secret = process.env.JWT_SECRET;
const mongoURI = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME; 
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, dbName: dbName };

async function connectToMongo() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(mongoURI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected database named: ", mongoose.connection.db.databaseName);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log('disconnecting due to error: ', err);
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
connectToMongo().catch(console.dir);



module.exports = {mongoose, ObjectID, secret}