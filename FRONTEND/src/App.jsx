import React from 'react'
import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import Signup from './pages/Signup'
import Home from './pages/Home'





const App = () => {
  return (
    <>
        <Toaster position='top-center' reverseOrder={false} />
        <Router>
            <Routes>
                <Route  path='/' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App