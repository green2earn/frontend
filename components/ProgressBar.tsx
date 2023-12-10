import React from "react";

interface ProgressBarProps {
	progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	return (
		<div className="w-full h-4 bg-gray-200 rounded-full">
			<div
				className="h-full text-center text-xs text-white bg-blue-500 rounded-full"
				style={{ width: `${progress}%` }}
			>
				{progress}%
			</div>
		</div>
	);
};
export default ProgressBar;
