/*eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {FaGoogle, FaSlash} from "react-icons/fa";
import {Eye,EyeOff} from "lucide-react";
import toast from "react-hot-toast"
import axios from 'axios';
import { Link,Navigate,useNavigate } from 'react-router-dom';



const Login = () => {
  
  const navigate=useNavigate()

  const [showPassword,setShowPassword]=useState(false)

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [errors,setErrors]=useState({});
  const[loading,setLoading]=useState(false)




  const handleEmailchange=(e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const newErrors={}
    if(!email.trim()){
      newErrors.email="Email is required"
    }
    if(!password.trim()){
      newErrors.password="Password is required"
    }
    if(Object.keys(newErrors).length>0){
      setErrors(newErrors);
      return
    }

    // if(!email || !password){
    //   alert("Please enter both email and password and try again")
    //   return
    // }
    setLoading(true)

    try{
      const response=await fetch("http://localhost:4500/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password})
      })
      
      const res=await response.json()
      console.log(res)

      if(res.success){
        // localStorage.setItem("token",res.token)
        setEmail("")
        setPassword("")
        setErrors({})
        toast.success("Login successfull")
        navigate('/home')
        
      }
      else{
        toast.error(res.message || "Login failed")
      }

    }
    catch(err){
      toast.error("Server error . Please try later")
      console.log(err)
    }
    finally{
      setLoading(false)
    }

  }

    // setTimeout(() => {
    //   setLoading(false);
    //   toast.success("Login successfull")
    //   // alert("Login initiated")
    // },2500);


    // alert("Submitted")
  


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
  
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden h-[80vh]">
  
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {/* ✅ StudyNexus Title inside box */}
          <h1 className="text-3xl font-bold text-blue-700 ">StudyNexus</h1>
  
          <h2 className="text-2xl font-bold mt-8 mb-4">Welcome back!</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email / Userid</label>
            <input type="email" value={email} onChange={handleEmailchange} placeholder="Enter your email / Userid" className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-blue-500" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
  
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
  
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 text-sm">Forgot password?</a>
          </div>
  
          <button
                // onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-2 rounded-lg transition text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                {loading ? (
                      <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                Signing in...
                </span>
                ) : (
                "Sign in →"
                )}
          </button>
        </form>
  
          <div className="my-4 text-center text-gray-500">Or continue with</div>
  
          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100">
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </button>
  
          <p className="mt-4 text-center text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-medium">Sign up</Link>
          </p>
        </div>
  
        {/* Right - Quote Section */}
        <div className="w-1/2 bg-blue-600 text-white flex items-center justify-center rounded-r-xl relative">
          <div className="absolute inset-0 bg-black/20 rounded-r-xl"></div> {/* Optional dark overlay */}
            <div className="relative z-10 text-center px-6">
            <p className="text-xl font-semibold">"Education is not preparation for life ;<br /> Education is life itself."</p>
            <p className="mt-2">— John Dewey</p>
          </div>
        </div>

      </div>
    </div>
  );

}

export default Login