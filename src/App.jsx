import React from 'react'
import Home from './assets/pages/Home/Home'
import BlogList from './assets/pages/BlogList/BlogList'
import Service from './assets/pages/Service/Service'
import { Route, Routes } from 'react-router-dom'
import BlogDetails from './assets/pages/BlogDetails/BlogDetails'
import Account from './assets/pages/Account/Account'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/Dashboard/Dashboard'
import AllBlogs from './admin/pages/BlogManager/AllBlogs'
import EditBlog from './admin/pages/BlogManager/EditBlogs'
import DeleteBlog from './admin/pages/BlogManager/DeleteBlog'
import CreateBlog from './admin/pages/BlogManager/CreateBlog'
import Appointments from './admin/components/Appointments/Appointments'
import AdminLogin from './admin/pages/Admin-login/AdminLogin'
import ProtectedRoute from './ProtectedRoute'


const App = () => {
  return (
    <div>
      <Routes>
        {/* Pblic Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment-booking-page/services' element={<Service/>}/>
        <Route path='/appointment-booking-page/blogs' element={<BlogList/>}/>
        <Route path='/appointment-booking-page/blogs/:slug' element={<BlogDetails/>}/>
        <Route path='/appointment-booking-page/account' element={<Account/>}/>
        {/* <Route path="*" element={<h1>Fallback Route</h1>} /> */}

        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" 
        element={<ProtectedRoute> <AdminLayout /></ProtectedRoute>}>

          <Route index element={<AdminDashboard />} />
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path='edit-blogs/:slug' element={<EditBlog/>}/>
          <Route path='delete-blog/:slug' element={<DeleteBlog/>}/>
          <Route path='create-blog/' element={<CreateBlog />}/>
          <Route path='appointments' element={<Appointments/>}/>
        </Route>
        
      </Routes>
    </div>
  )
}

export default App
