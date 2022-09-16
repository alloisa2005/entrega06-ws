
const socket = io();
let user;

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
  console.log(data);
});