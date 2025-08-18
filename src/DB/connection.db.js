import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // const uri = process.env.Dburl;
    console.log(process.env.DB_URL);
    
    const result = await mongoose.connect(process.env.DB_URL)
    console.log(result.models);
    console.log(`DB connected successfully ❤️`);
  } catch (error) {
    console.log(`Fail to connect on DB`, error);
  }
}

export default connectDB