import React from 'react'
import Home from './assets/pages/Home/Home'
import BlogList from './assets/pages/BlogList/BlogList'
import Service from './assets/pages/Service/Service'
import { Route, Routes } from 'react-router-dom'
import BlogDetails from './assets/pages/BlogDetails/BlogDetails'
import Account from './assets/pages/Account/Account'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment-booking-page/services' element={<Service/>}/>
        <Route path='/appointment-booking-page/blogs' element={<BlogList/>}/>
        <Route path='/appointment-booking-page/blogs/:uid' element={<BlogDetails/>}/>
        <Route path='/appointment-booking-page/account' element={<Account/>}/>
        {/* <Route path="*" element={<h1>Fallback Route</h1>} /> */}
      </Routes>
    </div>
  )
}

export default App
