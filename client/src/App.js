import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

// Temporary pages
import Folders from "./pages/Folders";
import Favorites from "./pages/Favorites";
import Recent from "./pages/Recent";
import Security from "./pages/Security";
import Generator from "./pages/Generator";
import DashboardLayout from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                < DashboardLayout/>
              </ProtectedRoute>
            }
          >
            <Route path="folders" element={<Folders />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="recent" element={<Recent />} />
            <Route path="security" element={<Security />} />
            <Route path="generator" element={<Generator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;