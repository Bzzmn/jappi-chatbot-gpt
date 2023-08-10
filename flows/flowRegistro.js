const { addKeyword } = require("@bot-whatsapp/bot");
const { regUser } = require("../api/users.service");
const flowDespedida = require("./flowDespedida");

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
.addAnswer ('Cual es tu email', {capture:true}, async (ctx) => {
    GLOBAL_STATE[ctx.from].email = ctx.body
})
.addAnswer ('Selecciona tu perfil (Profesor, Alumno, Apoderado)', {capture: true}, async (ctx, {fallBack}) => {
   
    let opcion = ctx.body.trim()    
    if (!['Profesor','Alumno', 'Apoderado'].includes(opcion)){
            return fallBack('opción inválida, intentalo nuevamente')
        }   
   
    GLOBAL_STATE[ctx.from].profile = ctx.body
})
.addAnswer ('Tu registro se esta procesando', null , async (ctx, {flowDynamic}) => {
   const respuestaStrapi = await regUser(GLOBAL_STATE[ctx.from])
   await flowDynamic (`${respuestaStrapi.data.data.attributes.firstname}, tu registro fué exitoso.`)
   await flowDynamic (['Revisaremos tu información y habilitaremos el servicio dentro de 24hrs',
                    `Te enviaremos la confirmación del registro al email ${respuestaStrapi.data.data.attributes.email}`])
    await flowDynamic ('Nos vemos pronto 👍')
})

module.exports = flowRegistro;