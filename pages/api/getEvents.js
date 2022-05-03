import { connectToDatabase } from "../../scripts/MongoDb/mongodb";
import verify_token from "../../scripts/Firebase/verify_token";
export default async function handler(req, res) {
  try {
    let { limit } = req.body;
    verify_token(); //will be worked on later
    // connect to the database
    let { db } = await connectToDatabase();
    let collection = db.collection("Events");
    // fetch the posts
    let queryResults = await collection
      .find()
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();
    if (queryResults.length) {
      // return the posts
      console.log(queryResults);
      return res.json({
        message: "Post added successfully",
        success: true,
        data: queryResults,
      });
    } else
      return res.json({
        message: "Post added successfully",
        success: true,
      });
  } catch (error) {
    // return the error
    console.log(error);
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
