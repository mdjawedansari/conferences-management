import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `database connected  ! host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("database connection failed", error.message);
    process.exit(-1);
  }
};


export default connectDb