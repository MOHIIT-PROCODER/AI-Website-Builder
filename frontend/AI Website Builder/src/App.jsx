import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import { Contact } from 'lucide-react'


const App = () => {
  return (
     
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
     <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/features' element={<Features/>}/>
       <Route path='/contact' element={<Contact/>}/>
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
