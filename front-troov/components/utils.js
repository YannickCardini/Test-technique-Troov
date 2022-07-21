export default {

  hashPassword (password) {
    const encryptPassword = require('encrypt-password')
    return encryptPassword(password, 'troov')
  },

  createAlert (title, text, icon, confirmButtonText) {
    const Swal = require('sweetalert2')
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText
    })
  },

  jsonIsEmpty (obj) {
    if (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    ) { return true }
    return false
  },

  isPasswordOk (form) {
    if (form.password === form.repeat && form.password.length >= 8) { return true }
    return false
  }

}
