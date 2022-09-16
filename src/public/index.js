
const socket = io();

let user;

let title = document.getElementById('title');
let price = document.getElementById('price');
let thumbnail = document.getElementById('thumbnail');
let btn_guardar = document.getElementById('btn_guardar');

Swal.fire({
  title: 'Login',
  text: 'Ingrese su email',
  input: 'text',
  confirmButtonText: 'OK',
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return 'Necesitas un correo para ingresar'
    }
  }
}).then(res => {
  user = res.value;
  socket.emit('registered', user)
});

btn_guardar.addEventListener('click', (e) => {
  e.preventDefault();

  let obj = {
    title:title.value, 
    price:parseInt(price.value), 
    thumbnail:thumbnail.value
  }  

  if(obj.title !== '' && obj.price !== 0 && price.value !== '' && obj.thumbnail !== ''){    
    socket.emit('newProduct', obj)
    title.value = '';
    price.value='';
    thumbnail.value='';
  } else {
    mensaje();
  }
  
});

//sockets
socket.on('newUser', (data) => {
  // alert('New user connected!')
  Swal.fire({
      icon: "success",
      text: `${data} has connected`,
      toast: true,
      position: "top-right"
  })
})

socket.on('prodHistory', data => {

  let table = document.getElementById('productosTabla');
  table.innerHTML = '';
  let row = table.insertRow(0);
  row.style.fontWeight= "bold";
  row.style.fontSize= "20px";
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = "Titulo";
  cell2.innerHTML = "Precio";
  cell3.innerHTML = "Foto";

  data.forEach((prod,index)=> {
    row = table.insertRow(index+1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell1.innerHTML = prod.title;
    cell2.innerHTML = prod.price;
    cell3.innerHTML = `<img style="object-fit: cover;width:200px;" src="${prod.thumbnail}" alt="${prod.title}">`;
  });

  console.log(data); 
});

// Funcion mensaje de error
function mensaje(){
  return Swal.fire({
    icon: "error",
    text: `Ingrese todos los campos`,    
  });
}