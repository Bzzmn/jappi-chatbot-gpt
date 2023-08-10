const { addKeyword } = require("@bot-whatsapp/bot");

const flowDespedida = addKeyword('Salir', {sesitive: true})
.addAnswer ('Aqui estaré cuando me necesites 🖐')

module.exports = flowDespedida;