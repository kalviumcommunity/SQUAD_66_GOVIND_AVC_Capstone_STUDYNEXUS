// /* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import {
  BookOpen,
  User,
  Calendar,
  Phone,
  Mail,
  Building2,
  School,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import InputField from '../components/InputField';
import PasswordInput from '../components/PasswordInput';



const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    dob: '',
    phone: '',
    email: '',
    isHosteler: false,
    hostel: '',
    course: '',
    year: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    photo: '',
  });
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const navigate=useNavigate()


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setPhotoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    try{
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://squad-66-govind-avc-capstone-studynexus.onrender.com'
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('userid', formData.userId);
    submitData.append('dob', formData.dob);
    submitData.append('number', formData.phone);
    submitData.append('email', formData.email);
    submitData.append('accomodation', formData.isHosteler ? 'Hostel' : 'Day Scholar');
    submitData.append('hostelDetails', formData.isHosteler ? formData.hostel : '');
    submitData.append('course', formData.course);
    submitData.append('year', formData.year);
    submitData.append('password', formData.password);
    if (photoFile) {
      submitData.append('photo', photoFile);
    }

    const response=await fetch(`${apiBaseUrl}/api/auth/signup`,{
        method:'POST',
        body:submitData
    })
    const result=await response.json();

    if(!response.ok){
        throw new Error(result.message || 'Signup Failed')
    }

    toast.success('Account created successfully!');
    navigate('/');
    }
    catch(err){
        toast.error(err.message || 'Error creating account')
}
    // console.log(formData);
    // toast.success('Account created successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">StudyNexus</h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">Create your account</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <InputField
                id="name"
                label="Full Name"
                icon={<User />}
                value={formData.name}
                onChange={handleChange}
              />

              {/* User ID */}
              <InputField
                id="userId"
                label="User ID"
                value={formData.userId}
                onChange={handleChange}
              />

              {/* DOB */}
              <InputField
                id="dob"
                label="Date of Birth"
                type="date"
                icon={<Calendar />}
                value={formData.dob}
                onChange={handleChange}
              />

              {/* Phone */}
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                icon={<Phone />}
                value={formData.phone}
                onChange={handleChange}
              />

              {/* Email */}
              <InputField
                id="email"
                label="Email"
                type="email"
                icon={<Mail />}
                value={formData.email}
                onChange={handleChange}
              />

              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                  />
                )}
              </div>

              {/* Accommodation */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Accommodation</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="isHosteler"
                      checked={!formData.isHosteler}
                      onChange={() => setFormData((prev) => ({ ...prev, isHosteler: false, hostel: '' }))}
                    />
                    <span>Day Scholar</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="isHosteler"
                      checked={formData.isHosteler}
                      onChange={() => setFormData((prev) => ({ ...prev, isHosteler: true }))}
                    />
                    <span>Hosteler</span>
                  </label>
                </div>
              </div>

              {/* Hostel Name */}
              {formData.isHosteler && (
                <InputField
                  id="hostel"
                  label="Hostel Name"
                  icon={<Building2 />}
                  value={formData.hostel}
                  onChange={handleChange}
                />
              )}

              {/* Course */}
              <InputField
                id="course"
                label="Course"
                icon={<School />}
                value={formData.course}
                onChange={handleChange}
              />

              {/* Year Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="year">
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              {/* Password */}
              <PasswordInput
                id="password"
                label="Password"
                showPassword={showPassword}
                togglePassword={() => setShowPassword((prev) => !prev)}
                value={formData.password}
                onChange={handleChange}
              />

              {/* Confirm Password */}
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                showPassword={showPassword}
                togglePassword={() => setShowPassword((prev) => !prev)}
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {/* Terms & Privacy */}
              <div className="col-span-full">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="col-span-full">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Create Account
                </button>
              </div>

              {/* Sign-in Redirect */}
              <div className="col-span-full text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
// import React from 'react'
// import { useState,useEffect } from 'react';
// import {
//   BookOpen,
//   User,
//   Calendar,
//   Phone,
//   Mail,
//   Building2,
//   School,
//   Lock,
//   Eye,
//   EyeOff,
// } from 'lucide-react';
// import { FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
// import toast from 'react-hot-toast';




// const Signup = () => {

//   const [formData,setFormdata]=useState({
//     name:'',
//     userid: '',
//     dob: '',
//     number: '',
//     email: '',
//     accomodation: '',
//     hostelDetails: '',
//     course: '',
//     year: '',
//     password:''
//   })

//   const [showPassword,setShowPassword]=useState(false)
//   const[errors,seterrors]=useState(false)

//   const handleChange=(e)=>{
//   const {name,value}=e.target
//   setFormdata((prev)=>({
//     ...prev,[name]:value
//   }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//   };








//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-8">
//             <div className="flex items-center gap-2 mb-8">
//               <BookOpen className="h-8 w-8 text-indigo-600" />
//               <h1 className="text-2xl font-bold text-gray-800">StudyNexus</h1>
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-8">Create your account</h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Full Name */}
//               <InputField
//                 id="name"
//                 label="Full Name"
//                 icon={<User />}
//                 value={formData.name}
//                 onChange={handleChange}
//               />

//               {/* User ID */}
//               <InputField
//                 id="userId"
//                 label="User ID"
//                 value={formData.userId}
//                 onChange={handleChange}
//               />

//               {/* Date of Birth */}
//               <InputField
//                 id="dob"
//                 label="Date of Birth"
//                 type="date"
//                 icon={<Calendar />}
//                 value={formData.dob}
//                 onChange={handleChange}
//               />

//               {/* Phone Number */}
//               <InputField
//                 id="phone"
//                 label="Phone Number"
//                 type="tel"
//                 icon={<Phone />}
//                 value={formData.phone}
//                 onChange={handleChange}
//               />

//               {/* Email */}
//               <InputField
//                 id="email"
//                 label="Email"
//                 type="email"
//                 icon={<Mail />}
//                 value={formData.email}
//                 onChange={handleChange}
//               />

//               {/* Accommodation */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Accommodation</label>
//                 <div className="flex items-center gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="isHosteler"
//                       checked={!formData.isHosteler}
//                       onChange={() =>
//                         setFormData((prev) => ({ ...prev, isHosteler: false, hostel: '' }))
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span>Day Scholar</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="isHosteler"
//                       checked={formData.isHosteler}
//                       onChange={() =>
//                         setFormData((prev) => ({ ...prev, isHosteler: true }))
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span>Hosteler</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Hostel Input */}
//               {formData.isHosteler && (
//                 <InputField
//                   id="hostel"
//                   label="Hostel Name"
//                   icon={<Building2 />}
//                   value={formData.hostel}
//                   onChange={handleChange}
//                   required
//                 />
//               )}

