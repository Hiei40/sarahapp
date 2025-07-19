import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://Route2000:Route123456@cluster0.eps5iuy.mongodb.net/"
    const result = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000
    })
    console.log(result.models);
    console.log(`DB connected successfully ❤️`);
  } catch (error) {
    console.log(`Fail to connect on DB`, error);
  }
}

export default connectDB