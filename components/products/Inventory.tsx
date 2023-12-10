
const Inventory = () => {
  return (
    <div className='flex mt-7 w-full'>
          <h3 className='w-[20%]'>Inventory </h3>
          <div className='w-[60%] border'>
            <div className='flex-center w-full p-3'>
                  <h3 className='w-1/4'>MaSP</h3>
					<input
						type='text'
						className='h-[36px] border rounded-sm px-2 w-3/4 '
					/>
              </div>
              <div className='flex-center w-full p-3'>
                  <h3 className='w-1/4'>Instock</h3>
					<input
						type='number'
						className='h-[36px] border rounded-sm px-2 w-3/4 '
					/>
              </div>
          </div>
          <div></div>
    </div>
  )
}

export default Inventory
