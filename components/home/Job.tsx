import Link from "next/link";

const Job = () => {
	return (
		<div className="w-[95%] rounded-xl z-[50] px-[40px] text-white flex-center flex-col text-center justify-center h-[326px] bg-job-custom">
			<h3 className="text-[30px]">Join Us!</h3>
			<p className="my-[30px]">
				We're growing fast and are looking for more talent to add to our
				team
			</p>
			<div className="border px-4 py-2 rounded-[20px] text-[#09A507] bg-white">
				<Link href="">
					<span>SEE OPEN OPPORTUNITIES</span>
				</Link>
			</div>
		</div>
	);
};

export default Job;
