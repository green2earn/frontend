import React from 'react'

const LeaveCard = () => {
  return (
    <>
    <div  className=' relative h-[260px] mb-[20px]  background-image_leafCard'>
      <div className='absolute background-image_leafsm left-0 top-[155px] w-[32.23px]  h-[41.22px]'> </div>
      <div className='absolute background-image_leaflg left-0 top-[193px] w-[71px]  h-[51px]'> </div>
      <div className='absolute background-image_leafmd left-[37px] top-[228px] w-[63px]  h-[32px]'> </div>
      <div className='absolute background-image_titleBar left-[19.99px] top-[8.77px] w-[302.39px] text-center   h-[43.87px]'>
         <p className='leading-[43.87px] text-[24px] text-white'>August 2023</p>
      </div>
      <p className='absolute top-[70px] text-white font-[400] left-[48px] right-[48px] text-[16px] leading-[19.41px]'>Over 1,000 people from around the world across blockchain, ReFi, sustainability & climate tech industries joined us at the ReFi House Austin. Visit the Flowcarbon YouTube channel to view our panels and other highlights from the event.</p>
      </div>
      </>
  )
}

export default LeaveCard
