"use client"
import React from 'react'

interface MenuItemProps{
    label:string,
    onClick:()=>void
}

function MenuItem({label,onClick} : MenuItemProps) {
  return (
    <div className='px-4 py-3 bg-neutral-100 font-semibold transition' onClick={onClick}>
        {label}
    </div>
  )
}

export default MenuItem
