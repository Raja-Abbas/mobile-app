import React from 'react'
import Github from '../../public/github-mark.svg'
import Image from 'next/image'
import Card from './card'
import StoreIcon from './StoreIcon/Main'

function navbar() {
  return (
    <div>
        <div className='flex justify-between pe-10 items-center'>
    <div className='bg-black inline-flex pl-[140px] pt-[30px] shadow-2xl border border-gray-700 pr-[100px] -rotate-45 -ml-36'>
    <Image src={Github} alt="" className=''/>
    </div>
    <StoreIcon />
    </div>
    <div className='flex justify-center items-center mt-'>
    <Card />
    </div>
    </div>
  )
}

export default navbar