    import React, { useEffect, useState } from "react";
    import TechSupportSidebar from "./TechSupportSidebar";
    import { Link, useParams } from 'react-router-dom';
    import axios from 'axios';
    import Sidebar from "./Sidebar";

    const Clientticket = ({ isLoggedIn, setIsLoggedIn }) => {
        const [details, setDetails] = useState({});
        const { id } = useParams();
        const [answer, setAnswer] = useState("");
        const [alert, setAlert] = useState("");
        const [realert, setRealert] = useState("");

        useEffect(() => {
            axios.get(`http://localhost:7000/seeticket/${id}`)
                .then(res => {
                    console.log(res.data);
                    setDetails(res.data[0]);
                })
                .catch(err => {
                    console.log(err);
                })
        }, [id])

        const openPDFFile = (fileName) => {
            const fileURL = `http://localhost:7000/fileuploads/${fileName}`;
            window.open(fileURL, '_blank');
        };


        const handleclose = (e) => {
            e.preventDefault();
            const close = "close";
            axios.post(`http://localhost:7000/seeticket/${id}`, { status: close })
                .then(res => {
                    console.log(res.data);
                    if (res.data.message === "Ticket resolved/Closed") {
                        setRealert("Ticket resolved/Closed");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        };
        
        


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10">
                        {alert &&
                            <div className="row">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>{alert}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        }
                        {realert &&
                            <div className="row">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>{realert}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <h1>This is Client Ticket page</h1>
                            <p>UID : {details.uid}</p>
                            <p>Subject: {details.subject}</p>
                            <p>Status: {details.status}</p>
                            {/* <p>File : <Link onClick={() => openPDFFile(details.file)}>{details.file}</Link> </p> */}
                            <br></br>
                            <br></br>
                            <p>Query:- {details.query}</p>
                        </div>
                        <div className="row">
                            <p className="text-end">Answer: {details.answer}</p>
                        </div>
                        <div className="row">
                            <form onSubmit={handleclose}>
                            <button type="submit" className="btn btn-primary">CLOSE</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }


    export default Clientticket;
