'use client'

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import './style.css';

export default function Winner() {
    const [email, setEmail] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalText, setModalText] = useState('')
    const [modalCloseFunction, setModalCloseFunction] = useState<any>(
        () => () => {
            setShowModal(false)
        }
    )

    const sendEmail = () => {
        if (email === '' || !email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
            setModalTitle('Erro')
            setModalText('Por favor insira um email válido')
            setModalCloseFunction(() => () => {
                setShowModal(false)
            })
            setShowModal(true)
        } else {
            emailjs.send('service_r8nvjhv', 'template_feazdz1', {email}, 'jeStFGZ-400kFvT_-');
            setModalTitle('AVISO')
            setModalText('O prémio foi enviado para o seu email.')
            setModalCloseFunction(() => () => {
                setShowModal(false)
            })
            setShowModal(true)
        }
    }

    const downloadPdf = () => {
        setModalTitle('AVISO')
        setModalText('O prémio foi descarregado com sucesso.')
        setModalCloseFunction(() => () => {
            setShowModal(false)
        })
        setShowModal(true)
        const link = document.createElement('a');
        link.href = '/PREMIO.pdf';
        link.download = 'PREMIO.pdf';
        link.click();
    }

    return (
        <div className='bg w-full py-8 flex justify-center h-full items-center'>
            <div className='w-[18rem] flex flex-col gap-8 items-center'>
                <div
                    id='modal'
                    className={`${showModal ? 'fixed' : 'hidden'
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
                <button className='flex gap-4 items-center' onClick={downloadPdf}>
                    <span>FAZ DOWNLOAD DO CUPÃO</span>
                    <img src="/content/imgs/download.png" alt="icon" className='invert w-6' />
                </button>
                <button className='bg-white rounded-[10px] p-4 flex flex-col w-full text-black tracking-[3px]' onClick={downloadPdf}>
                    <p className='w-full text-center'>PRÉMIO</p>
                    <div className='w-full flex justify-between mt-4'>
                        <div className='text-left text-[1.2rem]'>
                            <p>VALE</p>
                            <p className='text-[#78de4e]'>#PRÉMIO</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='w-[4rem]' id='qrcode'>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={`92J3HR2`}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <p className='text-[.5rem]'>92J3HR2</p>
                            <div className='h-[6px] w-[4rem] bg-[var(--brandfeels)]'></div>
                        </div>
                    </div>
                    <div className='flex items-end'>
                        <img src="/content/logos/brandfeels-black.png" alt="logo" className='w-24' />
                    </div>
                </button>
                <p>OU ENVIA PARA O TEU EMAIL</p>
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='py-1 text-[1rem] font-sans px-2 bg-[transparent] border-[2px] outline-none border-white rounded-full w-full'
                />
                <button
                    className='px-6 py-1 border-2 border-white rounded-full hover:text-black hover:bg-white transition-all duration-300 ease-in-out'
                    onClick={sendEmail}
                >
                    ENVIAR
                </button>
            </div>
        </div>
    )
}

