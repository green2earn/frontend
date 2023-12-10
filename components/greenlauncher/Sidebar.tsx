import { activeDisplayInterverList, activeDisplayPanelList } from "@/stores/activeButtonSlice";
import { useAppDispatch } from "@/stores/store";
import Image from "next/image";

interface Iprops{
  setDisplaySearchContent: React.Dispatch<React.SetStateAction<boolean>>
  displaySearchContent: boolean
  setDraw: React.Dispatch<React.SetStateAction<boolean>>
  draw: boolean
  setDisplayProject: React.Dispatch<React.SetStateAction<boolean>>
  setSetupSolar: React.Dispatch<React.SetStateAction<boolean>>
 showResults: boolean
}
const Sidebar = (props: Iprops) => {
  const dispatch = useAppDispatch()
  const handleDisplaySearch = () => {
    if (props.showResults) {
      props.setDisplaySearchContent(false)
    } else {
      props.setDisplaySearchContent(!props.displaySearchContent)
      props.setDisplayProject(false)
      props.setSetupSolar(false)
      dispatch(activeDisplayPanelList(false))
		dispatch(activeDisplayInterverList(false))
    }
}
  const handleDisplayProject = () => {
    if (props.showResults) {
      props.setDisplayProject(false)
    } else {
    props.setDisplaySearchContent(false)
      props.setDisplayProject(true)
  }
  }
  const handleDisplayRuller = () => {
    if (props.showResults) {
      props.setDraw(false)
    } else {
      props.setDraw(!props.draw)
      dispatch(activeDisplayPanelList(false))
		dispatch(activeDisplayInterverList(false))
  }
}
  return (
		<ul className="w-[50px] flex-col border-r-[1px] shadow-sm flex mx-auto pt-7 height-greenLauncher bg-white ">
			<li className="flex justify-center cursor-pointer mb-5">
                <Image className="cursor-pointer" src='/assets/images/Menu.png' alt='' width={30} height={30} />
			</li>
			<li onClick ={handleDisplaySearch} className='flex justify-center cursor-pointer mb-5'>
                <Image className="cursor-pointer" src='/assets/images/Look.png' alt='' width={30} height={30} />
          </li>
          <li onClick={handleDisplayProject} className="flex justify-center  mb-5">
				   <Image className="cursor-pointer" src='/assets/images/Project.png' alt='' width={30} height={30} />
          </li>
          <li onClick={handleDisplayRuller} className="flex justify-center cursor-pointer mb-5">
               <Image className="cursor-pointer" src='/assets/images/Ruller.png' alt='' width={30} height={30} />
			</li>
		</ul>
  );
}

export default Sidebar
