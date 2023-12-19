const { addKeyword } = require("@bot-whatsapp/bot");
const { regUser } = require("../api/users.service");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

let GLOBAL_STATE = {}

const flowRegistro = addKeyword('##_REGISTRO_##')
.addAnswer ('Genial! Comencemos tu registro')
.addAnswer ('Cual es tu nombre (ej: Marco)', {capture:true}, async (ctx, ) => {
    GLOBAL_STATE[ctx.from] = {
        "firstname": ctx.body,
        "lastname": "",
        "email": "",
        "profile": "",
        "phone": ctx.from
    }
})
.addAnswer ('Cual es tu apellido (ej: Polo)', {capture:true}, async (ctx) => {
    GLOBAL_STATE[ctx.from].lastname = ctx.body
})
.addAnswer ('Cual es tu email', {capture:true}, async (ctx, { fallBack }) => {
    if (!ctx.body.includes('@')){
        return fallBack('Correo inválido, inténtalo nuevamente')
    } else {
        GLOBAL_STATE[ctx.from].email = ctx.body
    } 
})
.addAnswer ('Selecciona tu perfil (Profesor, Alumno, Apoderado)', {capture: true}, async (ctx, {fallBack}) => {
    let opcion = ctx.body.trim()    
    if (!['Profesor','Alumno', 'Apoderado'].includes(opcion)){
        return fallBack('Opción inválida, inténtalo nuevamente')
    } else {
        GLOBAL_STATE[ctx.from].profile = ctx.body
    }
})

.addAnswer ('registrando...',  null , async (ctx, { flowDynamic, endFlow }) => {
    await regUser(GLOBAL_STATE[ctx.from]) //regista usuario en strapi
    await delay(2000)
    flowDynamic (['⭐ Registro completo! ⭐',
        'Dentro de las proximas 24hrs el servicio será habilitado, si tienes dudas contáctanos en alvaro.acevedo.ing@gmail.com'                       
    ])
    return endFlow()
})

module.exports = flowRegistro;