import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

// Public Pages
import Layout from "./pages/Layout"
import Hero from "./pages/Hero"
import About from "./pages/About"
import Department from "./pages/department/Department"
import Gallery from "./pages/Gallery"
import AddForm from "./pages/AddForm"
import Contact from "./pages/Contact"
import PhotoSport from "./pages/department/PhotoSport"
import PhotoMusic from "./pages/department/PhotoMusic"
import PhotoClasses from "./pages/department/PhotoClasses"
import PhotoNcc from "./pages/department/PhotoNcc"

// Admin Pages & Protected
import AdminLayout from "./admin/AdminLayout"
import AdminProfile from "./admin/AdminProfile"
import ClearkRegister from "./admin/ClearkRegister"
import FunctionForm from "./admin/FunctionForm"
import DepartmentForm from "./admin/DepartmentForm"
import StaffForm from "./admin/StaffForm"
import AllDepartmentL from "./admin/AllDepartmentL"
import FunctionList from "./admin/FunctionList"
import StaffList from "./admin/StaffList"
import AllCleark from "./admin/AllCleark"
import GalleryList from "./admin/GalleryList"
import AdminLogin from "./admin/AdminLogin"
import AdminProtected from "./midllware/AdminProtected"

// Cleark Pages & Protected
import ClearkLayout from "./cleark/ClearkLayout"
import ClearkProfile from "./cleark/ClearkProfile"
import AddStud from "./cleark/AddStud"
import StudentLinst from "./cleark/StudentLinst"
import ClearkLogin from "./cleark/ClearkLogin"
import ClearkProtected from "./midllware/ClearkProtected"
import SchoolStaff from "./pages/SchoolStaff"
import AddGalleryForm from "./admin/AddGalleryForm"

// NotFound fallback
const NotFound = () => <h1 className="text-center mt-10 text-2xl font-bold">Page Not Found</h1>

const App = () => {
  return <>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="p-2"
        toastClassName="bg-white shadow-lg border-l-4 border-green-500 rounded-xl text-gray-800 font-medium"
        bodyClassName="text-sm"
      />


      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="about" element={<About />} />
          <Route path="department" element={<Department />} />
          <Route path="staff" element={<SchoolStaff />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="add" element={<AddForm />} />
          <Route path="contact" element={<Contact />} />
          <Route path="photosport" element={<PhotoSport />} />
          <Route path="photomusic" element={<PhotoMusic />} />
          <Route path="photoncc" element={<PhotoNcc />} />
          <Route path="photoclass" element={<PhotoClasses />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminProtected compo={<AdminLayout />} />}>
          <Route index element={<AdminProfile />} />
          <Route path="cleark-register" element={<ClearkRegister />} />
          <Route path="function-form" element={<FunctionForm />} />
          <Route path="department-form" element={<DepartmentForm />} />
          <Route path="staff-form" element={<StaffForm />} />
          <Route path="department-list" element={<AllDepartmentL />} />
          <Route path="function-list" element={<FunctionList />} />
          <Route path="staff-list" element={<StaffList />} />
          <Route path="cleark-list" element={<AllCleark />} />
          <Route path="gallery-list" element={<GalleryList />} />
          <Route path="gallery-add" element={<AddGalleryForm />} />
        </Route>

        {/* Cleark Protected Routes */}
        <Route path="/cleark" element={<ClearkProtected compo={<ClearkLayout />} />}>
          <Route index element={<ClearkProfile />} />
          <Route path="add-student" element={<AddStud />} />
          <Route path="student-list" element={<StudentLinst />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/cleark-login" element={<ClearkLogin />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
