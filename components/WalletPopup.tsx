import { RootState, useAppDispatch, useAppSelector } from '@/stores/store'
import { popupWallet } from '@/stores/toggleSlice'
import React from 'react'

const WalletPopup = () => {
    const dispatch = useAppDispatch()
    const handlePopupWallet = () => {
        dispatch(popupWallet(false))
    }
    const { wallet, isLoading } = useAppSelector(
		(state: RootState) => state.nearWallet
	);
    const handleSelectWallet = () => {
        // wallet?.signIn();
        dispatch(popupWallet(false))
    }
  return (
    <div className='fixed top-0 left-0 right-0 flex-center z-[99] justify-center h-screen w-screen bg-[#2222]'>
          <div className='h-[50%] w-[30%] bg-white p-4'>
              <div onClick={handlePopupWallet} className='flex justify-end cursor-pointer'>X</div>
              <p className='text-center mt-[50px] '>You have not logged in your wallet yet</p>
              <div className='flex-center justify-center'>
              <button  onClick={handleSelectWallet} className="w-[190px] h-[48px] rounded-[8px] mt-[30px] bg-btn text-white lg:mt-[80px]">
							Connect your wallet
                  </button>
                  </div>
          </div>
    </div>
  )
}

export default WalletPopup
