import { captureRejectionSymbol } from "events";
import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDb Connected')
        })
        connection.on('error',(err:any)=>{
            console.log(err)
            process.exit();
        })
    }catch(error){
        console.log('Something went wrong....')
        console.log(error)
    }
}