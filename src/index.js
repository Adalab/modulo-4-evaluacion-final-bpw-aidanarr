const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// server config
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
});

// conexión con bd
async function getConnection() {
    const conex = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    await conex.connect();
    return conex;
}

// ENDPOINTS

const authorize = (req, res, next) => {
    const tokenString = req.headers.authorization;
    console.log(tokenString)
    if(!tokenString) {
        res.status(400).json({successs: false, message: "Debes iniciar sesión"})
    } else {
        try {
            // const token = tokenString.split(" ")[1];
            const token = tokenString;
            const verifiedToken = jwt.verify(token, process.env.SECRET);
             req.userInfo = verifiedToken;
        } catch (error) {
            res.status(400).json({success: false, message: error})
        }
    }
    
    next();
};

// get (toda la tabla)
app.get("/pets", async (req, res) => {
    try {
        const conn = await getConnection();
        const select = 'SELECT * FROM pets;';
        const [results] = await conn.query(select);

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error
        })
    }
});

// get (datos filtrados)
app.get("/pets/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const conn = await getConnection();
        const select = 'SELECT * FROM pets WHERE id = ?;';
        const [results] = await conn.query(select, [id]);
    
        if (results.length === 0) {
            res.status(400).json({success: false, message: "No existe una mascota con ese id"});
        } else {
            res.status(200).json({success: true, data: results[0]});
        }
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }  
});

// post (añadir)
app.post("/addPet", authorize, async (req, res) => {
    const conn = await getConnection();
    const { name, species, sex, descr } = req.body;
   
    const insert = "INSERT into pets (name, species, sex, descr) values(?,?,?,?)";
    const [newPet] = await conn.query(insert, [
        name,
        species,
        sex,
        descr,
    ]);

    res.status(200).json({
        success: true,
        id: newPet.insertId
    });

    await conn.end();
});

// app.post("/addPet", async (req, res) => {
//     const conn = await getConnection();
//     const { name, species, sex, descr } = req.body;
   
//     const insert = "INSERT into pets (name, species, sex, descr) values(?,?,?,?)";
//     const [newPet] = await conn.query(insert, [
//         name,
//         species,
//         sex,
//         descr,
//     ]);

//     res.status(200).json({
//         success: true,
//         id: newPet.insertId
//     });

//     await conn.end();
// });

// put (modificar)
app.put("/pets/:id", async (req, res) => {
    const conn = await getConnection();
    const idPet = req.params.id;
    const { name, species, sex, descr } = req.body;

    const update = "UPDATE pets SET name = ?, species = ?, sex = ?, descr = ? WHERE id = ?;";
    const [results] = await conn.query(update, [
        name,
        species,
        sex,
        descr,
        idPet
    ]);

    console.log(req.body)

    if (results.affectedRows > 0) {
        res.status(200).json({success: true, newData: req.body });
    } else {
        res.status(200).json({success: false, message: "No existe una mascota con ese id"})
    }
});

// delete
app.delete("/pets/:id", async (req, res) => {
    const conn = await getConnection();
    const idPet = req.params.id;
    const deletePet = "DELETE from pets WHERE id = ?;";
    const [results] = await conn.query(deletePet, [idPet]);

    console.log(idPet);

    if (results.affectedRows > 0) {
        res.status(200).json({success: true, message: "Registro borrado" });
    } else {
        res.status(200).json({success: false, message: "No existe una mascota con ese id"})
    }
})

// post (registrarse)
app.post("/signup", async (req, res) => {
    const conn = await getConnection();
    const {name, email, address, password} = req.body;

    //comprobar que no está en la bd
    const selectEmail = "SELECT * FROM users WHERE email = ?"
    const [emailResult] = await conn.query(selectEmail, [email]);
    
    if (emailResult.length === 0) {
        // el usuario no existe
        const hasshedPassword = await bcrypt.hash(password, 10);
        const insertUser = "INSERT INTO users (name, email, address, password) values (?, ?, ?, ?);";
        const [newUser] = await conn.query(insertUser, [
            name, 
            email, 
            address, 
            hasshedPassword])
        res.status(201).json({success: true, id: newUser.insertId});
    } else {
        // el usuario existe
        res.status(200).json({success: false, message: "El usuario ya existe"});
    }

    await conn.end()
});

// post (login)
app.post("/login", async (req, res) => {
    const conn = await getConnection();
    const {email, password} = req.body;

    //comprobar que no está en la bd
    const selectEmail = "SELECT * FROM users WHERE email = ?"
    const [emailResult] = await conn.query(selectEmail, [email]);

    if (emailResult.length !== 0) {
        // comprobar que la contraseña encriptada coincide
        const samePassword = await bcrypt.compare(password, emailResult[0].password);

        if (samePassword) {
            // si la contraseña coincide
            const tokenInfo = {email: emailResult[0].email, id: emailResult[0].id};
            const token = jwt.sign(tokenInfo, process.env.SECRET, {expiresIn: "1h"});
            res.status(201).json({success: true, token: token});
        } else {
            // si no coincide
            res.status(400).json({success: false, message: "La contraseña es incorrecta"});
        }
    } else {
        res.status(400).json({success: false, message: "El email es incorrecto"});
    }

    conn.end()
})

// ruta protegida

app.get("/myPets", authorize, async (req, res) => {
    try {
        const conn = await getConnection();
        const select = "SELECT * FROM userpets"
        const [results] = await conn.query(select);
        res.status(200).json({success: true, data: results})
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }
});