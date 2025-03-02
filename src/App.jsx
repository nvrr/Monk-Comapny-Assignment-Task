

import EligibilityRules from './components/EligibilityRules';

function App() {
 
  return (
    <>
    <div className='bg-[#F1F2F4] min-w-screen min-h-screen py-10 px-52 '>
      
       <div className="p-4 text-sm mx-auto bg-white shadow-lg rounded-2xl   ">
       <h6 className='text-base font-semibold'>Rule</h6>
      <div className='font-medium'>The offer will be triggered based on the rules in this section</div>
<div className='h-[1px] w-full bg-[#EBEBEB] my-3'></div>
<div className='font-medium '>Show offer if</div>

<EligibilityRules/>

      </div>
      </div>
    </>
  )
}

export default App
