const { addKeyword, addAnswer } = require("@bot-whatsapp/bot")
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))
const { getUser } = require("../api/users.service");

const flowRegistradoNOOK = addKeyword ('##_NOOK_##')
.addAction(async (ctx, {flowDynamic}) => {

    await delay(1000)
   


    const user = await getUser(ctx.from);//Consultamos a strapi! ctx.from = numero

    var createdAt = new Date(user.data[0].attributes.createdAt)

    await flowDynamic ( `Hola ${user.data[0].attributes.firstname}, recibimos tu registro el ${createdAt.toLocaleDateString('es-ES')} a las ${(createdAt.toLocaleTimeString('es-ES'))}`)
    await flowDynamic ('Responderemos tu solicitud dentro de las proximas 24 horas desde tu registro')
    await flowDynamic ('si tienes dudas envíanos un email a contacto.jappi@gmail.com y con gusto te ayudaremos.')
  })


module.exports = flowRegistradoNOOK;