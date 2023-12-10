import Link from 'next/link'
import React from 'react'

const NotiPopup = () => {
  return (
    <div className='w-full h-full flex-center justify-center absolute top-0 left-0 layer z-[10]'>
          <div className='w-[50%]  text-center p-[30px] text-[16px] rounded-[10px] bg-white'>
              <p> We will conduct real-world  measurements, and if the investor lacks the financial capability and wishes to showcase the project on our website to attract external investment, we will push the project onto the blockchain to ensure transparency and easy tracking.
                  The estimated total cost when deploying on the blockchain will be converted into tokens at a rate of 1 Token : 1 USD.
                  When investors want to invest, they will need to purchase tokens, and those tokens will then be permanently locked.
              </p>
              <div className='mt-[30px] w-full '>
                  <Link className=' mt-[30px] border px-[30px] py-[10px] rounded-[5px] text-white bg-static' href='/'>Close</Link>
                  </div>
          </div>
    </div>
  )
}

export default NotiPopup
