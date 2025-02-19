"use client"
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalenderProps{
    value:Range
    onChange: (value: RangeKeyDict) => void
    disabledDates?: Date[]
}

function Calender({value,onChange,disabledDates} : CalenderProps) {
  return (
    <DateRange rangeColors={["#262626"]} ranges={[value]} date={new Date()} onChange={onChange} 
    direction='vertical' showDateDisplay={false} minDate={new Date()} disabledDates={disabledDates}/>
  )
}

export default Calender
