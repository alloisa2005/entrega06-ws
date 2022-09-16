
const express = require('express');
const app = express();

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server Up on Port ${PORT}`));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {  
  res.render('home');
})