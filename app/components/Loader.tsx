"use client"

import { PuffLoader } from "react-spinners"

const Loader = () =>{
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center">
            <PuffLoader color="red" size={60}/>
        </div>
    )
}

export default Loader