const { addKeyword } = require("@bot-whatsapp/bot");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))


const flowRegistro = require("./flowRegistro");
const flowDespedida = require("./flowDespedida");

const flowNuevo = addKeyword('##_FLOW_CLIENTE_NUEVO_##')

.addAnswer('Soy Jappi, tu asistente virtual para la educación, te doy la bienvenida!🎉')
.addAnswer ('Para poder brindarte la mejor experiencia con la ayuda de la Inteligencia Artificial en tu día a día, necesito algunos datos. Estoy aquí para hacer tu vida más fácil y divertida. ')
.addAnswer ([
    '¿Listo para comenzar?',
    'Responde *Si* para comenzar el registo', 
    'Responde *No* para cancelar',
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
    },

)


module.exports = flowNuevo;