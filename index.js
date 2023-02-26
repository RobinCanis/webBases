const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

// initial table 
let tab = [{nom : 'alexGPT', age : '26'}, {nom : 'robin', age : '21'}]

// adding a customer iff it isn t already in the table
app.put('/customer', (req, res) => {
    if(!tab.find(element => element.nom === req.body.nom)){
        tab.push(req.body)
        res.send("added with PUT method")
    }
    else res.send("not added because it was already in the table")
})

// adding a customer without condition 
app.post('/customer', (req, res) => {
    console.log(req.body)
    tab.push(req.body)
    res.send("added with POST request")
})

// deleting a customer from the table
// age and name must match 
app.delete('/customer', (req, res) => {
    const index = (tab.findIndex(element => {
        return (
            element.nom === req.body.nom &&
            element.age === req.body.age
        )
    }))
    if(index !== -1){
        tab.splice(index, 1)
        res.send("element deleted")
    } 
    else res.send("element not matching any element in the current table")
})

// getting the list of customers
app.get('/customer', (req, res) => {
    res.send(tab)
})

// getting a specific customer by its name
app.get('/customer/:nom', (req, res) => {

    res.send(
        tab.find(element => 
            element.nom === req.params.nom
    ))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// PS

// je voulais mettre ca dans la func delete je le ferai later ;)
// function sameCustomer (cust1, cust2) {
//     return (
//         cust1.nom === cust2.nom &&
//         cust1.age === cust2.age
//     )
// }

// dans le terminal : 
// nodemon <nomDuFichier>.js
// maintiens le port accessible par le navigateur et postman