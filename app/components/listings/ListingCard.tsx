"use client"

import useCountries from '@/app/hooks/useCountries'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import {format} from "date-fns"
import Image from 'next/image'
import HeartButton from '../HeartButton'
import Button from '../Button'

interface ListingCardProps{
    data:SafeListing
    reservation?:SafeReservation
    onAction?: (id : string) => void
    disabled?:boolean
    actionLabel?:string
    actionId?:string
    currentUser?:SafeUser | null
}

function ListingCard({data,reservation,onAction,disabled,actionLabel,actionId="",currentUser} : ListingCardProps) {
    const router=useRouter()
    const {getByValue} = useCountries()

    const location=getByValue(data.locationValue)

    const handleCancel=useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation()

        if(disabled){
            return
        }

        onAction?.(actionId)

    },[onAction,actionId,disabled])

    const price=useMemo(()=>{
        if(reservation){
            return reservation.totalPrice
        }

        return data.price
    },[data.price,reservation])

    const reservationDate=useMemo(()=>{
        if(!reservation){
            return null
        }

        const start=new Date(reservation.startDate)
        const end=new Date(reservation.endDate)

        return `${format(start,'PP')} - ${format(end,'PP')}`
    },[reservation])

    return (
    <div className='col-span-1 cursor-pointer group' onClick={() => router.push(`/listings/${data.id}`)}>
        <div className='flex flex-col gap-2 w-full'>
            <div className='aspect-square relative overflow-hidden w-full rounded-xl'>
                <Image alt="Listing" src={data.imageSrc} fill 
                className='object-cover h-full w-full group-hover:scale-110 transition'/>
                <div className='absolute top-3 right-3'>
                    <HeartButton listingId={data.id} currentUser={currentUser}/>
                </div>
            </div>
            <div className='font-semibold text-lg'>
                {location?.region} {location?.label}
            </div>
            <div className='font-light text-neutral-500 -mt-3'>
                {reservationDate || data.category}
            </div>
            <div className='flex flex-row gap-1 items-center -mt-1'>
                <div className='font-semibold'>
                    $ {price}
                </div>
                {!reservation && (<div className='font-light'>night</div>)}
            </div>
            {onAction && actionLabel && 
            (<Button disabled={disabled} small onClick={handleCancel} label={actionLabel}/>)}
        </div>
    </div>
  )
}

export default ListingCard
