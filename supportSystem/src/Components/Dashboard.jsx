import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate } from 'react-router-dom';
import axios from 'axios';




const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {

    const [ticketdata, setTicketdata] = useState([]);
    const [resolved, setResolved] = useState([]);
   const [ticketdata2, setTicketdata2] = useState([]);



useEffect(() => {
 axios.get('http://localhost:7000/ticketinfo')
 .then(res => {
    // console.log(res.data);
    setTicketdata(res.data.pendingCount);

 })
 .catch(err => {
    console.log(err);
 })
},[])

useEffect(() => {
    axios.get('http://localhost:7000/ticketinfo2')
    .then(res => {
       // console.log(res.data);
       setTicketdata2(res.data.closecount);
   
    })
    .catch(err => {
       console.log(err);
    })
   },[])




    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }
    return (
        <>


            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10">
                        <h1>This is dashboard page</h1>
                        <div className="row d-flex mt-4">
                            <div className="col-3">
                                <div className="card">
                                    <h4 className="text-center">Resolved tickets</h4>
                                    <h1 className="text-center">{ticketdata2}</h1>
                                </div>
                                
                            </div>
                            <div className="col-3">
                                    <div className="card">
                                        <h4 className="text-center">Pending tickets</h4>
                                        <h1 className="text-center">{ticketdata}</h1>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard