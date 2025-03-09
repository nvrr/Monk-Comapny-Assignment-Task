import { useEffect, useState } from "react";
import EligibilityRules from "../components/EligibilityRules";
import './HomePage.css'
import { Link } from "react-router-dom";

export default function HomePage() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      setTimeout(() => setShowContent(true), 1000); // Wait for the letter to open
    }, []);

  return (
    <div className='wrapper '>
    <div className={`letter-container ${showContent ? "show" : ""} bg-[#F1F2F4] min-w-screen min-h-screen py-10 px-52`} >
      
       <div className="letter-content p-4 text-sm mx-auto bg-white shadow-lg rounded-2xl   ">
       <h6 className='text-base font-semibold'>Rule</h6>
       <div className="m-7">
       <Link data-testid="next-link" to="/nextform" className="border border-1 px-3 py-2 " >Next Form Page</Link>
       </div>
      <div className='font-medium'>The offer will be triggered based on the rules in this section</div>
<div className='h-[1px] w-full bg-[#EBEBEB] my-3'></div>
<div className='font-medium '>Show offer if</div>

<EligibilityRules/>

      </div>
      </div>
    </div>
  );
}