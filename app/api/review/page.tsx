"use client"
import axios from 'axios'
import React, { useState } from 'react'

export default  function CreateReview () {
    const [review,setReview] = useState()
    const [reviewOfFilm,setFilm] = useState()
    const handleReview = async ()=>{
        const result = await axios.post("http://localhost:3000/api/pages/createReview",{
            review,
            reviewOfFilm
        })
        console.log(result)
    }
    
  return (
    <div>
        <input placeholder='Enter review' type='text' onChange={(e:any)=>setReview(e.target.value)}/>
        <input placeholder='Enter review' type='text' onChange={(e:any)=>setFilm(e.target.value)}/>
        <button onClick={handleReview}>Submit</button>
    </div>
  )
}
