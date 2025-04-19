import React from 'react'

const Footer = () => {
  return (
    <div className='bg-purple-500 flex justify-center items-center gap-5  w-full h-11 py-3'>

    <div className="logo font-bold text-xl text-white">
            <span className='text-green-800'> &lt;</span>
            Safe
            <span className='text-green-900'>Pass/&gt;</span>
        </div>

    <div className='flex items-center text-white text-l mt-1'>
     Engineered for simplicity 
     <lord-icon
        src="https://cdn.lordicon.com/pvibmvxz.json"
        trigger="loop">
    </lord-icon>
    by Aparmit
    </div>

    </div>
  )
}

export default Footer
