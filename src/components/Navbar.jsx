

import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

  const openGitHub = () => {
    toast.info("Redirecting to GitHub Profile...", {
      position: "top-right",
      autoClose: 1500,  // The toast will disappear in 1.5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      onClose: () => window.open("https://github.com/AparmitSrivastava", "_blank")
    });
  };

  return (
  <nav className='bg-purple-600 text-white'>

    <div className='mycontainer flex justify-between items-center px-10 py-5 h-16'>

        <div className="logo font-bold text-2xl text-white">
            <span className='text-green-800'> &lt;</span>
            Safe
            <span className='text-green-900'>Pass/&gt;</span>
        </div>

          
          <button className='flex justify-between items-center gap-3 bg-purple-200 rounded-2xl p-1 border-3 border-black'onClick={openGitHub}>
            <img src="public/icons/github.svg" alt="" className='w-8' />
            <span className='font-bold text-green-700'>GitHub</span>
          </button>


    </div>
  </nav>
  )
}

export default Navbar

