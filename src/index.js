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
app.get("/pets", async () => {
    try {
        const conn = await getConnection();
        const select = 'SELECT * FROM pets;';
        const [results] = await conn.query(select);

        results.status(200).json({
            success: true,
            count: results.length,
            data: results
        })
    } catch (error) {
        results.status(400).json({
            sucess: false,
            error: error
        })
    }
})

// get (datos filtrados)
app.get("/pets/:id")