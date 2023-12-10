import LeaveCard from '@/components/LeafCard';
import LeafDeskop from '@/components/LeafDeskop';
import LeafDeskopL from '@/components/LeafDeskopL';
import MemberCard from '@/components/MemberCard';
import Footer from '@/components/home/Footer';
import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';

import React from 'react'

const AboutUs = () => {
    return (
		<div className=" w-screen scrollbar-hide ">
			<div className="relative w-full h-[812px] lg:hidden background-image_mb  overflow-y-scroll scrollbar-hide">
				<motion.h1
					initial={{ x: -500 }}
					animate={{ x: 0 }}
					transition={{ delay: 1, type: "spring", stiffness: 120 }}
					className=" absolute w-full text-center top-[20%] leading-[43.76px] font-[600] text-white text-[36px]"
				>
					AboutGreen2Earn
				</motion.h1>
				<div className=" absolute bottom-[20%] lg:hidden flex-center left-[50%] translate-x-[-50%] flex-col justify-center">
					<div className=" w-[40px] h-[60px] lg:hidden rounded-[20px] border-[4px] flex justify-center pt-3 border-white ">
						<span className="w-[3px] h-[14px] bg-white "></span>
					</div>
					<p className=" lg:hidden text-[12px] text-white font-[400] tracking-tight py-[8px]">
						Scroll down
					</p>
					<div className="mt-[10px] lg:hidden">
						<span className="span"></span>
						<span className="span span2"></span>
						<span className="span span3"></span>
					</div>
				</div>
            </div>
            <div className="relative w-full hidden lg:inline-block h-[980px]  background-image_deskop  overflow-y-scroll scrollbar-hide">
				<motion.h1
					initial={{ x: -1500 }}
					animate={{ x: 0 }}
					transition={{ delay: .5, type: "spring", stiffness: 120 }}
					className=" absolute w-full text-center top-[20%] leading-[43.76px] font-[600] text-white text-[36px]"
				>
					AboutGreen2Earn
				</motion.h1>
            </div>
			<div className="mt-[50px] w-full  ">
				<h2 className="h-[44px] w-full text-[36px] lg:hidden font-[600] text-center mb-[40px] text-[#09A507]">
					Green2Earn <span className="text-[#323232]">Team</span>
				</h2>
				<div className="grid lg:hidden grid-cols-1 grid-rows-1 mx-[20px] ">
					<MemberCard />
                </div>
                
                
			</div>
			<div className="mt-[50px] ">
				<h2 className="h-[44px] w-full text-[36px] font-[600] text-center mb-[40px] text-[black]">
					Road map
				</h2>
				<div className="grid lg:hidden grid-cols-1 grid-rows-1 mx-[20px]">
					{[1, 2, 3, 4, 5].map((i) => (
						<LeaveCard key={i} />))}
				</div>
				<div className=" hidden lg:inline-flex flex-center justify-center">
					<div className='relative hidden lg:block  h-[1757px] w-[1568px] '>
						<Image src='/assets/images/treeRm1.png' alt='' fill />
					<div className=" absolute bottom-[8%] left-[50%] translate-x-[-50%] hidden lg:inline-flex gap-5 ">
					    <MemberCard />
					</div>
					<div className='absolute top-[555px] w-[536.5px] left-[50%] translate-x-[-50%] rotate-[-180deg] '>
					   <LeafDeskop />
					</div>
					<div className='absolute h-[240px] w-[549px]  top-[-50px] left-[50px]  '>
							<LeafDeskopL />
						</div>
					 <div className='absolute h-[240px] w-[549px] left-[70px]  top-[236px]  '>
							<LeafDeskopL />	
						</div> 
						<div className='absolute  h-[240px] w-[549px] left-[800px]  top-[299px] rotate-[-180deg] '>
					   <LeafDeskop />
						</div>	
						<div className='absolute h-[240px] w-[450px] left-[900px]  top-[50px] rotate-[-180deg] '>
							<LeafDeskop />
						</div>	
					<div className='absolute w-[521px] text-center text-[#09A507] leading-[57px] text-[60px] font-[600] bg-white z-1 h-[57px] top-[1053px] left-[50%] translate-x-[-50%] '>
						Green2Earn <span className='text-black'>Team</span>
					</div>	
					</div>
					 
				</div>
            </div>
            <Footer />
		</div>
	);
}

export default AboutUs
AboutUs.Layout = MainLayout;