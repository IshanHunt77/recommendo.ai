"use client"
import { useRouter } from "next/navigation"

const handleNav = ({path}:{path:string})=>{
    const router = useRouter()
    router.push(path)
}
export default handleNav;