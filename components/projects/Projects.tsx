import { useAppDispatch } from "@/stores/store"
import { toggleAddProjectPage } from "@/stores/toggleSlice"

const Project = () => {
	const dispatch =useAppDispatch()
  return (
    <div className='border-t-[1px] px-7 py-4 '>
			<div className='flex items-center justify-between'>
				<h2 className='text-[20px] font-[600]'>Projects</h2>
				<div onClick={()=>dispatch(toggleAddProjectPage())} className='cursor-pointer border-[1px] px-6 py-2 bg-orange-600 text-white rounded-md'>
					Add Project
				</div>
			</div>
      
    </div>
  )
}
export default Project