import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";
import { wrap } from "@popmotion/popcorn";



const FeaturedItem = () => {
    const images = [
		{ index: 0, url: "/assets/images/anh4.jpeg",title:'Jackery Explore 2000 PLus Solor Generator',origPrice:'3,450.000', salePrice: '3,150.000'},
		{ index: 1, url: "/assets/images/anh5.jpeg",title:'Jackery Explore 2000 PLus Solor Generator',origPrice:'3,450.000', salePrice: '3,150.000' },
		{ index: 2, url: "/assets/images/anh6.jpeg",title:'Jackery Explore 2000 PLus Solor Generator',origPrice:'3,450.000', salePrice: '3,150.000' },
    ];
	const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);



  return (
		<div className="w-[60%] pl-[20px]  pb-[25px] mr-[20px] ">
			<div className="flex-center justify-between">
				<h2 className="text-[#1b3d5d] uppercase text-[1.6rem] font-[300]">
					FEATURED DEALS
				</h2>
				<div className="flex-center w-[20%] justify-between ">
					<div  className="flex-center bg-[#c2c2c2] cursor-pointer text-[#1b3d5d] border px-[10px] py-1 rounded-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="3.5"
							stroke="currentColor"
							className="w-4 h-4 "
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
						<small>Prev</small>
					</div>
					<div  className="flex-center px-[10px] py-1 rounded-sm bg-[#c2c2c2] text-[#1b3d5d] cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="3.5"
							stroke="currentColor"
							className="w-4 h-4 "
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
						<small>Next</small>
					</div>
				</div>
		  </div>
		  <div className="flex w-full overflow-x-hidden">
		  <AnimatePresence initial={false}>
			  <motion.div
				  key={activeIndex} className ="mt-[10px] border  w-full  overflow-hidden ">

			  <h3 className="text-[1.1rem] capitalize font-[500] min-h-[60px] text-[#1b3d5d] hover:text-[#00bce3]">
					<Link href="/">
						{images[activeIndex].title}
					</Link>
			  </h3>
			  
				  <div
					  className="h-[250px] flex w-full">
					<div className="relative h-[230px] w-1/2 ">
						<Image
							layout="fill"
							alt=""
							src={images[activeIndex].url}
						/>
					</div>
					<div className="w-1/2 h-[230px]  flex ml-[10%] flex-col justify-center">
						<h6 className="text-[#5f5f5f] line-through text-[18px] font-[300]">
							Reg.Price :VND {images[activeIndex].origPrice}
						</h6>
						<h4 className="text-[22px]">
							Sale Price:{" "}
							<span className="text-red-600"> VND {images[activeIndex].salePrice}</span>
						</h4>
						<div className="flex-center text-white cursor-pointer justify-center py-1 mt-[20px] rounded-[3px] bg-static  w-[80%]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
								/>
							</svg>
							<span className="uppercase text-[18px]">
								Add To Cart
							</span>
						</div>
						<div className="flex-center bg-[#e7e7e7] hover:bg-[#c8c6c6] text-[#1b3d5d] text-[18px] font-bold w-[50%] border mt-[20px] py-1 justify-center">
							<Link className="flex-center" href="/">
								<span>MORE INFO</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="3.5"
									stroke="currentColor"
									className="w-4 h-4 ml-4"
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
				<div>
					<p className="mt-[20px] text-[14px] max-h-[80px]  overflow-hidden">
						Introducing the world's first portable home battery with
						an expandable ecosystem for home backup, smart energy
						management, lower energy bills, and more. The EcoFlow
						DELTA Pro is the next leap in portable power technology,
						offering you power security and independence, wherever
						you are. Includes the EV X-Stream Adapter for EV
						Charging Station compatibility and the portable Remote
						Control; ideal for storing your Delta Pro in the garage,
						storage bay, or below deck. Connect over Bluetooth or an
						ethernet cable and get a second screen right where you
						need it.
					</p>
				</div>
			  <div>
			  </div>
			  </motion.div>
			  </AnimatePresence>
			  </div>
		</div>
  );
}

export default FeaturedItem
