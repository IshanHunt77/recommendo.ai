"use client"

import { createContext, useContext, useState } from "react";

const DataContext = createContext({} as any);


export const DataProvider = ({children}:any)=>{
    const [data,setData] = useState(false)
    return <DataContext.Provider value={{data,setData}}>
        {children}
    </DataContext.Provider>
 }

 export const useData = ()=>useContext(DataContext)