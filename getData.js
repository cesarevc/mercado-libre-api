const axios = require('axios');

const SITE_ID = 'MLM'; //define el pais 
const mercadoURL = `https://api.mercadolibre.com/sites/${SITE_ID}/`;

const getCompanyData = async ( nickname ) => {

    // validamos que recibe un nickname
    if(!nickname){
        throw new Error(`No has enviado el nickname de la compañia`);
    }
        
    // creamos la instancia que recibe la url para obetener el id del seller/company basado en el nickname
    const instance = axios.create({ 
        baseURL: `${mercadoURL}search?nickname=${nickname}`
    });

    // request by axios
    const { data } = await instance.get();

    // validamos que existan resultados
    if(!data.seller) {
        throw new Error(`No hay resultados para ${ nickname }`);
    }

    const {seller: { id }, site_id, results } = data;

    // manejo de datos de results
    const res = results.map(result => {
        const {
            title,
            seller: { id },
            price,
            available_quantity,
            permalink,
            seller_address,
            shipping,
            attributes,
        } = result;

        const data = {
            title,
            seller_id: id,
            price,
            available_quantity,
            link: permalink,
            seller_address,
            shipping,
            attributes,
        }

        return data
    });

    // manejo de datos para api response
    const response = { meli_id: id, site_id, results: res }
    
    return response;

}

const getArticles = async ( id ) => {

    // validamos que recibe un id
    if(!id){
        throw new Error(`No has enviado el id de la compañia`);
    }

    // creamos la instancia que recibe la url para obetener los productos por el id del seller/company
    const instance = axios.create({ 
        // ordenado por el de menor precio price_asc
        baseURL: `${mercadoURL}search?seller_id=${id}&sort=price_asc`
    });

    // request by axios
    const { data } = await instance.get();

    const { seller: { nickname }, results } = data;
    

    // for (const prop in data) {
    //     console.log(prop)
    // }

    // manejo de datos para api response
    const response = results.map(result => {
        const {
            title,
            price,
            seller: {id},
            shipping: {free_shipping, logistic_type},
            seller_address: {country, state, city},
            condition,
        } = result;

        const data = {
            seller_id: id,
            seller_name: nickname,
            brand: title,
            shipping: { free_shipping, logistic_type },
            seller_address: {country, state, city},
            condition,
            price
        }

        return data;

    });

    return  response;
}

module.exports = {
    getCompanyData,
    getArticles
}


