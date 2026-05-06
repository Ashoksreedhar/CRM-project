import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registeration from './pages/Registeration'
import Login from './pages/Login'
import Dashboards from './pages/Dashboards'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registeration' element={<Registeration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboards />
        </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
