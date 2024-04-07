import React, { useEffect, useState } from "react";
import TechSupportSidebar from "./TechSupportSidebar";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';




const TechSupportDashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    const [clientdata, setClientdata] = useState([]);
    const [ticketdata, setTicketdata] = useState([]);
    const [ticketdata2, setTicketdata2] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:7000/techdash')
            .then(res => {
                console.log(res.data);
                setClientdata(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('http://localhost:7000/tickettech')
            .then(res => {
                // console.log(res.data);
                setTicketdata(res.data.pendingCount);

            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:7000/tickettech2')
            .then(res => {
                // console.log(res.data);
                setTicketdata2(res.data.closecount);

            })
            .catch(err => {
                console.log(err);
            })
    }, [])





    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }
    return (
        <>

            <div className="container-fluid">

                <div className="row">
                    <div className="col-2">
                        <TechSupportSidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></TechSupportSidebar>
                    </div>
                    <div className="col-10">
                        <h1>This is tech support dashboard</h1>
                        <div className="row d-flex justify-content-around mt-3">
                            <div className="col-3">
                                <div className="card">
                                    <h2 className="text-center">Pending tickets</h2>
                                    <h3 className="text-center">{ticketdata}</h3>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="card">
                                    <h2 className="text-center">Resolved tickets</h2>
                                    <h3 className="text-center">{ticketdata2}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>sr no</th>
                                        <th>UID</th>
                                        <th>Email</th>
                                        <th>subject</th>
                                        <th>status</th>
                                        <th>File</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {clientdata.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{o.uid}</td>
                                            <td>{o.Email}</td>
                                            <td>{o.subject}</td>
                                            <td>{o.status}</td>
                                            <td>{o.file}</td>
                                            <td><Link to={`http://localhost:5173/clientticket/${o.uid}`} type="submit" className="btn btn-primary">OPEN</Link></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export default TechSupportDashboard