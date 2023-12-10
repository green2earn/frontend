
const Options = () => {
    return (
			<div className='flex-center text-[#6e707f] mt-8 justify-end '>
				<small>2046 records found</small>
				<div className='h-[30px] ml-10 flex-center'>
					<input
						value='20'
						className='border rounded-sm px-1 mr-1 w-[50px] h-full'
					/>
					<small>per pages</small>
				</div>
				<div className=' ml-10 flex-center'>
					<div className='flex-center h-[30px] border p-1 bg-[#2222] cursor-pointer justify-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-4 h-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 19.5L8.25 12l7.5-7.5'
							/>
						</svg>
					</div>
					<div className='flex-center mx-3'>
						<div className=' flex-center justify-center mr-1 bg-white h-[30px] px-[20px] border '>
							1
						</div>
						{} <small>of 100</small>
					</div>
					<div className='flex-center h-[30px] border p-1 bg-[#2222] cursor-pointer justify-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-4 h-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.25 4.5l7.5 7.5-7.5 7.5'
							/>
						</svg>
					</div>
				</div>
			</div>
	);
}

export default Options
