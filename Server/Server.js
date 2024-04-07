import express from 'express';
import cors from 'cors';
import mysql, { createConnection } from 'mysql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const port = 7000;

const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(cors((
    {
        origin: ['http://localhost:5173'],
        methods: ["POST", "GET","DELETE", "PATCH", "PUT"],
        credentials: true
    }
)));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret', // Generating a random secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"supportSystem",

});

connection.connect((err) => {
    if(err) {
        console.log("Error connecting to database", err);

    }
    else {
        console.log("Connected to supportSystem database");
    }
});


app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`)
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './fileuploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.post('/ticket', upload.single('queryfile'), (req, res) => {
    const ticketmail = req.session.uemail;
    const status = "pending";


    const values = [
        ticketmail,
        req.body.subject,
        req.body.query,
        
        req.file ? req.file.filename : null, 
        status,
    ];

    const sql = "INSERT INTO `ticket` (`Email`, `subject`, `query`, `file`, `status`) VALUES (?)";

    connection.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json(err);
        }

        return res.json({ message: "Data submitted" });
    });
});



app.all('/customer', (req, res) => {
    const { Name, Email, Password } = req.body;

 
    const sqlDuplicate = "SELECT * FROM customer WHERE Email = ?";

    connection.query(sqlDuplicate, [Email], (err, result) => {
        if (err) {
            console.error("Error connecting to database:", err);
            return res.json({ message: "Internal server error" });
        }

        if (result.length > 0) {
            return res.json({ message: "Duplicate data" });
        }

     
        const sqlInsert = "INSERT INTO `customer` (`Name`, `Email`, `Password`) VALUES (?, ?, ?)";
        connection.query(sqlInsert, [Name, Email, Password], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.json({ message: "Internal server error" });
            }

            return res.json({ message: "Data inserted successfully" });
        });
    });
});


app.post('/login', (req, res) => {
   

  
    const sqlQuery = "SELECT * FROM `customer` WHERE Email = ? AND Password = ?";

connection.query(sqlQuery, [req.body.Email, req.body.Password], (err, result) => {
    if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
        return res.json({ message: "User not found" });
    }

    const user = result[0];
    if (user.Password !== req.body.Password) { 
        return res.json({ message: "Incorrect password" });
    }
   




  
        req.session.user = result[0];
        req.session.uemail = result[0].Email;
   

        console.log(req.session.uemail);

        
        return res.json({ redirectTo: "/dashboard",  user: result[0] });
        

    });
});

app.get('/sidebar', (req, res) => {
    const sidebarmail = req.session.uemail;

    const sql = "SELECT * FROM `customer` WHERE Email =?";

    connection.query(sql, [sidebarmail], (err, result) => {
        if(err) return req.json(err);
        return res.json(result);
    })
})

app.get('/ticketreport', (req, res) => {
    const ticketreportmail = req.session.uemail;
    
    const sql = "SELECT * FROM `ticket` WHERE Email =?";

    connection.query(sql, [ticketreportmail], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})



app.get('/ticketinfo', (req, res) => {
    const ticketinfomail = req.session.uemail;
    
    const sql = `SELECT COUNT(status) AS pendingCount FROM ticket WHERE status = 'pending' AND Email = ?`;

    connection.query(sql, [ticketinfomail], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const pendingCount = result[0].pendingCount;
        return res.json({ pendingCount });
    });
});

app.get('/ticketinfo2', (req, res) => {
    const ticketinfomail = req.session.uemail;
    
    const sql = `SELECT COUNT(status) AS closecount FROM ticket WHERE status = 'close' AND Email = ?`;

    connection.query(sql, [ticketinfomail], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const closecount = result[0].closecount;
        return res.json({ closecount });
    });
});

app.get('/techdash', (req, res) => {
    
    const sql = "SELECT * FROM `ticket` WHERE `status` = 'pending'";

    connection.query(sql, (err, result) => {
        if(err) return res.json(err);

        return res.json(result);

    })
});

app.get('/admindash', (req, res) => {
    
    const sql = "SELECT * FROM `ticket` WHERE `status` = 'close'";

    connection.query(sql, (err, result) => {
        if(err) return res.json(err);

        return res.json(result);

    })
});

app.get('/resolveticket', (req, res) => {
    
    const sql = "SELECT * FROM `ticket` WHERE `status` = 'close'";

    connection.query(sql, (err, result) => {
        if(err) return res.json(err);

        return res.json(result);

    })
});

app.get('/clientticket/:id', (req, res) => {

    const sql = "SELECT * FROM `ticket` WHERE `uid` =?";

    connection.query(sql, [req.params.id], (err, result) => {
        if (err) 
         
            return res.json({ message: "Internal server error" });
        
        return res.json(result);
    });
});


app.put('/clientticket/:id', (req, res) => {
    const { answer } = req.body;
    const { id } = req.params;

    const sql = `UPDATE ticket SET answer = ? WHERE uid = ?`;

    connection.query(sql, [answer, id], (err, result) => {
        if (err) {
            console.error("Error updating ticket:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json({ message: "Ticket resolved" });
    });
});

app.get('/seeticket/:id', (req, res) => {
  const seeticketemail = req.session.uemail;

    const sql ="SELECT * FROM `ticket` WHERE uid =? AND Email =?";
    connection.query(sql, [req.params.id, seeticketemail], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post('/seeticket/:id', (req, res) => {
    
    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE `ticket` SET `status` = ? WHERE `uid` = ?";

    connection.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Error updating ticket status:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json({ message: "Ticket resolved/Closed" });
    });
});

app.get('/tickettech', (req, res) => {
   
    
    const sql = `SELECT COUNT(status) AS pendingCount FROM ticket WHERE status = 'pending'`;

    connection.query(sql,  (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const pendingCount = result[0].pendingCount;
        return res.json({ pendingCount });
    });
});

app.get('/tickettech2', (req, res) => {
   
    
    const sql = `SELECT COUNT(status) AS closecount FROM ticket WHERE status = 'close'`;

    connection.query(sql,  (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const closecount = result[0].closecount;
        return res.json({ closecount });
    });
});










app.use('/fileuploads', express.static(path.join(__dirname, 'fileuploads')));

