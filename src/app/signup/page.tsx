"use client";
import Link from 'next/link';
import React,{useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function signupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:'',
        password:'',
        username:''
    })
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading ,setLoading] = React.useState(false)
    const onSignup = async ()=>{
        try{
            setLoading(true)
            const response = await axios.post('/api/users/signup',user);
            console.log("Signup Success",response.data)
            router.push('/login')
        }catch(error:any){
            console.log('Signup Failed',error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h2>{loading ? 'Processing' : 'Signup'}</h2>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className='p-2 border border-gray-300 rounded-lg
                    mb-4 focus:outline-none focus:border-gray-600 text-black'  
                type="text"
                id='username'
                value={user.username}
                onChange={(e)=>{
                    setUser({...user,username:e.target.value})
                }}
                placeholder='username'
            />
            <label htmlFor="username">email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg
                    mb-4 focus:outline-none focus:border-gray-600 text-black' 
                type="text"
                id='email'
                value={user.email}
                onChange={(e)=>{
                    setUser({...user,email:e.target.value})
                }}
                placeholder='email'
            />
            <label htmlFor="username">password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg
                    mb-4 focus:outline-none focus:border-gray-600 text-black' 
                type="text"
                id='password'
                value={user.password}
                onChange={(e)=>{
                    setUser({...user,password:e.target.value})
                }}
                placeholder='password'
            />
            <button 
                onClick={onSignup}
                className='p-2 border border-gray-300
                rounded-lg mb-4 focus:ouline-none
                focus:border-gray-600'>
                    {buttonDisabled ? "No signup" : "Signup Now"}
            </button>
            <Link href='/login'>Visit Login page</Link>
        </div>
    )
}