import React from "react";
import { Link } from 'react-router-dom';



const LandingPage = () => {
    return (
        <>
        
        <div className="container-fluid ">
            <div className="row mt-5 border border-1 d-flex justify-content-center align-items-center">
                <h1 className="text-center">Welcome to Noitavonne</h1>
                <div className="col-6 d-flex justify-content-around mb-5 mt-4 ">
                    <Link to="/login" className="btn btn-primary text-center">LOGIN</Link>
                              
                    
                   
                </div>
            </div>
        </div>
        
        
        
        </>
    );
}

export default LandingPage;