"use client"

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories'

interface NavbarProps{
  currentUser?: SafeUser | null 
}

function Navbar({currentUser} : NavbarProps) {
  return (
    <div className='fixed z-10 shadow-sm bg-white w-full'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex justify-between items-center gap-3 md:gap-0'>
                    <Logo/>
                    <Search/>
                    <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
            <Categories/>
        </div>
    </div>
  )
}

export default Navbar



