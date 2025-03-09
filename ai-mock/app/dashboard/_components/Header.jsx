"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
  const path = usePathname();
useEffect(() => {
  console.log('useEffect called');
  console.log('Current path:', path);
},[path]);
  return (
    <div className='flex p-6 mx-8 my-4 items-center justify-between  bg-opacity-90 rounded-4xl bg-secondary shadow-sm'>
      <Image src="/logo.png" width={80} height={30} alt="logo" />
      <ul className='hidden md:flex gap-6 text-black'>
        <li className={`hover:text-amber-400 cursor-pointer transition-colors duration-300 ${path == '/dashboard' && 'text-amber-400 font-bold'}`}>Dashboard</li>
        <li className={`hover:text-amber-400 cursor-pointer transition-colors duration-300 ${path == '/dashboard/question' && 'text-amber-400 font-bold'}`}>Questions</li>
        <li className={`hover:text-amber-400 cursor-pointer transition-colors duration-300 ${path == '/dashboard/upgrade' && 'text-amber-400 font-bold'}`}>Upgrade</li>
        <li className={`hover:text-amber-400 cursor-pointer transition-colors duration-300 ${path == '/dashboard/how' && 'text-amber-400 font-bold'}`}>How it works</li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header