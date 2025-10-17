// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     // Set mongoose options for better deployment compatibility
//     mongoose.set('strictQuery', false);
    
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 30000, // 30 seconds
//       socketTimeoutMS: 45000, // 45 seconds
//       maxPoolSize: 10, // Maintain up to 10 socket connections
//       bufferMaxEntries: 0,
//       retryWrites: true,
//       w: 'majority'
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
//     // Handle connection events
//     mongoose.connection.on('error', (err) => {
//       console.error('❌ MongoDB connection error:', err);
//     });
    
//     mongoose.connection.on('disconnected', () => {
//       console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
//     });
    
//     mongoose.connection.on('reconnected', () => {
//       console.log('✅ MongoDB reconnected');
//     });
    
//     return conn;
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//     console.error('Connection details:', {
//       uri: process.env.MONGO_URI ? 'URI provided' : 'URI missing',
//       nodeEnv: process.env.NODE_ENV,
//       error: error.name
//     });
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set mongoose options for better deployment compatibility
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      retryWrites: true,
      w: 'majority'
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Connection details:', {
      uri: process.env.MONGO_URI ? 'URI provided' : 'URI missing',
      nodeEnv: process.env.NODE_ENV,
      error: error.name
    });
    process.exit(1);
  }
};

export default connectDB;