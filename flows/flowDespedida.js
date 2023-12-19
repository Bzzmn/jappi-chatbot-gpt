const { addKeyword } = require("@bot-whatsapp/bot");

const flowDespedida = addKeyword('Salir', {sesitive: true})
.addAnswer ('¡Juntos lograremos grandes cosas! 😊🤖')

module.exports = flowDespedida;