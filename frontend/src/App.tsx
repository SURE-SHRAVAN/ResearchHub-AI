import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import SearchPapers from "./pages/searchpapers";
import Register from "./pages/register";
import UploadPDF from "./pages/uploadfiles";



function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
         <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchPapers />} />
        <Route path="/upload" element={<UploadPDF />} />
    
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
