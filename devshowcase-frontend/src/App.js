import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import PortfolioPage from "./pages/PortfolioPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Public Pages (NO Navbar) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Pages WITH Navbar */}
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <DashboardPage />
          </>
        }
      />

      <Route
        path="/portfolio/:email"
        element={
          <>
            <Navbar />
            <PortfolioPage />
          </>
        }
      />

      <Route
        path="/profile"
        element={
          <>
            <Navbar />
            <ProfilePage />
          </>
        }
      />
    </Routes>
  );
}

export default App;
