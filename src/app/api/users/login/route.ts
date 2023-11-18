import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;
        console.log(reqBody)
        // Check if the user exist or not 
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"user is not Exit with email"},{status:404})
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:'Invalid Password'},{status:404});
        }
        const tokenData ={
            id:user._id,  
            username: user.username,
            email:user.email
        }
        // Create Token 
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        const response = NextResponse.json({
            message:"Login successfull",
            success:true,
        })
        response.cookies.set("token",token,
            {
                httpOnly:true,
            })
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500});
    }
}