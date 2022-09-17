
const express = require('express');
const app = express();

const productRouter = require('./routes/products');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const Contenedor = require("./classes/contenedor");
let contenedor = new Contenedor('productos.txt');


const server = app.listen(PORT, () => console.log(`Server Up on Port ${PORT}`));

const io = new Server(server);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let products = [];
contenedor.getAll()
  .then(res => {
    products = res.data;    
  }); 

app.get('/', (req, res) => {  
  res.render('home', {products});
});

app.use('/api/productos', productRouter)


io.on('connection', socket => {  

  socket.on('registered', data => {
    socket.broadcast.emit('newUser', data)    
    
    io.emit('prodHistory', products)
  })

  socket.on('newProduct', data => {
    console.log(data);
    contenedor.save(data)
      .then(res => {
        if(res.status === 'success'){
          products.push(data);
          io.emit('prodHistory', products)
        }
      })
  })
});

