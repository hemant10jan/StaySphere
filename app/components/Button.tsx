"use client"
import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps{
    label:string,
    onClick:(e:React.MouseEvent<HTMLButtonElement>) => void,
    disabled?:boolean,
    outline?:boolean,
    small?:boolean,
    icon?:IconType
}

function Button({label,onClick,disabled,outline,small,icon:Icon}:ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed 
      hover:opacity-80 transition rounded-lg w-full
      ${outline?'bg-white':'bg-[#8147fd]'}
      ${outline?'border-black':'border-[#8147fd]'}
      ${outline?'text-black':'text-white'}
      ${small?'text-sm':'text-md'}
      ${small?'font-light':'font-semibold'}
      ${small?'py-1':'py-3'}
      ${small?'border-[1px]':'border-2'}`}>
      {Icon && (<Icon size={25} className="absolute left-4 top-3"/>)}
      {label}
    </button>
  )
}

export default Button
