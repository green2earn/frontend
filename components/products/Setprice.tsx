import { useState } from "react"

const Setprice = () => {
    const[salePrice,setSalePrice] = useState<string>('')
  return (
      <div className='mt-7 w-full flex '>
          <h3  className='w-[20%]'>Price </h3>
          <div className='w-[60%] border  '>
              <div className='flex w-full p-3'>
                  <h3 className='w-1/4'>Current price</h3>
                  <div className='flex flex-col w-3/4 '>
					<input
						type='number'
						className='h-[36px] border rounded-sm px-2 w-full '
					/>
					<span className='text-[#555666] italic text-[12px] mt-1'>
						{' '}
						Course price in VND currency
					</span>
				</div>

              </div>
              <div className='flex w-full p-3'>
                  <h3 className='w-1/4'>Sale price</h3>
                  <div className='flex flex-col'>
					<input
                       onChange ={(e:React.ChangeEvent<HTMLInputElement>)=>setSalePrice(e.target.value)}
						type='text'
						className='h-[36px] border-[#d4d5dd] bg-[#eaebf0] rounded-sm px-2 w-full'
					/>
					<span className='text-[#d2d2d7] italic text-[12px] mt-1'>
						{' '}
						Course price in VND currency.Leave blank to remove sale
						price
					</span>
				</div>


              </div>
              {salePrice !== '' && (
                  <div className='flex flex-col w-full p-3'>
                      <div className='flex mt-[10px] w-full'>
                          <p className='w-[35%] '>Sale Start Date </p>
                          <input type='datetime-local' />
                      </div>
                      <div className='flex mt-[30px] w-full'>
                          <p className='w-[35%] '>Sale End Date </p>
                          <input type='datetime-local' />
                      </div>

                  </div>
              )}
          </div>
    </div>
  )
}

export default Setprice


