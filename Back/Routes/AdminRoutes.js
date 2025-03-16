import express from 'express'
import { con } from "../utils/db.js";
import jwt from 'jsonwebtoken'

const router = express.Router()
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


router.post('/adminlogin',(req,res) =>{
    const sql = "SELECT * from admin where email = ? and password = ?"
    con.query(sql,[req.body.email, req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus: false, Error:"Query error"})
            if(result.length > 0) {
                const email = result[0].email;
                const token = jwt.sign({role: "admin", email:email}, "jwt_secret_key",{expiresIn: '1d'}

                );
                res.cookie('token',token)
                return res.json({loginStatus: true, })


            } else {
                return res.json({loginStatus: false, Error:"Wrong email or password"})
            }

    });

    
});
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });

        return res.json({ Status: true,Result:result });
    });
});



router.post('/add_category', (req,res)=>{
    const sql = "INSERT INTO category (name) VALUES (?)"
    con.query(sql, [req.body.category],(err,result)=>{
        if(err) return res.json({Status: false, Error:"Query error"})
            return res.json({Status: true})

    })
})



router.post('/add_clothes', upload.single('photo'), (req, res) => {
    
    if (!req.body.name || !req.body.size || !req.body.price || !req.body.category_id) {
        return res.status(400).json({ Status: false, Error: "Missing required fields" });
    }

    
    const photoFilename = req.file ? req.file.filename : null;

    const sql = "INSERT INTO clothes (name, size, price, photo, category_id) VALUES (?, ?, ?, ?, ?)";
    const values = [req.body.name, req.body.size, req.body.price, photoFilename, req.body.category_id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error:", err.message);
            return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
        }
        return res.status(201).json({ Status: true, Message: "Clothes added successfully!",  });
    });
});

router.get('/clothes', (req, res) => {
    const sql = "SELECT * FROM clothes";
    
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });

        return res.json({ Status: true, Result:result });
    });
});

router.get('/clothes/:id', (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM clothes WHERE id = ?";
    
    con.query(sql,[id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });

        return res.json({ Status: true, Result:result });
    });

})

router.put('/clothes/update/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { name, size, category_id, price } = req.body;

    con.query("SELECT photo FROM clothes WHERE id = ?", [id], (err, existingClothes) => {
        if (err) return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
    
        if (!existingClothes.length) {
            return res.status(404).json({ Status: false, Error: "Clothes item not found!" });
        }
    
        let imagePath = existingClothes[0].photo; 
    
        if (req.file) {
            if (imagePath) {
                fs.unlinkSync(path.join(__dirname, '../public/images', imagePath)); 
            }
            imagePath = req.file.filename; 
        }
    
        const updateSql = "UPDATE clothes SET name=?, size=?, category_id=?, price=?, photo=? WHERE id=?";
        con.query(updateSql, [name, size, category_id, price, imagePath, id], (err) => {
            if (err) return res.status(500).json({ Status: false, Error: "Update Error: " + err.message });
    
            return res.json({ Status: true, Message: "Clothes updated successfully!" });
        });
    });
    
});
router.delete('/delete_clothes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM clothes WHERE id = ?";
    
    con.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err.message });
        }
        return res.json({ Status: true, Message: "Clothes deleted successfully!", Result: result });
    });
});


router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})







export {router as adminRouter}
