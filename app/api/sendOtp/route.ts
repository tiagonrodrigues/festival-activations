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

  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
    console.log(verification.status)
    return NextResponse.json({
      status: 200,
      message: 'OTP sent successfully'
    })
  } catch (error) {
    console.error('Failed to send OTP', error)
    return NextResponse.json({
      message: 'Failed to send OTP',
      status: 500
    })
  }
}
