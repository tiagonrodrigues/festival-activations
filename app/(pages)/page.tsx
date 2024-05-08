'use client'

import Link from 'next/link'
import React from 'react'

import '../globals.css';

export default function Home() {

  return (
    <div className='flex py-8 w-full h-full justify-center items-center bg-black'>
      <div className='w-[15rem] flex flex-col gap-4'>
        <Link
          className="flex items-center justify-center  w-full bg-[var(--musicaNoCoracao)] p-2 rounded-md"
          href={"/musica-no-coracao"}
        >
          Música no Coração
        </Link>
        <Link
          className="flex items-center justify-center text-center w-full bg-[var(--rockInRio)] p-2 rounded-md"
          href={"/rock-in-rio"}
        >
          Rock In Rio
        </Link>
      </div>
    </div>
  )
}
