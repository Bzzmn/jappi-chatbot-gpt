const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const flowProfesor_consulta = require("./flowProfesor_consulta");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

const flowProfesor = addKeyword('##_FLOW_PROFESOR_##')

.addAction(async (ctx, { gotoFlow, flowDynamic, provider }) => {
    const jid = ctx.key.remoteJid;
    const refProvider = await provider.getInstance();
    refProvider.presenceSubscribe(jid);
    refProvider.sendPresenceUpdate("composing", jid);
    const user = await getUser(ctx.from);
    flowDynamic ('Te doy la bienvenida a tu sesión personal de *Jappi* para profesionales de la educación')
    await delay(2000)
    flowDynamic([
        'Para comenzar escribe *Iniciar*',
        ],
        {capture: true},
        async(ctx,{fallBack, gotoFlow}) => {
            let opcion = ctx.body.trim()    
            if (!['Iniciar'].includes(opcion)){
                return fallBack('opción inválida, intentalo nuevamente')
            }
        },
    )

})


/*

.addAnswer ([
    '¿Que quieres hacer hoy?',
    '*Contenido* para generar contenido para tus clases',
    '*Consejos* para ayudarte a resolver dificultades docentes',    
    '*Ayuda* para recibir orientación de como sacar el mayor provecho a *Jappi*',
    '*Salir* para cerrar tu sesión',
    ],
    {capture: true},
    async(ctx,{fallBack, gotoFlow}) => {
        let opcion = ctx.body.trim()    
        if (!['Contenido','Consejos', 'Ayuda', 'Salir'].includes(opcion)){
        
            return fallBack('opción inválida, intentalo nuevamente')
        }
    },
)
*/

module.exports = flowProfesor;