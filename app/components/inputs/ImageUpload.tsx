"use client"
import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

declare global{
    var cloudinary : any
}

interface ImageUploadProps{
    value : string
    onChange:(value : string) =>  void
}

function ImageUpload({value,onChange}:ImageUploadProps) {

  const handleUpload=useCallback((result:any)=>{
    onChange(result.info.secure_url)
  },[onChange])

  return (
    <div>
        <CldUploadWidget onSuccess={handleUpload} uploadPreset='ro4cpdeq' options={{maxFiles:1}}>
            {({open})=>{
                return (
                    <div onClick={()=>open?.()} className='relative cursor-pointer hover:opacity-70
                    transition border-dashed border-2 p-20 border-neutral-300 text-neutral-600
                    flex flex-col items-center justify-center gap-4'>
                        <TbPhotoPlus size={50}/>
                        <div className='font-semibold text-lg'>
                            Click to upload
                        </div>
                        {value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image alt="Upload" src={value} fill style={{objectFit:"cover"}}/>
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
