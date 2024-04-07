import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";

const RiseTicket = ({ isLoggedIn, setIsLoggedIn }) => {
    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState("");
    const [ticket, setTicket] = useState([]);

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('subject', subject);
        formData.append('query', query);
        formData.append('queryfile', file);


        axios.post('http://localhost:7000/ticket', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.message === "Data submitted") {
                    setAlert("Data has been submitted successfully!");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const openPDFFile = (fileName) => {
        const fileURL = `D:\supportSystem\server\fileuploads\${fileName}`;
        window.open(fileURL, '_blank');
    };

    

    useEffect(() => {
        axios.get("http://localhost:7000/ticketreport")
            .then(res => {
                console.log(res.data);
                setTicket(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [alert]);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="col-10">
                    <h1>This is Rise ticket page</h1>
                    {alert &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Congratulations!</strong> {alert}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    }

                    <div className="row mt-5">
                        <div className="col-6 border border-1">
                            <h4 className="text-center">Rise Ticket</h4>
                            <form onSubmit={handleSubmit}>
                                <label>Subject</label>
                                <input className="form-control mt-2" type="text" name="subject" value={subject} onChange={e => setSubject(e.target.value)} />
                                <label>Query</label>
                                <textarea name="query" className="form-control mt-3" id="exampleFormControlTextarea1" rows="7" value={query} onChange={e => setQuery(e.target.value)} />
                                <label className="mt-3">Upload document (<span style={{ color: "red" }}>Optional</span>)</label>
                                <div className="input-group mb-3 mt-2">
                                    <input name="queryfile" onChange={handleFileChange} type="file" className="form-control" id="inputGroupFile02" />
                                </div>
                                <button className="btn btn-success mt-3 mb-3" type="submit">SUBMIT</button>
                            </form>
                        </div>

                        <div className="col-6 border border-1">
                            <h4 className="text-center">Rised ticket info will show here</h4>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>sr no</th>
                                        <th>UID</th>
                                        <th>Subject</th>
                                        <th>status</th>
                                        <th>File</th>
                                        <th>Reply</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {ticket.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{o.uid}</td>
                                            <td>{o.subject}</td>
                                            <td>{o.status}</td>
                                            <td><button className="btn btn-primary" type="button" onClick={() => openPDFFile(o.file)}>SEE FILE</button></td>
                                            <td><Link to={`http://localhost:5173/seeticket/${o.uid}`} className="btn btn-success">SEE REPLY</Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RiseTicket;
