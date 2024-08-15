import express, { json, urlencoded } from 'express'
import { engine } from 'express-handlebars'

import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import {__dirname} from './utils.js'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import ProductsModel from "./models/product.model.js"
import CartModel from "./models/cart.model.js"


const app = express()
const PORT = 8090;

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const socketServer = new Server(httpServer)

mongoose.connect('mongodb+srv://basuratrash582:Basur4.2021@cluster0.prsyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log("conectado a la base")
})
.catch(error => {
  console.log("error", error)
})


app.use(json()) 
app.use(urlencoded({ extended: true })) 

// Configurar Handlebars


app.set('views', __dirname+'/views')
app.engine('handlebars', engine({
  helpers: {
      eq: (a, b) => a === b,
      multiply: (a,b) => a * b,
      calculateTotal: (products) =>  products.reduce((total, product) => total + product.quantity * product.product.price, 0)
  },
  
  defaultLayout: 'main',
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  }

}));


app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public' ))

app.use('/api/carts',cartRouter)
app.use('/api/products',productRouter)
app.use('/',viewsRouter)


socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado") 

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
})

app.set('socketio', socketServer);

