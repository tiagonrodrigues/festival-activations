'use client'

import { useState } from 'react'

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')

  const sendOtp = async () => {
    try {
      const response = await fetch('/api/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneNumber })
      })
      setMessage('OTP received.')
    } catch (error) {
      setMessage('Failed to send OTP.')
    }
  }

  const verifyOtp = async () => {
    try {
      const response = await fetch('/api/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp })
      })
      setMessage('OTP verified.')
    } catch (error) {
      setMessage('Failed to verify OTP.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='p-5 border-2 border-gray-300 rounded-md'>
        <input
          type='text'
          placeholder='Phone number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className='p-2 border-2 border-gray-300 rounded-md'
        />

        <button
          onClick={sendOtp}
          className='p-2 m-2 bg-blue-500 text-white rounded-md'
        >
          Send OTP
        </button>
        <input
          type='text'
          placeholder='OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className='p-2 border-2 border-gray-300 rounded-md'
        />
        <button
          onClick={verifyOtp}
          className='p-2 m-2 bg-blue-500 text-white rounded-md'
        >
          Verify OTP
        </button>
        <p className='p-2'>{message}</p>
      </div>
    </div>
  )
}
