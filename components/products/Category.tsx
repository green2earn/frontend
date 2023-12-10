import { useState } from "react"
import Button from "../Button"

const Category = () => {
    const[isDisplayed,setIsDisplayed] = useState<boolean>(false)
  return (
    <div className='flex mt-7 w-full'>
          <h3 className='w-[20%]'>Category </h3>
          <div className='w-[60%] border'>
          <div className='p-3'>
				<div className='  grid grid-cols-2 '>
					<span className='p-2  border-r-[1px] col-span-1 border-t-[1px] border-x-[1px]'>
						All categories
					</span>
					<span className='p-2 text-blue-500 col-span-1  border-b-[1px]'>
						Most used
					</span>
				</div>
				<div className='border-b-[1px] border-x-[1px] p-3'>
					<div className='flex text-blue-500'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 '
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.5 12.75l6 6 9-13.5'
							/>
						</svg>
						<span>Nang luong xanh</span>
					</div>
				</div>
                  <div className='mt-2  cursor-pointer '>
                  <div className="w-2/3">
                        <select className="w-full h-[40px] border px-3 rounded-md mt-3">
                            <option>---Select---</option>
                            <option>Dien mat troi</option>
                            <option>Dien gio</option>
                            <option>San cong nghe nang luong</option>
                        </select>
                    </div>
					<div onClick={()=>setIsDisplayed(!isDisplayed)} className='flex text-blue-500 underline mt-5 font-medium'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 6v12m6-6H6'
							/>
						</svg>
						<span>Add New Categories</span>
					</div>
                    {isDisplayed && (
                    <input  type='text' className="h-[30px] w-full border rounded-md mt-3"/>
                    )}
                    
                    {isDisplayed && (
                    <Button type='button'  className="border-[1px] flex-center justify-center min-w-[180px]  mt-4 py-2 text-white bg-blue-500 rounded-md">Add New Category</Button>
                    )}
				</div>
			</div>

          </div>
    </div>
  )
}

export default Category
