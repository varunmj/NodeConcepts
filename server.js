const express = require('express')
const mongoose = require('mongoose')
const Product =require('./models/productModel')
const product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

app.get('/blog',(req,res)=>{
    res.send('Hello Blog My name is Varun')
})

app.get('/products',async(req,res)=>{
    try{
        const products =await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

app.get('/products/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.put('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with this ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.delete('/products/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(400).json({message:`There is no Product to delete with ID ${id}`})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.post('/products',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    }catch (error){
        console.log(req.body);
        res.status(500).json({message: error.message});
    }
    
})


mongoose.connect('mongodb+srv://<username>:<password>@nodeapitutorial.eowmhms.mongodb.net/Node-API-Varun?retryWrites=true&w=majority&appName=NodeAPITutorial')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Node API app is running in port 3000')
    })
}).catch((error)=>{
    console.log(error)
})
