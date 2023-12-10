
import { useEffect, useRef, useState } from "react"

const UploadMedia = () => {
    const [videoType, setVideoType] = useState<string>('')
    const [preview, setPreview] = useState<string>('');
	const[collect,setCollect]= useState<string[]>([])
	const [image, setImage] = useState<File>();
    const fileRef =useRef<HTMLInputElement>(null)
    const handleChooseVideoType =(e:React.ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault()
        setVideoType(e.target.value)
    }
    const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		if (file.size > 2100000) {
			
		}

		setPreview(URL.createObjectURL(file));
		setCollect([URL.createObjectURL(file),...collect])
		setImage(file);
	};
    useEffect(() => {
		return () => {
			preview && URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const handleToggleToUpdatefile = () => {
		fileRef.current?.click();
	};
	const handleDelete = (item: string) => {
		const newArray = collect.filter((i) => i !== item)
		setCollect(newArray)
   }
  return (
		<div className='flex mt-7 w-full'>
			<h3 className='w-[20%]'>Upload Media </h3>
			<div className='w-[60%] border p-3'>
				<div>
					<select
						onChange={handleChooseVideoType}
						className='w-full border'
					>
						<option value=''>Select file source</option>
						<option value='Upload from your computer)'>Upload from your computer</option>
						<option value='External URL'>External URL</option>
					</select>
					<span className='text-[#555666] italic text-[12px] mt-1'>
						{' '}
						Select your prefred vide type
					</span>
				</div>
				{!preview === false && collect.length > 0 && (
					<div className='w-full h-[200px] border grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-1 p-1'>
						{collect?.map((i, index) => (
							<div key={index} className='relative'>
								<div
									
									className='col-span-1 w-full h-full row-span-1 '
								>
									<img
										src={i}
										alt=''
										className='w-full h-full object-contain border'
									/>
								</div>

								<svg
									onClick={()=>handleDelete(i)}
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6 absolute right-0 top-0 cursor-pointer'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</div>
						))}
					</div>
				)}
				{videoType === 'Upload from your computer' && (
					<div className='flex-center py-6 justify-center border-[2px] border-dotted border-blue-500 bg-white'>
						<div className='flex-center flex-col justify-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-10 h-10 text-blue-500'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
								/>
							</svg>
							<span className='text-[#555666] italic text-[12px] mt-1'>
								{' '}
								File format:png,jpeg ...
							</span>
							<input
								ref={fileRef}
								hidden
								type='file'
								onChange={handleFileChange}
							/>
							<h4
								onClick={handleToggleToUpdatefile}
								className='border-[1px] mt-2 cursor-pointer px-3 text-blue-600 py-1 rounded-sm border-blue-500'
							>
								Upload file
							</h4>
						</div>
					</div>
				)}
				{videoType === 'External URL' && (
					<div className=' mt-3'>
						<input
							className='w-full pl-2 border'
							type='text'
							placeholder={videoType}
						/>
					</div>
				)}
			</div>
		</div>
  );
}

export default UploadMedia
