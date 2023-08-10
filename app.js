require("dotenv").config()
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

//FLOWS

const flowPrincipal = require("./flows/flowPrincipal");
const flowNuevo = require("./flows/flowNuevo");
const flowDespedida = require("./flows/flowDespedida");
const flowRegistro = require("./flows/flowRegistro");
const flowRegistradoNOOK = require("./flows/flowRegistradoNOOK");
const { flowProfesor_consulta } = require("./flows/flowProfesor_consulta");
const flowProfesor = require("./flows/flowProfesor");
const flowAlumno = require("./flows/flowAlumno");
const flowApoderado = require("./flows/flowApoderado");

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterProvider = createProvider(BaileysProvider)
    const adapterFlow = createFlow([
        flowPrincipal,
        flowNuevo,
        flowDespedida,
        flowRegistro,
        flowRegistradoNOOK,
        flowProfesor,
        flowAlumno,
        flowApoderado,
        flowProfesor_consulta(chatGPT),
    ])

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
