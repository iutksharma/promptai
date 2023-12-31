import { strict } from 'jade/lib/doctypes';
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("MongoDB is Already running")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected= true;
        console.log("MonogDB Connected")
    } catch (error) {
        console.log("Error")        
    }
}