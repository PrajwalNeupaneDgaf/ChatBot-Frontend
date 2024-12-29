import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import NewChat from './Components/NewChat'
import Redirect from './Components/Redirect'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:id" element={<Home />} />
        <Route path="/new-chats" element={<NewChat />} />
        <Route path="/" element={<Redirect/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App