'use client';
export default function UserProfile({params}:{params:{id:String}}){
    console.log(params)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <p className="text-4xl">
                Profile Page
                <span className="p-2 rounded bg-orange-500">{params.id}</span>
            </p>
        </div>
    )
}