//               {/* Course */}
//               <InputField
//                 id="course"
//                 label="Course"
//                 icon={<School />}
//                 value={formData.course}
//                 onChange={handleChange}
//               />

//               {/* Year Dropdown */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700" htmlFor="year">
//                   Year
//                 </label>
//                 <select
//                   id="year"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 >
//                   <option value="">Select Year</option>
//                   <option value="1">1st Year</option>
//                   <option value="2">2nd Year</option>
//                   <option value="3">3rd Year</option>
//                   <option value="4">4th Year</option>
//                 </select>
//               </div>

//               {/* Password */}
//               <PasswordInput
//                 id="password"
//                 label="Password"
//                 showPassword={showPassword}
//                 togglePassword={() => setShowPassword((prev) => !prev)}
//                 value={formData.password}
//                 onChange={handleChange}
//               />

//               {/* Confirm Password */}
//               <PasswordInput
//                 id="confirmPassword"
//                 label="Confirm Password"
//                 showPassword={showPassword}
//                 togglePassword={() => setShowPassword((prev) => !prev)}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />

//               {/* Terms & Conditions */}
//               <div className="col-span-full">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="agreeToTerms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     required
//                   />
//                   <span className="text-sm text-gray-600">
//                     I agree to the{' '}
//                     <a href="#" className="text-indigo-600 hover:text-indigo-500">
//                       Terms of Service
//                     </a>{' '}
//                     and{' '}
//                     <a href="#" className="text-indigo-600 hover:text-indigo-500">
//                       Privacy Policy
//                     </a>
//                   </span>
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <div className="col-span-full">
//                 <button
//                   type="submit"
//                   className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
//                 >
//                   Create Account
//                 </button>
//               </div>

//               {/* Sign-in Redirect */}
//               <div className="col-span-full text-center">
//                 <p className="text-sm text-gray-600">
//                   Already have an account?{' '}
//                   <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
//                     Sign in
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup