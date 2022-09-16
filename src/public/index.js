
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
})
