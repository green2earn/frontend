import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
	targetCount: number;
}

const CounterUp: React.FC<Props> = ({ targetCount }) => {
	const { ref, inView } = useInView({
		threshold: 0.1,
	});
	const [count, setCount] = useState(0);

	useEffect(() => {
		let currentCount = 0;

		if (inView) {
			const intervalId = setInterval(() => {
				currentCount += 5;
				setCount(currentCount);

				if (currentCount === targetCount) {
					clearInterval(intervalId);
				}
			}, 50);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [inView, targetCount]);
	return (
		<div ref={ref}>
			<AnimatePresence>
				{inView && (
					<motion.p
						className="text-[40px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{count} +
					</motion.p>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CounterUp;
