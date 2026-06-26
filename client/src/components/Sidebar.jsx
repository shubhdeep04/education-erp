import { Link } from "react-router-dom"

export default function Sidebar() {

  return (

    <div style={styles.sidebar}>


      <h2 style={styles.logo}>
        Education ERP
      </h2>



      <Link to="/" style={styles.menu}>
        Home
      </Link>



      <Link to="/about" style={styles.menu}>
        About
      </Link>



      {/* <Link
        to="/admin-dashboard"
        style={styles.menu}
      >
        Admin Panel
      </Link>
      
      <Link
       to="/student-dashboard"
        style={styles.menu}
>
         Student Panel
      </Link> */}



      <Link to="/login" style={styles.menu}>
        Login
      </Link>

    </div>

  )

}



const styles = {

  sidebar: {

    width: "240px",

    minHeight: "100vh",

    backgroundColor: "#111827",

    padding: "30px",

    position: "fixed",

    left: "0",

    top: "0"

  },

  logo: {

    color: "white",

    marginBottom: "40px",

    textAlign: "center"

  },

  menu: {

    display: "block",

    padding: "15px",

    marginBottom: "15px",

    backgroundColor: "#1f2937",

    color: "white",

    textDecoration: "none",

    borderRadius: "8px"

  }

}