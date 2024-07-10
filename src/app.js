const express = require('express')

const cartRouter = require('./routes/cart.router.js')
const productRouter = require('./routes/products.router.js')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

const path = require('path')
const app = express()
const PORT = 8080;


app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.use(express.static(path.join(__dirname,'public') ))

app.use('/api/carts',cartRouter)
app.use('/api/products',productRouter)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
