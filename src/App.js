import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import ReviewManagement from "./pages/Admin/ReviewManagement";
import Settings from "./pages/Admin/Settings";
import "./styles.css";

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const user = JSON.parse(localStorage.getItem("user"));

  const ProtectedAdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Header setShowAuthModal={setShowAuthModal} setAuthTab={setAuthTab} />
      {showAuthModal && (
        <Auth setShowAuthModal={setShowAuthModal} initialTab={authTab} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
