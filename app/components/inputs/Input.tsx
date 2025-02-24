"use client"
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'


interface InputProps{
    id:string,
    label:string,
    disabled?:boolean,
    type?:string,
    formatPrice?:boolean,
    required?:boolean,
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors
}

function Input({id,label,disabled,type="text",formatPrice,required,register,errors}:InputProps) {
  return (
    <div className='w-full relative'>

        {formatPrice && (<BiDollar size={24} className='text-neutral-700 absolute top-5 left-2'/>)}

        <input id={id} type={type} disabled={disabled} placeholder=' ' {...register(id,{required})}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 outline-md outline-none 
        transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice? "pl-9" :"pl-4"}
        ${errors[id]?"border-rose-500":"border-neutral-300"}
        ${errors[id]?"focus:border-rose-500":"focus:border-black"}`}/>

        <label className={`absolute text-md origin-[0] duration transition -translate-y-3  z-10 top-5
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
        peer-focus:-translate-y-4 ${errors[id]?"text-rose-500":"text-zinc-400"}
        ${formatPrice ? "left-9":"left-4"}`}>{label}</label>
    </div>
  )
}

export default Input
