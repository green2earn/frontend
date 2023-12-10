import Link from "next/link";
import FeaturedItem from "./FeaturedItem"
import Image from "next/image";

const FeaturedProduct = () => {
    const images = [
		{ index: 0, url: "/assets/images/anh4.jpeg" },
		{ index: 1, url: "/assets/images/anh5.jpeg" },
		{ index: 2, url: "/assets/images/anh6.jpeg" },
	];
  return (
		<div className=" w-full  lg:px-[124px]">
			<div className="bg-white flex py-[20px]">
				<FeaturedItem />
              <div className="w-[40%] grid grid-rows-3 grid-cols-1 gap-y-4 ">
                  {images.map((i)=>(
                      <div key={i.index} className="h-[150px] p-[10px] border grid grid-cols-4 grid-rows-1">
                          <div className='col-span-1 row-span-1 relative '>
                              <Image fill src={i.url} alt='' />
                          </div>
                          <div className='col-span-3 ml-[10px] row-span-1'>
                              <p className="w-full h-[60%] ">Mango Power E Power Independence Package - With 800 Watts of Solar</p> 
                              <div className="h-[40%] w-full flex-center justify-between">
                                  <h5 >Only:<span className='text-red-600'>VND 1,500.000</span></h5>
                                  <div className='flex-center bg-[#e7e7e7] hover:bg-[#c8c6c6] text-[#1b3d5d] text-[14px] font-bold w-[35%] border  py-1 justify-center'>
                                  <Link className='flex-center' href="/">
								<span>MORE INFO</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="3.5"
									stroke="currentColor"
									className="w-4 h-4 ml-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</Link>
                                  </div>
                              </div>
                          </div>
                  </div>))}
                </div>
			</div>
		</div>
  );
}

export default FeaturedProduct
