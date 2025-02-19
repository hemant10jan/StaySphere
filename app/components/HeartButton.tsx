"use client"
import React from 'react'
import { SafeUser } from '../types'
import useFavorite from '../hooks/useFavorite'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps{
    listingId:string
    currentUser?:SafeUser | null
}

function HeartButton({listingId,currentUser} : HeartButtonProps) {

  const {hasFavorited,toggleFavorite} = useFavorite({listingId,currentUser})

  return (
    <div onClick={toggleFavorite} className='relative hover:opacity-80 transition cursor-pointer'>
        <AiOutlineHeart size={24} className='fill-white absolute -top-[2px] -right-[2px]'/>
        <AiFillHeart size={20} className={hasFavorited ? "fill-rose-500 animate-pump" : "fill-neutral-500/60"}/>  
    </div>
  )
}

export default HeartButton
