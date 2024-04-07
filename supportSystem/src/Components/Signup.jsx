import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        Name: "",
        Email: "",
        Password: ""
    });

    const [alert , setAlert] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/customer', values)
            .then(result => {
                console.log(result);
                if(result.data.message === "Duplicate data"){
                    setAlert("Email Id is already exist! Please give another email id");
                }
                else if(result.data.message === "Data inserted successfully")
                {
                    setAlert("Data has been added successfuly");
               
                    setValues({
                        Name: "",
                        Email: "",
                        Password: ""
                    });
                }
            })
            .catch(err => {
                console.log("API call failed with error:", err);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlehome = () => {
        navigate('/login');
    }

    return (
        <>
            <div className='container'>
                {alert && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{alert}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></button>
                    </div>
                )}
            </div>
            <div className='container d-flex justify-content-center align-item-center'>
                <div className='card'>
                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            <div className='row'>
                                <h2>Sign Up</h2>
                            </div>
                            <div className='row'>
                                <input name='Name' type='text' value={values.Name} className='form-control mt-3' placeholder="User Name" onChange={handleChange} required></input>
                                <input name='Email' type='email' value={values.Email} className='form-control mt-3' placeholder="Enter your email"  onChange={handleChange} required></input>
                                <input name='Password' type="password" value={values.Password} className='form-control mt-3' placeholder="Enter password" onChange={handleChange} required></input>
                            </div>
                            <div className='row'>
                                <button className='btn btn-primary mt-3'>Submit</button>
                            </div>
                            <div className='row'>
                                <button className='btn btn-success mt-3' onClick={handlehome}>login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
