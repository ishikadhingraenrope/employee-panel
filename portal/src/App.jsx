import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Login from "./components/login";
import Leaves from "./components/Leaves";
import DailyReport from "./components/DailyReport";
function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<Login />} />

      {/* Dashboard layout routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/employee" element={<h2>Manage Employee Page</h2>} />
        <Route path="/settings" element={<h2>Employee Settings Page</h2>} />
        <Route path="/attendance" element={<h2>Manage Attendance Page</h2>} /> */}
        <Route path="/dailyReport" element={<DailyReport/>} />
        <Route path="/leaves" element={<Leaves/>} />
      </Route>
    </Routes>
  );
}

export default App;
