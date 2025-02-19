"use client"
import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps{
    title:string
    subtitle:string
    value:number
    onChange:(value : number)=> void
}

function Counter({title,subtitle,value,onChange} : CounterProps) {

  const onAdd=useCallback(()=>{
    onChange(value+1)
  },[value,onChange])
  
  const onReduce=useCallback(()=>{
    if(value===1){
        return undefined
    }

    onChange(value-1)
  },[value,onChange])

  return (
    <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
            <div className='font-medium'>
                {title}
            </div>
            <div className='font-light text-gray-600'>
                {subtitle}
            </div>
        </div>   
        <div className='flex flex-row items-center gap-4'>
            <div onClick={onReduce} className='w-10 h-10 flex items-center justify-center border-[1px]
            border-neutral-400 text-neutral-600 rounded-full hover:opacity-80 transition cursor-pointer'>
                <AiOutlineMinus/>
            </div>
            <div className='font-light text-xl text-neutral-600'>
                {value}
            </div>
            <div onClick={onAdd} className='w-10 h-10 flex items-center justify-center border-[1px]
            border-neutral-400 text-neutral-600 rounded-full hover:opacity-80 transition cursor-pointer'>
                <AiOutlinePlus/>
            </div>
        </div> 
    </div>
  )
}

export default Counter
