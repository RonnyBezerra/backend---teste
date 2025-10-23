import express from "express"
import cors from "cors"
import mysql from "mysql2"

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.get("/", (request, response) => {
    const searchCommand = "SELECT id, name, email, nickname FROM ronnybezerra_02tb"

    database.query(searchCommand, (error, users) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(users)
    })
})

app.post("/cadastrar", (request, response) => {
    const { user } = request.body

    console.log(user)

    const insertCommand = `
        INSERT INTO ronnybezerra_02tb(name, email, password, nickname)
        VALUES (?, ?, ?, ?)
    
    `

    database.query(insertCommand, [user.name, user.email, user.password, user.nickname], (error) => {
        if(error) {
            console.log(error)
            return
        }
    })

    response.status(281).json({ message: "Usuário cadastrado com sucesso!" })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}!`)
})

const database = mysql.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    connectionLimit: 10
})