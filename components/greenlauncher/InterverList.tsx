import { useAppDispatch } from "@/stores/store"
import InverterCard from "./InverterCard"
import { activeDisplayInterverList } from "@/stores/activeButtonSlice"

const InterverList = () => {
    const dispatch = useAppDispatch()
  return (
    <div className="width-solar  border-l-[1px] h-[620px] overflow-scroll scrollbar-hide px-3 ">
          <div className=" h-[80px] flex-center justify-end relative px-7 border">
                <h1 className="text-[24px] absolute  text-green-600 left-1/2 translate-x-[-50%]">List of Inverter-related products.</h1>
              <svg  onClick={()=>dispatch(activeDisplayInterverList(false))}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6 cursor-pointer"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
          </div>
          <div className="grid grid-cols-3 gap-4 h-[540px]">
                  <InverterCard />
          </div>
      </div>
  )
}

export default InterverList
