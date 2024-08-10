// const mongoose = require("mongoose");

// let isConnected = false;

// const connectToDB = async () => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL || "", {
//       dbName: "anniesBoutique"
//     });

//     isConnected = true;
//     console.log("MongoDB is connected");
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = connectToDB;








// const mongoose = require("mongoose");

// let isConnected = false;

// const connectToDB = async () => {
//   if (isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL || "", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true
//     });

//     isConnected = true;
//     console.log("MongoDB is connected");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// };

// module.exports = connectToDB;

// // Call the connectToDB function to establish the connection
// connectToDB();








// import { useEffect, useState } from 'react';
// import mongoose from 'mongoose';

// const ConnectToDB = () => {
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const connectToDB = async () => {
//       if (isConnected) {
//         console.log('MongoDB is already connected');
//         return;
//       }

//       try {
//         await mongoose.connect(process.env.MONGODB_URL || '', {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//           useFindAndModify: false,
//           useCreateIndex: true,
//         });

//         setIsConnected(true);
//         console.log('MongoDB is connected');
//       } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//       }
//     };

//     connectToDB();
//   }, [isConnected]);

//   return null; // This component doesn't render anything visible
// };

// export default ConnectToDB;




const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connect = async () => {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "anniesBoutique",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};

module.exports = {
  connect,
};
