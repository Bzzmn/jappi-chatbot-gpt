const { addKeyword, addAnswer } = require("@bot-whatsapp/bot")
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))
const { getUser } = require("../api/users.service");

const flowRegistradoNOOK = addKeyword ('##_NOOK_##')
.addAction(async (ctx, {flowDynamic}) => {
  await delay(2000)
  const user = await getUser(ctx.from);//Consultamos a strapi! ctx.from = numero
  let createdAt = new Date(user.data[0].attributes.createdAt)
  await flowDynamic ( `Hola ${user.data[0].attributes.firstname}, recibimos tu registro el ${createdAt.toLocaleDateString('es-ES')} a las ${(createdAt.toLocaleTimeString('es-ES'))}`)
  await delay(2000)
  flowDynamic (['Dentro de las próximas 24 horas el servicio será habilitado. Si tienes dudas, contáctanos en alvaro.acevedo.ing@gmail.com',
                '¡Juntos lograremos grandes cosas! 😊🤖🖐'
  ])
})

module.exports = flowRegistradoNOOK;