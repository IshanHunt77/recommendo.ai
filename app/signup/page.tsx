"use client"
import { signIn, signOut, useSession } from "next-auth/react"

 const Signup = ()=>{
    const session = useSession()
    return <div>
       <button onClick={()=>signIn()}>Signin</button>
       <button onClick={()=>signOut()}>Logout</button>
       <p>{JSON.stringify(session)}</p>
    </div>
}

export default Signup
