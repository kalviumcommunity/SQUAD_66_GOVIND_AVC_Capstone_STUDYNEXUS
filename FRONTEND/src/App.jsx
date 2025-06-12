import React from 'react'
import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'





const App = () => {
  return (
    <>
        <Toaster position='top-center' reverseOrder={false} />
        <Router>
            <Routes>
                <Route  path='/login' element={<Login/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App