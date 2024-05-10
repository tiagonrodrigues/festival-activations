import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: NextRequest, res: NextResponse) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )
  const { phoneNumber, otp } = await req.json()
  const verifySid = process.env.TWILIO_VERIFY_SID

  if (!verifySid) {
    throw new Error('TWILIO_VERIFY_SID is not defined')
  }

  console.log('Verifying OTP', otp, 'for', phoneNumber)

  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otp })

    console.log('Verification status:', verification_check.status)

    if (verification_check.status === 'approved') {
      return NextResponse.json({
        message: 'OTP verified successfully',
        status: 200
      })
    }

    return NextResponse.json({
      message: 'OTP verification failed',
      status: 400
    })
  } catch (error) {
    console.error('Failed to verify OTP', error)
    return NextResponse.json({ message: 'Failed to verify OTP', status: 500 })
  }
}
