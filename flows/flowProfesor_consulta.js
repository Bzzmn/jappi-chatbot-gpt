const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

/**
 * Recuperamos el prompt "PROFESOR"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_PROFESOR.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

module.exports = {
  flowProfesor_consulta: (chatgptClass) => {
   return addKeyword("Iniciar", {sensitive:true})
      .addAction(async (ctx, { endFlow, flowDynamic, provider }) => {
        await flowDynamic("iniciando...");
        const jid = ctx.key.remoteJid
        const refProvider = await provider.getInstance()
        refProvider.presenceSubscribe(jid)
        refProvider.sendPresenceUpdate('composing', jid)
        const user = await getUser(ctx.from);//Consultamos a strapi! ctx.from = numero
        const data = await getPrompt();
        await chatgptClass.handleMsgChatGPT(data);//Dicinedole actua!!

        const textFromAI = await chatgptClass.handleMsgChatGPT(
          `profesor=${user.data[0].attributes.firstname}`
        );
        await flowDynamic(textFromAI.text);
      })

      .addAnswer(
        `Para cerrar la sesion escribe *Salir*`,
        { capture: true },
        async (ctx, { fallBack }) => {
          // ctx.body = es lo que la peronsa escribe!!
          
          if(!ctx.body.toLowerCase().includes('Salir')){
              const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
              await fallBack(textFromAI.text);
          }
        }
      )

      
  },
};