const { addKeyword } = require("@bot-whatsapp/bot");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))


const flowRegistro = require("./flowRegistro");
const flowDespedida = require("./flowDespedida");

const flowNuevo = addKeyword('##_FLOW_CLIENTE_NUEVO_##')
.addAnswer("Te doy la bienvenida a *Jappi* 😊")
.addAnswer("Soy tu asistente virtual para la educación", {delay: 1000})
.addAnswer (['Necesitas registrarte para acceder a todas las herramientas que tenemos a tu disposición',
             'es muy simple']
             )
.addAnswer ([
    '¿Quieres comenzar ahora?',
    'Responde *Si* para registrarte', 
    'Responde *No* para cancelar el registro',
    ],
    {capture: true},
    async(ctx,{fallBack, gotoFlow}) => {
        let opcion = ctx.body.trim()    
        if (!['Si','No', 'Salir'].includes(opcion)){
        
            return fallBack('opción inválida, intentalo nuevamente')
        }

        switch (opcion) {
            case 'Si':
                await gotoFlow(flowRegistro)
                break
            case 'No':
                await gotoFlow (flowDespedida)
                break
        }

        console.log(`El usuario respondio ${ctx.body}`)
    },

)


module.exports = flowNuevo;