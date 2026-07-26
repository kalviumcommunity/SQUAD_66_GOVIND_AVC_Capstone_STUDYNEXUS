import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200/80">StudyNexus</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">Welcome back to your study hub.</h1>
            <p className="mt-4 text-white/70 max-w-2xl">
              Your Vercel frontend is live and connected to the Render backend.
              From here you can continue building the dashboard, study groups, and collaboration flows.
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
      </div>
    </div>
  )
}

export default Home