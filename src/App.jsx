import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          token ? <Dashboard /> : <Navigate to="/auth/sign-in" replace />
        }
      />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
