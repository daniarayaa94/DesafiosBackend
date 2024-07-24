import express, { json, urlencoded } from 'express'
import { engine } from 'express-handlebars'

import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import {Server} from 'socket.io'


const app = express()
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const socketServer = new Server(httpServer)

app.use(json()) 
app.use(urlencoded({ extended: true })) 
app.engine('handlebars', engine())
app.set('views', __dirname+'/views')
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

