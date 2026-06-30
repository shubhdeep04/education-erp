
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Courses from "./pages/Courses";
// import Services from "./pages/Services";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register" 

// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";


// import "./styles/global.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route
//           path="/"
//           element={<Home />}
//         />

//         <Route
//           path="/about"
//           element={<About />}
//         />

//         <Route
//           path="/courses"
//           element={<Courses />}
//         />

//         <Route
//           path="/services"
//           element={<Services />}
//         />

//         <Route
//           path="/gallery"
//           element={<Gallery />}
//         />

//         <Route
//           path="/contact"
//           element={<Contact />}
//         />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/admin-dashboard"
//           element={<AdminDashboard />}
//         />

//         <Route
//           path="/student-dashboard"
//           element={<StudentDashboard />}
//         />
//         <Route
//           path="/teacher-dashboard"
//             element={<TeacherDashboard />}
//             />
        
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"  // ✅ new

import Home            from "./pages/Home"
import About           from "./pages/About"
import Courses         from "./pages/Courses"
import Services        from "./pages/Services"
import Gallery         from "./pages/Gallery"
import Contact         from "./pages/Contact"
import Login           from "./pages/Login"
import Register        from "./pages/Register"

import AdminDashboard   from "./pages/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"

import "./styles/global.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/"        element={<Home />}     />
        <Route path="/about"   element={<About />}    />
        <Route path="/courses" element={<Courses />}  />
        <Route path="/services"element={<Services />} />
        <Route path="/gallery" element={<Gallery />}  />
        <Route path="/contact" element={<Contact />}  />
        <Route path="/login"   element={<Login />}    />
        <Route path="/register"element={<Register />} />

        {/* ── Protected Routes ── */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App