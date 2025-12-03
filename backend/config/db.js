import mongoose from 'mongoose';

const connectDB = async (uri) => {
  if (!uri) throw new Error('Missing MongoDB URI');
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

export default connectDB;