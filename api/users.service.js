const axios = require("axios")

/**
 * Obtenemos datos del usuario basado en el numero de telefono
 * @param {*} phone
 * @returns
 */

const getUser = async (phone) => {

  var getUrl =  process.env.URL_ACCESS_USERS
  try {
    var config = {
      method: "get",
      url: `${getUrl}?filters[phone][$eq]=${phone}`,
      headers: { 
        Authorization: process.env.STRAPI_KEY,
      },
    };

    const response = await axios(config)
    return (response.data)
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Registramos al usuario en funcion de los datos entregados
 * @param {*} datosEntrantes
 * @returns
 */

const regUser = async (datosEntrantes) => {

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.URL_ACCESS_USERS,
    headers: { 
      Authorization: process.env.STRAPI_KEY,
      "Content-Type" : "application/json",
     },
    data : JSON.stringify({
      data : datosEntrantes, 
    })
  }
  
  return axios.request(config)
  
  
  } 

module.exports = { regUser, getUser };
