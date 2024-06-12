const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

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
app.post("/addPet", async (req, res) => {
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