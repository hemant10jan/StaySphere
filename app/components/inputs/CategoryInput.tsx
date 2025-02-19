"use client"
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps{
    selected?:boolean
    icon:IconType
    label:string
    onClick: (value : string) => void
}

function CategoryInput({selected,icon:Icon,label,onClick} : CategoryInputProps) {
  return (
    <div onClick={()=>onClick(label)} className={`border-2 p-4 gap-3 rounded-xl hover:border-black
    flex flex-col transition cursor-pointer ${selected? "border-black" : "border-neutral-200"}`}>
        <Icon size={30}/>
        <div className='font-semibold'>{label}</div>
    </div>
  )
}

export default CategoryInput
