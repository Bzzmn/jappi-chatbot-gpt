const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser } = require("../api/users.service");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

const flowProfesor = addKeyword ('##_FLOW_PROFESOR_##')

.addAction(async (ctx, { endFlow, flowDynamic, provider }) => {
    const jid = ctx.key.remoteJid;
    const refProvider = await provider.getInstance();

    await refProvider.presenceSubscribe(jid);
    await delay(500);
    

    await refProvider.sendPresenceUpdate("composing", jid);

    const user = await getUser(ctx.from);
    //DEBUG
    console.log(user)
    console.log (user.data)

    await flowDynamic ([`Hola ${user.data[0].attributes.firstname} 🖐`,
    'Te doy la bienvenida a tu sesión personal de *Jappi* para profesionales de la educación'
    ]) 
    await refProvider.presenceSubscribe(jid);
    await delay(1000);
}
)

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
module.exports = flowProfesor;