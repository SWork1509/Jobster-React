import { Landing, Error, Dashboard, Register, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Toast imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddJobs, AllJobs, Profile, SharedLayout, Stats } from './pages/dashboard'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="landing" element={<Landing />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
