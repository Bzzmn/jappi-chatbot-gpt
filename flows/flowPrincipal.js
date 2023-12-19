const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { getUser } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

const flowNuevo = require("./flowNuevo");
const flowRegistradoNOOK = require("./flowRegistradoNOOK");
const flowProfesor = require("./flowProfesor");
const flowApoderado = require("./flowApoderado");
const flowAlumno = require("./flowAlumno");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic, provider, gotoFlow, endFlow }) => {
   
    const jid = ctx.key.remoteJid
    const refProvider = await provider.getInstance()
    refProvider.presenceSubscribe(jid)
    refProvider.sendPresenceUpdate('composing', jid)
    const user = await getUser(ctx.from);//Consultamos a strapi! ctx.from = numero

    if (!user.data[0]) {
      gotoFlow (flowNuevo)
    }

    else if (!user.data[0].attributes.access) {
      gotoFlow (flowRegistradoNOOK)
    }
    
    else {
    let profile = user.data[0].attributes.profile
    switch (profile) {
      case 'Profesor':
        gotoFlow(flowProfesor)
        break
      
      case 'Alumno':
        gotoFlow(flowAlumno)
        break

      case 'Apoderado':
        gotoFlow(flowApoderado)
        break
    }
  }

  

  })

module.exports = flowPrincipal;