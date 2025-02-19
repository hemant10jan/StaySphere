"use client"

import React from 'react'
import Calender from '../inputs/Calender'
import Button from '../Button'
import { Range } from 'react-date-range'

interface ListingReservationProps{
    price:number,
    totalPrice:number,
    dateRange:Range,
    onChangeDate: (value : Range) => void
    onSubmit: () => void
    disabledDates:Date[]
    disabled?:boolean
}

function ListingReservation({price,totalPrice,dateRange,onChangeDate,onSubmit,disabledDates,disabled} 
    : ListingReservationProps) {
  return (
    <div className='bg-white rounded-2xl border-[1px] border-neutral-200 overflow-hidden'>
        <div className='flex flex-row items-center p-4 gap-1'> 
            <div className='text-2xl font-semibold'>
                $ {price}
            </div>
            <div className='font-light text-neutral-600'>
                night
            </div>
        </div>
        <hr/>
        <Calender value={dateRange} disabledDates={disabledDates} 
        onChange={(value)=> onChangeDate(value.selection)}/>
        <hr/>
        <div className='p-4'>
            <Button disabled={disabled} label="Reserve" onClick={onSubmit}/>
        </div>
        <div className='p-4 flex flex-row items-center font-semibold text-lg justify-between'>
            <div>
                Total
            </div>
            <div>
                $ {totalPrice}
            </div>
        </div>
    </div>
  )
}

export default ListingReservation
