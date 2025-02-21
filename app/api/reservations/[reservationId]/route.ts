import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

// interface IParams{
//     reservationId?: string
// }


export async function DELETE(request : Request,{params} : {params : Promise<{reservationId:string}>}){
    const currentUser=await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const  reservationId  = (await params).reservationId

    if(!reservationId || typeof reservationId !== "string"){
        throw new Error("Invalid reservationId")
    }

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id: reservationId,
            OR: [{userId:currentUser.id},{ listing: { userId: currentUser.id}}],
        },
    })

    return NextResponse.json(reservation)
}