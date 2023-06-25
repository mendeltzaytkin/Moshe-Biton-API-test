const express = require('express')
const PORT = 8080
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()

let products = [  
    {id:1 , name : "Toyota" , price: 250000 , category: "Cars"},
    {id:2 , name : "iphone" , price: 1200 , category: "Smart-Phone"}, 
    {id:3 , name : "HP screen" , price: 1200 , category: "computer screens"} 

]
let global_id = 4
app.get("/api/products",(req,res)=>{
    res.json(products)
})
app.get("/api/products/:category",(req,res)=>{
    let category = req.params.category
    res.send(products.filter(p => p.category == category))
})
app.post("/api/products", jsonParser, (req,res)=>{

    let { name,price,category} = req.body
    
    name = new String(name)
    price = new String(price) 
    category = new String(category) 

    let product  = {
        id: global_id++,
        name : name,
        price: price,
        category: category,
    } 
    products.push(product)
    res.json(products)
})
app.delete("/api/products/:id",(req,res)=>{
    const id = req.params.id
   // let p = products.find(p => p.id == id)
  
    products = products.filter(p => p.id != id)
    res.json(id)
})
app.listen(PORT, ()=>{console.log("Listening to the port:"+PORT);})