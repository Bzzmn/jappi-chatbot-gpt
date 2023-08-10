const axios = require("axios")

/**
 * Obtenemos datos del usuario basado en el numero de telefono
 * @param {*} phone
 * @returns
 */

const getUser = async (phone) => {

  try {
    var config = {
      method: "get",
      url: `http://127.0.0.1:1337/api/usuarios?filters[phone][$eq]=${phone}`,
      //url: `http://127.0.0.1:1337/api/usuarios?filters[phone][$eq]=56988887766`,
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
 * Consultamos el ticket de soporte
 * @param {*} id
 * @returns
 */

/*
const getTicket = async (id) => {
  try {
    var config = {
      method: "get",
      url: `http://127.0.0.1:1337/api/tickets?populate[user_id][filters][id][$eq]=${id}`,
      //url: `https://api-jmhpt.strapidemo.com/api/tickets?populate[user_id][filters][id][$eq]=${id}`,
      headers: {
        Authorization: process.env.STRAPI_KEY,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

*/

const regUser = async (datosEntrantes) => {


  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:1337/api/usuarios',
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
