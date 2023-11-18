"use client"
import axios from "axios"
import Link from 'next/link'
import React,{useEffect,useState} from "react";
import toast,{Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage(){
    const router = useRouter();
    const [data,setData] = useState('nothing');
    const logout = async ()=>{
        try {
            const response = await axios.get('/api/users/logout')
            toast.success('Logout successfull')
            router.push('/login')
        } catch (error:any) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const getUserDetails = async ()=>{
        try{
            const res = await axios.get('/api/users/me')
            console.log(res.data)
            setData(res.data.data._id)
        }catch(error:any){
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Profile</h1>
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <br />
            <br />
            <br />
            <button onClick={logout} className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <br />
            <br />
            <br />
            <button onClick={getUserDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get User Deatils</button>
        </div>
    )
}