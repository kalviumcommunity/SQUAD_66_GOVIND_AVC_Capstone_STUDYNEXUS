import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200/80">StudyNexus Dashboard</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">Welcome back to your profile.</h1>
            <p className="mt-4 text-white/70">
              Your uploaded photo and profile information are displayed below for this module demo.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-blue-100 transition"
            >
              Logout
            </button>
            <Link
              to="/"
              className="px-5 py-3 rounded-xl border border-white/15 text-center text-white/90 hover:bg-white/10 transition"
            >
              Back to login
            </Link>
          </div>
        </div>

        {user ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                {user.photo ? (
                  <img src={user.photo} alt="Profile" className="h-28 w-28 rounded-full border-4 border-blue-400 object-cover" />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-400 bg-slate-800 text-3xl font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>

              <div className="grid gap-3 text-sm md:grid-cols-2 flex-1">
                <div><p className="text-slate-400">Name</p><p className="font-semibold text-white">{user.name || 'N/A'}</p></div>
                <div><p className="text-slate-400">User ID</p><p className="font-semibold text-white">{user.userid || 'N/A'}</p></div>
                <div><p className="text-slate-400">Email</p><p className="font-semibold text-white">{user.email || 'N/A'}</p></div>
                <div><p className="text-slate-400">Course</p><p className="font-semibold text-white">{user.course || 'N/A'}</p></div>
                <div><p className="text-slate-400">Year</p><p className="font-semibold text-white">{user.year || 'N/A'}</p></div>
                <div><p className="text-slate-400">Accommodation</p><p className="font-semibold text-white">{user.accomodation || 'N/A'}</p></div>
                <div><p className="text-slate-400">Phone</p><p className="font-semibold text-white">{user.number || 'N/A'}</p></div>
                <div><p className="text-slate-400">Hostel Details</p><p className="font-semibold text-white">{user.hostelDetails || 'N/A'}</p></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-6 text-center text-white/70">
            No profile data found. Please log in again.
          </div>
        )}
      </div>
    </div>
  )
}

export default Home