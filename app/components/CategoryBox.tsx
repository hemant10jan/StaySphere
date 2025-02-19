"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface CategoryBoxProps{
    icon:IconType
    selected?:boolean
    label:string
}

function CategoryBox({icon:Icon,label,selected} : CategoryBoxProps) {
    const router=useRouter()
    const params=useSearchParams()

    const handleClick=useCallback(()=>{
        let currentQuery={}

        if(params){
            currentQuery=qs.parse(params.toString())
        }

        const updateQuery : any={
            ...currentQuery,
            category:label
        }

        if(params?.get('category')===label){
            delete updateQuery.category
        }

        const url=qs.stringifyUrl({
            url:"/",
            query:updateQuery
        },{skipNull:true})

        console.log(updateQuery)
        console.log(url)
        console.log(params)

        router.push(url)
    },[label,params,router])

    return (
        <div onClick={handleClick} className={`flex flex-col gap-2 p-3 items-center justify-center border-b-2 
        hover:text-neutral-800 transition cursor-pointer 
        ${selected?"border-b-neutral-800":"border-transparent"}
        ${selected?"text-neutral-800":"text-neutral-500"}`}>
            <Icon size={26}/>
            <div className='font-medium text-sm'>{label}</div>
        </div>
    )
}

export default CategoryBox
