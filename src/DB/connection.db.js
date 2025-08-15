import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // const uri = process.env.Dburl;
    const result = await mongoose.connect("mongodb+srv://Mokhaled:2GASWsHSdKwD89nO@sarah-app.mv4o3pi.mongodb.net/Sarah-app", {
      serverSelectionTimeoutMS: 30000
    })
    console.log(result.models);
    console.log(`DB connected successfully ❤️`);
  } catch (error) {
    console.log(`Fail to connect on DB`, error);
  }
}

export default connectDB