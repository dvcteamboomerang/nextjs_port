import { connectToDatabase } from "../../scripts/MongoDb/mongodb";
import verify_token from "../../scripts/Firebase/verify_token";
const ObjectId = require("mongodb").ObjectId;
export default async function handler(req, res) {
  try {
    verify_token(); //will be worked on later
    // connect to the database
    let { db } = await connectToDatabase();
    let collection = db.collection("Users");
    // fetch the posts
    let queryResults = await collection.findOne({ uid: req.body }).toArray();
    if (queryResults.length) {
      await collection.insertOne(req.body);
      // return the posts
      return res.json({
        message: "Post added successfully",
        success: true,
      });
    }
  } catch (error) {
    // return the error
    console.log(error);
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
