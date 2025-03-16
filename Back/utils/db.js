import mysql from 'mysql2';  

export const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bipasha@123",
    database: "Ecommerce"
});

con.connect(function (err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});
