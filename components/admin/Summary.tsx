
const Summary = () => {
  return (
		<div className='grid grid-cols-3 gap-x-6 mt-7'>
			<div className='col-span-1 flex items-center shadow-md p-1 px-3 border'>
				<div className='h-[40px] w-[40px] bg-blue-200 flex items-center justify-center text-blue-600 rounded-[50%] border'>
					$
				</div>
				<div className='ml-2 '>
					<h4>Total sale</h4>
					<span className='text-[14px]'>68.88$</span>
				</div>
			</div>
			<div className='col-span-1 px-3 flex shadow-md items-center p-1 border'>
				<div className='h-[40px] w-[40px] bg-green-200 flex items-center justify-center text-blue-600 rounded-[50%] border'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6 text-green-700'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
						/>
					</svg>
				</div>
				<div className='ml-2 '>
					<h4>Total Orders</h4>
					<span className='text-[14px]'>20</span>
				</div>
			</div>
			<div className='col-span-1 px-3 shadow-md flex items-center p-1 border'>
				<div className='h-[40px] w-[40px] bg-yellow-200 flex items-center justify-center text-blue-600 rounded-[50%] border'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6 text-yellow-700'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
				</div>
				<div className='ml-2 '>
					<h4>Total Products</h4>
					<span className='text-[14px]'>88</span>
				</div>
			</div>
		</div>
  );
}

export default Summary
