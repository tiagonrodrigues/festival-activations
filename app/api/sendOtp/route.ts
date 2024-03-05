// This is the route file for the sendOtp API endpoint.
import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: NextRequest, res: NextResponse) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )
  const { phoneNumber } = await req.json()
  const verifySid = process.env.TWILIO_VERIFY_SID

  if (!verifySid) {
    throw new Error('TWILIO_VERIFY_SID is not defined')
  }

  console.log('teste')

  const verificationCheck = await client.verify.v2
    .services(verifySid)
    .verifications.create({ to: phoneNumber, channel: 'sms' })

  if (verificationCheck.status === 'approved') {
    return NextResponse.json({ message: 'sucess', status: 200 })
  } else {
    return NextResponse.json({ message: 'ardeu', status: 400 })
  }
}
