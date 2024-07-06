'use client'

import React from 'react';

export default function Links() {

    const downloadPdf = () => {
        const link = document.createElement('a');
        link.href = '/brandfeels.pdf';
        link.download = 'brandfeels.pdf';
        link.click();
    }

    return (
        <div className='py-8 bg-[#141414] min-h-screen w-full flex justify-center'>
            <div className='w-[18rem] flex flex-col items-center gap-10'>
                <div className='flex flex-col items-center'>
                    <div className='rounded-full w-[6rem] h-[6rem] bg-black flex justify-center items-center mb-4 p-6'>
                        <img src="/content/logos/icon.png" alt="logo" />
                    </div>
                    <p className='text-[1.6rem]'>Brandfeels</p>
                    <a className='hover:underline' href="mailto:info@brandfeels.com">support@brandfeels.com</a>
                </div>
                <div className='flex flex-col w-full gap-4'>
                    <button onClick={() => window.open("https://brandfeels.com", '_blank')} className='relative bg-[#8c52ff] rounded-full h-[3.5rem] w-full flex justify-center items-center cursor-pointer hover:bg-[transparent] transition-all duration-300 ease border-2 border-[#8c52ff]'>
                        <p>Website</p>
                    </button>
                    <button onClick={() => window.open("https://demo.brandfeels.com/musica-no-coracao/", '_blank')} className='relative bg-[#8c52ff] rounded-full h-[3.5rem] w-full flex justify-center items-center cursor-pointer hover:bg-[transparent] transition-all duration-300 ease border-2 border-[#8c52ff]'>
                        <p>Demonstração</p>
                    </button>
                    <a href="/BrandFeels.pdf" className='relative bg-[#8c52ff] rounded-full h-[3.5rem] w-full flex justify-center items-center cursor-pointer hover:bg-[transparent] transition-all duration-300 ease border-2 border-[#8c52ff] gap-2'>
                        <span>Apresentação</span>
                        <img src="/content/imgs/download.png" alt="icon" className='w-6 invert' />
                    </a>
                </div>
            </div>
        </div>
    );
}

