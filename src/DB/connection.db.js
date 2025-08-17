import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // const uri = process.env.Dburl;
    console.log(process.env.Dburl);
    
    const result = await mongoose.connect(process.env.Dburl)
    console.log(result.models);
    console.log(`DB connected successfully ❤️`);
  } catch (error) {
    console.log(`Fail to connect on DB`, error);
  }
}

export default connectDB