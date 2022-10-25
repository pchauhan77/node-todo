const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node-todo',
    password: 'e5832048e0',
    port: 5432
})

const getUser = (req, res)=> {
   pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
        throw error
    }
    res.status(200).json(result.rows)
   }) 
}
const createUser = (req, res)=> {
    const {name, age, email} = req.body
    pool.query('INSERT INTO users (name, age, email) VALUES ($1, $2, $3) RETURNING *',
    [name, age, email], (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${result.rows[0].id}`)
    }
    )
}

const getUserByID = (req, res)=> {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

const updateUser = (req, res)=> {
    const id = parseInt(req.params.id)
    const {name, age, email} = req.body
    pool.query('UPDATE users SET name = $1, age = $2, email = $3 WHERE id = $4',
    [name, age, email], (error, result)=> {
        if (error) {
            throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
    }
    )
}

const deleteUser = (req, res)=> {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, result)=> {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)   
    } )   
}

module.exports={
    getUser,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}