'use client'

import Link from 'next/link'
import React from 'react'

import '../globals.css';

export default function Home() {

  return (
    <div className='flex flex-col gap-4 py-8 h-full justify-center w-[15rem]'>
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
  )
}
