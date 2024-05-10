'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './globals.css'

export default function Home() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [otpConfirm, setOtpConfirm] = useState(false)
  const [terms, setTerms] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')
  const [modalCloseFunction, setModalCloseFunction] = useState<any>(
    () => () => {
      setShowModal(false)
    }
  )

  const sendOtp = async () => {
    if (!terms) {
      setModalTitle('Aviso')
      setModalText('Por favor aceite os termos e condições para jogar.')
      setShowModal(true)
      return
    }
    if (!checkNumber()) {
      setModalTitle('Aviso')
      setModalText('Por favor insira um número de telemóvel válido.')
      setShowModal(true)
      return
    }
    setOtpConfirm(true)
    try {
      let number = phoneNumber
      // If number doesnt start with +351, add it
      if (number.length === 9) {
        number = '+351' + number
      }
      await fetch('/api/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: number })
      })
    } catch (error) {
      setModalTitle('Aviso')
      setModalText('Ocorreu um erro, tente mais tarde')
      setShowModal(true)
      setIsSpinning(false)
      return
    }
  }

  const verifyOtp = async () => {
    try {
      let number = phoneNumber
      // If number doesnt start with +351, add it
      if (number.length === 9) {
        number = '+351' + number
      }
      const response = await fetch('/api/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: number, otp })
      })

      const data = await response.json()

      if (data.status !== 200) {
        setModalTitle('Aviso')
        setModalText('O número introduzido não foi confirmado!')
        setShowModal(true)
        setIsSpinning(false)
        return
      }

      play()
    } catch (error) {
      setModalTitle('Aviso')
      setModalText('O número introduzido não foi confirmado!')
      setShowModal(true)
      setIsSpinning(false)
      return
    }
  }

  const slices = [
    { id: 'slice-1', content: '1 bilhete', result: 'medium', angle: 60 },
    { id: 'slice-2', content: 'Ups...', result: '', angle: 30 },
    { id: 'slice-3', content: '5% desconto', result: 'medium', angle: 0 },
    { id: 'slice-4', content: 'Ups...', result: '', angle: 330 },
    { id: 'slice-5', content: '5% desconto', result: 'medium', angle: 300 },
    { id: 'slice-6', content: 'Ups...', result: '', angle: 270 },
    { id: 'slice-7', content: '1 bilhete', result: 'medium', angle: 240 },
    { id: 'slice-8', content: 'Ups...', result: '', angle: 210 },
    { id: 'slice-9', content: '5% desconto', result: 'medium', angle: 180 },
    { id: 'slice-10', content: 'Ups...', result: '', angle: 150 },
    { id: 'slice-11', content: '5% desconto', result: 'medium', angle: 120 },
    { id: 'slice-12', content: 'Ups...', result: '', angle: 90 }
  ]

  function checkNumber() {
    return phoneNumber.length === 9 || phoneNumber.length === 13
  }

  function play() {
    setIsSpinning(true)
    if (!terms) {
      setModalTitle('Aviso')
      setModalText('Por favor aceite os termos e condições para jogar.')
      setShowModal(true)
      setIsSpinning(false)
      return
    }
    const selectedSlice = 4
    // const selectedSlice = Math.floor(Math.random() * 12)
    let roletaElement = document.getElementById('roulette-container')
    if (!roletaElement) return
    roletaElement.style.transform = `rotate(${
      slices[selectedSlice].angle + 720
    }deg)`
    setTimeout(() => {
      setIsSpinning(false)
      if (
        slices[selectedSlice].result === 'medium' ||
        slices[selectedSlice].result === 'premio'
      ) {
        setModalTitle('Parabéns!')
        setModalText(
          `Ganhaste ${slices[selectedSlice].content} no próximo bilhete que comprares!`
        )
        setModalCloseFunction(() => () => {
          router.push('/rock-in-rio/winner')
        })
      } else {
        setModalTitle('Ups...')
        setModalText('Tenta novamente em breve')
        setModalCloseFunction(() => () => {
          window.location.href = 'https://rockinriolisboa.pt/pt/home'
        })
      }
      setShowModal(true)
      setIsSpinning(false)
    }, 3100)
  }

  useEffect(() => {
    // Get info from DB
  }, [])

  return (
    <div className='game w-full py-8 flex justify-center'>
      <div className='w-[15rem] flex flex-col gap-4 items-center'>
        <div
          id='modal'
          className={`${
            showModal ? 'fixed' : 'hidden'
          } z-[10] left-0 top-0 w-full h-full bg-[rgba(0,0,0,.7)]`}
        >
          <div className='absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] bg-[var(--rockInRio)] w-[16rem] aspect-square flex flex-col gap-8 rounded-[25px] items-center justify-center px-4'>
            <p id='modal-title'>{modalTitle}</p>
            <p id='modal-text'>{modalText}</p>
            <button
              id='confirmBtn'
              className='px-6 py-1 border-2 border-white rounded-full'
              onClick={modalCloseFunction}
            >
              OK
            </button>
          </div>
        </div>
        <div className='flex justify-center w-full mb-2'>
          <img
            src='/content/logos/rockinrio.png'
            alt='logo'
            className='w-[6rem] relative left-1'
          />
        </div>
        <div className='relative roleta-container'>
          <div className='arrow'></div>
          <div
            id='roulette-container'
            className='roulette-container w-[18rem] h-[18rem] rounded-[50%] relative overflow-hidden border-[3px] border-white mb-8 transition-[transform] duration-[3000ms] ease-in-out'
          >
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black rounded-full z-[2] flex justify-center items-center w-[6.5rem] h-[6.5rem]'>
              <img
                src='/content/logos/rockinrio2.png'
                alt='icon'
                className='w-[5rem]'
              />
            </div>
            {slices.map((slice: any, index: number) => (
              <div
                key={index}
                className={`pizza-slice ${slice.result}`}
                style={{
                  transform: `rotate(${30 * index}deg)`,
                  backgroundColor:
                    slice.result === 'premio'
                      ? '#ffd04c'
                      : index % 2 === 0
                      ? '#5da5f1'
                      : 'auto'
                }}
              >
                <span className='!text-[.6rem]'>{slice.content}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=' flex flex-col gap-4 w-[18rem] text-[.8rem] px-4'>
          <p className='uppercase'>
            <span className='text-[var(--rockInRio)]'>Preenche</span> abaixo e{' '}
            <span className='text-[var(--rockInRio)]'>concorre</span> a um dos
            nossos incríveis{' '}
            <span className='text-[var(--rockInRio)]'>prêmios</span>!
          </p>
          {!otpConfirm ? (
            <input
              type='tel'
              placeholder='Número de telemóvel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='w-full px-4 py-2 outline-none border-2 border-white rounded-full bg-[transparent] '
            />
          ) : (
            <input
              type='tel'
              pattern='\d*'
              placeholder='Código de Confirmação'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='w-full px-4 py-2 outline-none border-2 border-white rounded-full bg-[transparent] '
            />
          )}
        </div>
        <div className='flex items-center justify-center w-full gap-4'>
          <div
            className='relative w-5 h-5 rounded-[5px] bg-[var(--rockInRio)] cursor-pointer'
            onClick={() => setTerms(!terms)}
          >
            <img
              src='/content/imgs/check-mark.png'
              alt='check'
              className={`${
                !terms ? 'hidden' : 'flex'
              } invert relative top-[-3px] right-[-3px]`}
            />
          </div>
          <button
            onClick={() => window.open('../../content/T&C.pdf')}
            className='hover:underline '
          >
            Termos e Condições
          </button>
        </div>
        <div className='premio-section'>
          <span id='premio' className='bg-[var(--secondary)]'></span>
        </div>
        <div className='w-full'>
          {otpConfirm ? (
            <button
              className='px-8 border-2 border-white rounded-[20px] py-2 text-[.9rem] transition-all duration-300 hover:bg-[var(--rockInRio)] cursor-pointer'
              onClick={verifyOtp}
              disabled={isSpinning}
            >
              TESTA A TUA SORTE!
            </button>
          ) : (
            <button
              className='px-8 border-2 border-white rounded-[20px] py-2 text-[.9rem] transition-all duration-300 hover:bg-[var(--rockInRio)] cursor-pointer'
              onClick={sendOtp}
            >
              CONFIRMAR NUMERO
            </button>
          )}
        </div>
        <a
          href='https://rockinriolisboa.pt'
          className='text-white hover:underline'
        >
          Ver <span className='text-[var(--rockInRio)]'>marca</span>
        </a>
        <p className=''>
          Powered by{' '}
          <a href='https://brandfeels.com' className='text-[var(--rockInRio)]'>
            Brandfeels
          </a>
        </p>
      </div>
    </div>
  )
}
