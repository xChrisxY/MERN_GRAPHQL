import mongoose from "mongoose";

export const connectDB = async () => {

      try {
            // mongoose.set('strictQuery', false);
            const connection = await mongoose.connect('mongodb://localhost/merndb');
            
            console.log(`Mongodb connected: ${connection.connection.name}`);


      } catch (error) {
            
            console.error(`Error: ${error.message}`);
            process.exit(1);
      }

}

