  // const savepassword = async() => {   //saving the pass in memory - working with useEffect
  //   if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

  //     // if id alrady presnt in the db then -- deleteit
  //      await fetch("http://localhost:3000/" , { method: "DELETE" , headers : {"Content-Type" : "application/json"} , body:JSON.stringify({id : form.id})})

  //     setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

  //     await fetch("http://localhost:3000/" , { method: "POST" , headers : {"Content-Type" : "application/json"} , body:JSON.stringify({ ...form, id: uuidv4() })})

  //     // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      
  //     // console.log([...passwordArray, form]);
      
  //     setform({ site: "", username: "", password: "" })   //after the details are saved the form clears automattically
      
  //     toast('🦄 Password Saved Successfully!', {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  //   else {
  //     toast.error('Error in saving!', {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       style: { backgroundColor: "rgba(211, 47, 47, 0.8)", color: "white" },
  //     });
  //   }

  // } 


  // IN THE ABOVE PROBLEM IS THAT AS I M ADDING A NEW PASS AND SAVING IT AND AFTER THIS WHEN I REFRESH THE PAGE THE PASS ON THE TOP OF THE TABLE GETS DLETED SO THE FIX IS BELOWW...





import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {
    // let req = await fetch("http://localhost:3000/")
    let req = await fetch("https://passwordmanager-mongo.onrender.com/")
    let passwords = await req.json();
    console.log(passwords);  // Check the data here
    setpasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, [])

  const showpassword = () => {
    if (ref.current.src.includes("public/icons/eyecross.png")) {
      ref.current.src = "public/icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "public/icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }

  const savepassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      let newPassword = { ...form, id: form.id || uuidv4() };

      if (form.id) {
        // await fetch("http://localhost:3000/", {
          await fetch("https://passwordmanager-mongo.onrender.com/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      // await fetch("http://localhost:3000/", {
        await fetch("https://passwordmanager-mongo.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      getPasswords();
      setform({ site: "", username: "", password: "" });

      toast('🦄 Password Saved Successfully!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      toast.error('Error: All inputs should have atleast 4 characters!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const deletepassword = async (id) => {
    let c = confirm("Do you really want to delete this password")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // let res = await fetch("http://localhost:3000/", {
        let res = await fetch("https://passwordmanager-mongo.onrender.com/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })

      toast('🦄 Password deleted Successfully!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  }

  const editpassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('🦄 Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#eeeeee_1px,transparent_1px),linear-gradient(to_bottom,#eeeeee_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_200px,#c0ffc0,transparent)]"></div>
      </div>

      <div className="mycontainer mx-auto px-10 lg:px-20 xl:px-40">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-800'> &lt;</span>
          Safe<span className='text-green-800'>Pass/&gt;</span>
        </h1>
        <p className='font-bold text-lg text-green-800 text-center'>Your Go to Password Manager</p>

        <div className="flex flex-col py-5 gap-3 items-center">
      
          <input
            onChange={handlechange}
            value={form.site}
            type="text"
            placeholder='Enter Website URL'
            name='site'
            id='1'
            className='rounded-full border-2 border-green-800 text-black w-full px-5 py-1 shadow-[0px_0px_20px_rgba(120,50,180,0.7)]'
          />

          <div className="flex flex-col md:flex-row justify-between text-black w-full gap-4">
         
            <input
              onChange={handlechange}
              value={form.username}
              type="text"
              placeholder="Enter your username"
              name="username"
              id="2"
              className="w-full md:w-1/2 mt-4 border-2 border-green-800 rounded-full text-black px-5 py-1 shadow-[0px_0px_20px_rgba(120,50,180,0.7)]"
            />

            <div className="relative w-full md:w-1/2">
              <input
                ref={passwordRef}
                onChange={handlechange}
                value={form.password}
                type="password"
                placeholder="Enter the PassWord"
                name="password"
                id="3"
                className="w-full mt-4 border-2 border-green-800 rounded-full text-black px-5 py-1 shadow-[0px_0px_20px_rgba(120,50,180,0.7)]"
              />
              <span className="absolute right-2 top-[21.5px]" onClick={showpassword}>
                <img
                  ref={ref}
                  className="mr-2 mt-[3px] hover:cursor-pointer"
                  width={20}
                  src="public/icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            className='flex justify-center items-center gap-2 px-6 py-2 mt-4 border-2 border-green-800 bg-green-400 rounded-full w-fit hover:bg-green-500 shadow-lg shadow-purple-500 hover:cursor-pointer'
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save PassWord
          </button>
        </div>

        <div className='passtable'>
          <h2 className='text-center pb-2 text-2xl font-bold'>Your PassWords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-xl overflow-hidden shadow-[10px_10px_20px_rgba(120,50,180,0.8)] mb-5">
                <thead className='bg-green-500 text-white'>
                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-purple-200'>
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className='py-1 text-center'>
                          <div className='flex items-center justify-center gap-2 pl-8'>
                            <a href={item.site} target='_blank'>{item.site}</a>
                            <div className='copyicon size-7' onClick={() => { copyText(item.site) }}>
                              <lord-icon
                                className="cursor-pointer"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                              </lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className='py-1 text-center'>
                          <div className='flex items-center justify-center gap-2 pl-8'>
                            <span>{item.username}</span>
                            <div className='copyicon size-7' onClick={() => { copyText(item.username) }}>
                              <lord-icon
                                className="cursor-pointer"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                              </lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className='py-1 text-center'>
                          <div className='flex items-center justify-center gap-2 pl-8'>
                            <span>{item.password}</span>
                            <div className='copyicon size-7' onClick={() => { copyText(item.password) }}>
                              <lord-icon
                                className="cursor-pointer"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                              </lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className='py-1 text-center'>
                          <span className='cursor-pointer mx-1' onClick={() => { editpassword(item.id) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              state="hover-line"
                              style={{ width: "20px", height: "20px" }}>
                            </lord-icon>
                          </span>
                          <span className='cursor-pointer mx-1' onClick={() => { deletepassword(item.id) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              state="hover-line"
                              style={{ width: "20px", height: "20px" }}>
                            </lord-icon>
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager