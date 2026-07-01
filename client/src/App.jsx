
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

// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";
// import SuperAdminDashboard from "./pages/SuperAdminDashboard"

// // Routes mein add karo:


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


// <Route path="/admin" element={<AdminDashboard />} />



// <Route
//   path="/super-admin/dashboard"
//   element={<SuperAdminDashboard />}
// />





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




import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard"

import "./styles/global.css";

// Wrapper to conditionally hide the public Navbar on Super Admin routes
// (Super Admin Dashboard has its own self-contained sidebar/UI, so the
// global Navbar should never render on top of it — this fixes overlap).
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/super-admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/super-admin/dashboard"
          element={<SuperAdminDashboard />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />
        <Route
          path="/teacher-dashboard"
          element={<TeacherDashboard />}
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;