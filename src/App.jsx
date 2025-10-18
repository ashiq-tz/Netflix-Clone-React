import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

import { ToastContainer, toast } from 'react-toastify';

import { ListContext,ListProvider } from './context/ListContext'


import { lazy,Suspense } from 'react'

const MyWatchlist = lazy(()=>import('./pages/myWatchlist/myWatchlist'))

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("Logged In - success")
        navigate('/')
      }else{
        console.log("Logged Out")
        navigate('/login')
      }
    })
  },[])

  return (
    <div>
      
      <ToastContainer theme='dark'/>
      <ListProvider>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
       
         <Route path='/myWatchlist' element={<MyWatchlist />} />  
         
      </Routes>
      </Suspense>
      
      </ListProvider>
    </div>
  )
}

export default App
