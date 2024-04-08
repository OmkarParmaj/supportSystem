# Support System for end user

This is a Support System for end user web application, allows end user to create or rise ticket for there problems. There are three dashboard panels, end user, Tech support and Admin panel accordingly. ReactJs, expressjs and bootstrap are use for this project. I used React router dom, useState for state management. Axios for http requests.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Secreenshots](#screenshots)


## About

This is a Support System for end user web application, allows end user to create or rise ticket for there problems. There are three dashboard panels, end user, Tech support and Admin panel accordingly. ReactJs, expressjs and bootstrap are use for this project.End user can rise tickets and have the acces to close the tickets when they answer, In same way tech support can answer the rised ticket and answer the ticket. tech support also have access to close ticket. tech support tech can know the no of Pending tickets and closed thickets as follows. Admin dashboard also have the pending tickets and closed ticket, admin can modify the answer of tech support and resubmit, also have the access to close the ticket.

## Features

- End user can create or rise ticket and have access to close ticket
- There are three dashbaords for this project, first is for end user second is for Tech support and third is for Admin.
- Single login page can use for all three users. tech support and admin person allows to signup and there email should add into the Login.jsx component as follow
  ```bash
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

  in the handlesubmit function e.preventDefault is use to prevent page reload after submittion of form. you have to define techsupport mail and admin mail in above section code to access there dashboard respectively. The dashbaords are different for techsupport and admin.
  - All three users can track pending and close tickets in card section of dashboard. the end user can view only tickets that are related to his/her email, But tech support and dashboard is allows to track all close and pending tickets for all end user in dashboard section respectively.
  
## Installation

1) First step to download the file.
2) There are two files one is for frontend and another is for backend names are supportSystem which is frontend file and server is backend file. in terminal section command should run to install node modules beacause node modules are not included in supportsystem file can do as fllow
   ```bash
   npm install
3) To run the file you need to write command as follow
   ```bash
   npm run dev
4) To run the backend you need to install Xamp server for serverside server after installation, we need to write command in terminal to server directory as follow
   ```bash
   npm start
5) File upload system is use in this project, all files are stored in server/fileuploads directory. SEE File button is created to see the related pdf file, function is use to open pdf file and i given path, you need to change fileurl according to your directory, code as follow
   ```bash
   const openPDFFile = (fileName) => {
        const fileURL = `D:\supportSystem\server\fileuploads\${fileName}`;
        window.open(fileURL, '_blank');
    };

6) you have to create mysql database as provided.

   
 
## Usage

1) This web application can be use in government websites, travell website, ecommerce website to solve the probelm and answer.


## Screenshots

![admin dashboard](https://github.com/OmkarParmaj/supportSystem/assets/163232986/360d1591-7948-497d-bf51-cf2f1dc50bcd)
![techsupport dashboard](https://github.com/OmkarParmaj/supportSystem/assets/163232986/5af2629d-5b87-4e38-90da-9722b0fe1d32)
![rise ticket section](https://github.com/OmkarParmaj/supportSystem/assets/163232986/da5bc977-ec74-4c5e-a729-bdc10af46d43)
![enduser dashboard](https://github.com/OmkarParmaj/supportSystem/assets/163232986/7f244fbc-ad34-4d6e-90a7-495498641070)
