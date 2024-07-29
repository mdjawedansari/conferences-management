import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AllUSers from "./components/AllUSers";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* <Route path="/admin" element={<ProtectedRoute />} > */}
              <Route path="/admin" element={<AllUSers />} />
              {/* </Route> */}

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
