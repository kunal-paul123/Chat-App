import mongoose from "mongoose";

const connectDB = async (uri) => {
  await mongoose
    .connect(uri, { dbName: "ChatApp" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
