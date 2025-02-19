"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Logo() {
  const router=useRouter()
  return (
    <div className='flex gap-2 items-center justify-center'>
        <Image alt='Logo' width="35" height="35" src="/images/logo1.svg" 
        onClick={()=>router.push("/")} className='md:block hidden cursor-pointer'/>
         <span className="text-lg font-bold cursor-pointer" onClick={() => {
          router.push("/");
            router.refresh();
          }}
        >
          StaySphere
        </span>
    </div>
  )
}

export default Logo
