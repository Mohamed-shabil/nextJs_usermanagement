import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig"
import { log } from "console";

connect();

export async function GET(request: NextRequest){
    try {
        log('hwllo world')
        const userId = await getDataFromToken(request)
        log('userId : ',userId)
        
        const user = await User.findOne({_id:userId}).select("-password");
        log('user',user)
        return NextResponse.json({
            message:'User Found',
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}