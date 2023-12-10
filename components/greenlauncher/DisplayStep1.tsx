import { setDisplayLayout, setDisplayMap, setDisplayRoofType, setDisplayStep1 } from '@/stores/activeButtonSlice';
import { setDraw } from '@/stores/drawSlice';
import { useAppDispatch, useAppSelector } from '@/stores/store';
import { motion } from 'framer-motion';
import React from 'react'

interface Iprops {
  setDisplayStep1: React.Dispatch<React.SetStateAction<boolean>>;
  displayStep1: boolean;
 
}


const DisplayStep1 = (props: Iprops) => {
  
  const {totalArea,draw} = useAppSelector(state=>state.draw)
  const dispatch = useAppDispatch()
  const{displayStep1,address ,propertyType } = useAppSelector(state=>state.activeButton)
  const handleBack = async () => { 
    setTimeout(() => {
      dispatch(setDisplayMap(false))
      
    }, 100)
    dispatch(setDisplayStep1(false))
    setTimeout(() => {
      dispatch(setDisplayLayout(false))    
    }, 1000)
    
  }
  const handleNext = () => {
    dispatch(setDisplayStep1(false))
    dispatch(setDisplayRoofType(true))
  }
  const handleStartDrawing = () => {
    if (!draw) {
      dispatch(setDraw(true))
      dispatch(setDisplayMap(true))
    }
  }
  return (
    <motion.div
    initial={{ x: 1000}}
    animate={{
     x: displayStep1 ? 0 : 500,
     }} 
    transition={{duration:.5, delay: 0.1 }}
    
      className=' h-screen w-[400px] border absolute z-[20] px-[20px] pt-[80px] right-0 bg-white'
    >
      <h2 className="text-black min-h-[50px] py-1 bg-[#fff7d8] flex-center text-[16px] justify-center rounded-[5px] text-center">{address }</h2>
          <p className="text-[#6b7280] mt-[10px] font-[400]">Type: <span className="text-[#000]">{ propertyType}</span></p>
          <div className="w-full h-[1px] bg-[#6b7280] my-[20px]"></div>
          <div className="w-full relative h-[200px] flex-center justify-center">
              {propertyType =='Landed house' && (
                  <img className="w-[100%] h-full" src='https://images.squarespace-cdn.com/content/v1/632aa5e01277374afac29533/d7c38ca6-aa87-4a77-994b-e6bb054a5337/Screenshot+2022-10-15+at+3.15.51+PM.jpg' alt='' />
              )}
               {propertyType =='Condominium' && (
                  <img className="w-[100%] h-full" src='https://www.hardwarezone.com.sg/thumbs/639061/b.jpg' alt='' />
        )}
                {propertyType =='Rented Comercial Property' && (
                  <img className="w-[100%] h-full" src='https://5.imimg.com/data5/SELLER/Default/2022/12/QR/KD/OI/59740639/commercial-solar-panel-installation-500x500.jpg' alt='' />
        )} 
         {propertyType =='Owned Comercial Property' && (
                  <img className="w-[100%] h-full" src='https://5.imimg.com/data5/SELLER/Default/2022/12/QR/KD/OI/59740639/commercial-solar-panel-installation-500x500.jpg' alt='' />
        )} 
        
              <div className="w-full h-full top-0 left-0 flex-center justify-center flex-col layer absolute">
                  <div className=" text-center text-[12px] w-full text-[#ffd602]">Draw your roof outline by clicking / tapping on your roof edges, point by point. </div>
                  <button onClick={ handleStartDrawing} className='text-white mt-[10px] text-[14px] textblink'>Click here to start</button>
              </div>
          </div>
      {totalArea > 0 ? (
         <div onClick={handleNext} className='w-full h-[40px] text-[15px] bg-[#f5ce30] text-center cursor-pointer rounded-[8px]  leading-[40px] mt-[30px]'>Continue</div>
      ) : (
        <div  className='w-full h-[40px] text-[15px] bg-[#fff3c3] text-center cursor-text rounded-[8px] text-[#b1b2b2] leading-[40px] mt-[30px]'>Continue</div>
         )}
       
       <div onClick={handleBack} className="w-full h-[40px] bg-[#e5e7eb] text-center cursor-pointer text-[15px] rounded-[8px] mt-[20px] leading-[40px]">Back</div>
    </motion.div>
  )
}

export default DisplayStep1
