import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";





const Login = ({isLoggedIn, setIsLoggedIn}) => {
    const [values, setValues] = useState({
        Email: "",
        Password: ""
    });
   const [userdata, setUserdata] = useState([]);
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState(null);
    const [highalert, setHightalert] = useState("");
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/login', values)
            .then(res => {
                console.log(res);
                setUserdata(res.data.user);
                                
                if (res.data.message === "Incorrect password") {
                    setAlert("Incorrect password");
                } 
                else if (res.data.message === "User not found") {
                    setHightalert("Incorrect email id or user not found!");
                }
               
                else if (res.data.user.Email === "techsupport@gmail.com") {
                    setIsLoggedIn(true);
                    navigate("/techsupportdashboard");
                } 
                else if (res.data.user.Email === "admin@gmail.com") {
                    setIsLoggedIn(true);
                    navigate("/admindashboard");
                }
                else if (res.data.redirectTo) {
                    setIsLoggedIn(true);
                    navigate("/dashboard");
                } 

            })
            .catch(err => {
                console.error(err);
                setError("Invalid email or password"); 
            });
    };
    



    return (
        <>
            <div className="container">
               <div className="row">
               {/* {highalert && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{highalert}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></button>
                    </div>
                )} */}
               </div>
            </div>
            <div className="container vh-100 justify-content-center align-items-center d-flex">
                <div className="card">
                    <div className="card-header d-flex justify-content-center bg-info">
                        <img src="https://noitavonne.in/assets/frontend/images/noitavonne-logo-black-white.png" className="navbar-image" style={{ height: "35px" }} alt="noit-logo" />
                        
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="container d-block">
                                <div className="row text-center">
                                    <h2>LOGIN</h2>
                                </div>
                                <div className="row mt-3">
                                    <input type="text" className="form-control" placeholder="Email" required onChange={val("Email")} />
                                    <input type="password" className="form-control mt-3 mb-3" placeholder="Password" required onChange={val("Password")} />
                                    <button type="submit" className="btn btn-success">Sign In</button>
                                </div>
                                <div className="row" style={{ height: "30px" }}>{highalert && <div className="row text-danger">{highalert}</div>}</div>
                                <div className="row" style={{ height: "30px" }}>{alert && <div className="row text-danger">{alert}</div>}</div>

                                <div className="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="row mt-3 text-end">
                                    <a href="/forgot">Forgot password</a>

                                </div>

                            </div>
                        </form>
                        <div className="row mt-4 text-center">
                            <p>Not a member?  <Link to="/signup">Signup</Link>   </p>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
};

export default Login;
