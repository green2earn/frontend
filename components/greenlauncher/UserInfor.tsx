import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Summary from "./Summary";
 interface Iprops {
     setNextToInfo: React.Dispatch<React.SetStateAction<boolean>>;
     setNextToPin: React.Dispatch<React.SetStateAction<boolean>>;
     setNext: React.Dispatch<React.SetStateAction<boolean>>;
     setDoneStep5: React.Dispatch<React.SetStateAction<boolean>>;
     setDoneStep4:React.Dispatch<React.SetStateAction<boolean>>;
 }

const UserInfor = (props:Iprops) => {
    const [firstName, setFirstName] = useState('')
    const [familyName, setFamilyName] = useState('')
    const[isLoading,setIsLoading] =useState(false)
    const [email, setEmail] = useState('')
    const [showResult, setShowResult] = useState(false)
    const[showUserInfo,setShowUserInfo] = useState(true)
    const handleBack = () => {
        props.setDoneStep4(false)
        props.setNextToInfo(false)
        props.setNextToPin(true)
        props.setNext(true)
    }
    const handleNext = () => {
        props.setDoneStep5(true)
        setShowUserInfo(false)
        setIsLoading(true)

         setTimeout(() => {
             setIsLoading(false);
             setShowResult(true)
		}, 3000);
    }
 
    return (
        <div className="h-full w-full text-black border flex-col flex-center justify-center">
            {isLoading && (
                <div className="w-full h-full flex-center justify-center flex-col">
                    <Image
                        src="/assets/images/Loading.gif"
                        width={300}
                        height={300}
                        alt=""
                    />
                    <h2 className="text-[46px] text-white">Caculating...</h2>
                </div>
            )}
                 
           
            {showResult && (
                <Summary />
            )}
            {showUserInfo && (
                
                <div className="h-full w-full text-black border flex-col flex-center justify-center">
                <div className=" w-[40%] border p-[24px] bg-white rounded-[16px]">
                    <h2 className="text-center text-[24px] text-[#09A507]">
                        My Contact Information
                    </h2>
                    <div className="w-[100%] h-[40px] border flex-center px-2 leading-[40px] my-[20px] rounded-[16px] relative">
                        <span className="absolute top-[-10px] font-[300]  left-[15px] text-[13px] bg-white leading-[17px] text-[#525252]">
                            First Name
                        </span>
                        <input
                            onChange={(e)=>setFirstName(e.target.value)}
                            value={firstName}
                            type="text"
                            className="h-[90%] w-[90%] text-[14px] outline-none"
                        />
                    </div>
                    <div className="w-[100%] h-[40px] border flex-center px-2 leading-[40px] my-[20px] rounded-[16px] relative">
                        <span className="absolute top-[-10px] font-[300]  left-[15px] text-[13px] bg-white leading-[17px] text-[#525252]">
                            Family Name
                        </span>
                        <input
                              onChange={(e)=>setFamilyName(e.target.value)}
                              value={familyName}
                            type="text"
                            className="h-[90%] w-[90%] text-[14px] outline-none"
                        />
                    </div>
                    <div className="w-[100%] h-[40px] border flex-center px-2 leading-[40px] my-[20px] rounded-[16px] relative">
                        <span className="absolute top-[-10px] font-[300]  left-[15px] text-[13px] bg-white leading-[17px] text-[#525252]">
                            Email
                        </span>
                        <input
                              onChange={(e)=>setEmail(e.target.value)}
                              value={email}
                            type="text"
                            className="h-[90%] text-[14px] w-[90%] outline-none"
                        />
                    </div>
                    <div className="w-[100%] h-[40px] border flex-center px-2 leading-[40px] my-[20px] rounded-[16px] relative">
                        <span className="absolute top-[-10px] font-[300]  left-[15px] text-[13px] bg-white leading-[17px] text-[#525252]">
                            Phone Number
                        </span>
                        <input className="h-[90%] w-[90%] outline-none" />
                    </div>
                </div>
                {firstName != "" && familyName != "" && email != "" ? (
                    <div onClick={handleNext} className="w-[50%] h-[40px] text-[15px] bg-[#f5ce30] text-center cursor-pointer rounded-[8px]  leading-[40px] mt-[30px]">
                        Continue
                    </div>
                ) : (
                    <div  className="w-[50%] h-[40px] text-[15px] bg-[#fff3c3] text-center cursor-text rounded-[8px] text-[#b1b2b2] leading-[40px] mt-[30px]">
                        Continue
                    </div>
                )}
                <div onClick={handleBack} className="w-[50%] h-[40px] bg-[#e5e7eb] text-center cursor-pointer text-[15px] rounded-[8px] mt-[20px] leading-[40px]">
                    Back
                    </div>
                 </div>  
            )}
           
		</div>
	);
}

export default UserInfor
