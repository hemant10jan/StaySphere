"use client"
import React from 'react'
import Image from 'next/image'

interface AvatarProps{
  src?: string | null | undefined
}

function Avatar({src}:AvatarProps) {
  return (
    <div>
        <Image src={src || "/images/placeholder.png"} alt="Avatar" width="30" height="30" className='rounded-full'/>
    </div>
  )
}

export default Avatar
