import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
import './Sidebar.css';

const AdminSidebar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
  

    
    useEffect(() => {
        const handlePopState = () => {
            setIsLoggedIn(false);
            navigate("/login");
        };
    
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);



    // useEffect(() => {
    //     fecthdata();
    // }, []);


    // axios.defaults.withCredentials = true;


   





    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/login");
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    return (
        <>
            <div className="offcanvas offcanvas-start show bg-success" style={{ width: '230px' }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header d-flex justify-content-center align-items-center ">
                 
                </div>
                <hr />
                <div className="offcanvas-body">
                    <ul className="mynav nav nav-pills flex-column mb-auto">
                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/admindashboard" className="text-decoration-none links d-flex ms-3" >Dashboard</Link>
                        </li>
                        
                        
                       
                        
                       

                    </ul>
                </div>
                <hr />
                <div className="offcanvas-end m-auto mb-2 d-flex flex-column">
              
                    <button className="btn btn-danger" onClick={handleLogout}>LOG OUT</button>
                </div>
            </div>

        </>
    );
}

export default AdminSidebar;







