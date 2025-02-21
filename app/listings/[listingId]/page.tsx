import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getReservations from '@/app/actions/getReservations'

// interface Iparams{
//     listingId?:string
// }

async function ListingPage({params} : {params : Promise<{listingId:string}>} ) {
  const listing =await getListingById((await params))
  const reservations=await getReservations((await params))
  const currentUser=await getCurrentUser()


  if(!listing){
    return (
        <EmptyState/>
    )
  }
  return (
    <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
  )
}

export default ListingPage
