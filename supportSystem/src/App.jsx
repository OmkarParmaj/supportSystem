import React, { useState } from "react";
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Sidebar from "./Components/Sidebar";
import RiseTicket from "./Components/RiseTicket";
import TechSupportSidebar from "./Components/TechSupportSidebar";
import ResolveTicket from "./Components/ResolveTicket";
import TechSupportDashboard from "./Components/TechSupportDashboard";
import Clientticket from "./Components/Clientticket";
import Seeticket from "./Components/Seeticket";
import AdminSidebar from "./Components/AdminSidebar";
import AdminDashboard from "./Components/AdminDashboard";
import AdminclientTicket from "./Components/AdminclientTicket";


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
     <BrowserRouter>
     
     <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>
      <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Dashboard>}></Route>
      <Route path="/sidebar" element={<Sidebar></Sidebar>}></Route>
      <Route path="/riseticket" element={<RiseTicket isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></RiseTicket>}></Route>
      <Route path="/techsupportsidebar" element={<TechSupportSidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></TechSupportSidebar>}></Route>
      <Route path="/resolveticket" element={<ResolveTicket isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></ResolveTicket>}></Route>
      <Route path="/techsupportdashboard" element={<TechSupportDashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></TechSupportDashboard>}></Route>
      <Route path="/clientticket/:id" element={<Clientticket isLoggedIn={isLoggedIn} setIsLogginedIn={setIsLoggedIn}></Clientticket>}></Route>
      <Route path="/seeticket/:id"  element={<Seeticket isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Seeticket>}></Route>
      <Route path="/adminsidebar" element={<AdminSidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></AdminSidebar>}></Route>
      <Route path="/admindashboard" element={<AdminDashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></AdminDashboard>}></Route>
      <Route path="/adminclientticket/:id" element={<AdminclientTicket isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></AdminclientTicket>}></Route>
     </Routes>
    
     
     </BrowserRouter>
    
    </>
  )
}

export default App
