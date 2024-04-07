import React, { useEffect, useState } from "react";
import TechSupportSidebar from "./TechSupportSidebar";
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ResolveTicket = ({ isLoggedIn, setIsLoggedIn }) => {
    const [clientdata, setClientdata] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:7000/resolveticket')
            .then(res => {
                console.log(res.data);
                setClientdata(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <TechSupportSidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></TechSupportSidebar>
                </div>
                <div className="col-10">
                    <h1>This is Resolve ticket page</h1>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResolveTicket;
