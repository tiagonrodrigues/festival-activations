import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
    const { phoneNumber, otp } = await req.json()

    const verifySid = process.env.TWILIO_VERIFY_SID

    if (!verifySid) {
      throw new Error('TWILIO_VERIFY_SID is not defined')
    }

    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otp })

    if (verificationCheck.status === 'approved') {
      return NextResponse.json({ message: 'success', status: 201 })
    } else {
      return NextResponse.json({ message: 'ardeu', status: 400 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error', status: 500 })
  }
}
