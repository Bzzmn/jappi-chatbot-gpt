const { addKeyword } = require("@bot-whatsapp/bot");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

const flowAlumno = addKeyword('##_hola_##')
.addAnswer('Alvaro' + ", te doy la bienvenida a *Jappi* 😊")
.addAnswer("Soy tu asistente virtual para la educación", {delay: 1000})
.addAnswer("Tu perfil es Alumno", {delay: 1000})

module.exports = flowAlumno;