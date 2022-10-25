const express = require('express')
const bodyParser = require('body-parser')
const database = require('./db')
const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.json({
        message: "I am running"
    })  
})

app.get('/users', database.getUser)
app.get('/users/:id', database.getUserByID)
app.post('/createuser', database.createUser)
app.put('/update-user/:id', database.updateUser)
app.delete('/delete-user/:id', database.deleteUser)

app.listen(port, ()=> {
    console.log('App is running')
})