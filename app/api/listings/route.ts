import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const currentUser=await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body=await req.json()

    const {title,description,roomCount,bathroomCount,guestCount,location,price,imageSrc,category}=body

    // Object.keys(body).forEach((value:any)=>{

    // })
    
    const listing=await prisma.listing.create({
        data:{
            title,
            description,
            roomCount,
            guestCount,
            bathroomCount,
            imageSrc,
            category,
            locationValue:location.value,
            price:parseInt(price,10),
            userId:currentUser.id
        }
    })

    return NextResponse.json(listing)
}