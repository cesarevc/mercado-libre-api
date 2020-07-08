'use strict'
const axios = require('axios');

const SITE_ID = 'MLM'; //define el pais 
const mercadoURL = `https://api.mercadolibre.com/sites/${SITE_ID}/`;


const controller = {
    getCompanyData: async (req, res) => {

        //recibimos el nickname
        const nickname = req.params.nickname;

         // validamos que recibe un nickname
        if(!nickname){
            return res.status(404).send({
                status: 'error',
                message: `No se ah realizado la consulta, se requiere el nickname de la compañia/seller`
            });
        }
            
        // creamos la instancia que recibe la url para obetener el id del seller/company basado en el nickname
        const instance = axios.create({ 
            baseURL: `${mercadoURL}search?nickname=${nickname}`
        });


        // request by axios
        const { data } = await instance.get();

        // validamos que existan resultados
        if(!data) {
            return res.status(500).send({
                status: 'error',
                message: `Error en el servidor`
            });
        }
        
        if(!data.seller) {
            return res.status(404).send({
                status: 'error',
                message: `No hay resultados para ${ nickname }`
            });
        }

        const {seller: { id }, site_id, results } = data;

        // manejo de datos de results
        const response = results.map(result => {
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

        // API RESPONSE        
        return res.status(200).send({
            status: 'success',
            payload: {
                message: 'datos de la empresa',
                meli_id: id,
                site_id,
                results: response
            }
        }) 
    },

    getCompanyArticles: async (req, res) => {

        //recibimos el id
        const id = req.params.id;

        // validamos que recibe un id
        if(!id){
            return res.status(404).send({
                status: 'error',
                message: `No se ah realizado la consulta, se requiere el id de la compañia/seller`
            });
        }

        // creamos la instancia que recibe la url para obetener los productos por el id del seller/company
        const instance = axios.create({ 
            // ordenado por el de menor precio price_asc
            // no filtre a top 1000 porque la documentación dice que por default llevan el offset debajo de 1000
            baseURL: `${mercadoURL}search?seller_id=${id}&sort=price_asc`
        });
        
        // request by axios
        const { data } = await instance.get();

        // validamos que existan resultados
        if(!data) {
            return res.status(500).send({
                status: 'error',
                message: `Error en el servidor`
            });
        }

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
         // API RESPONSE        
         return res.status(200).send({
            status: 'success',
            payload: {
                message: 'articulos de la empresa',
                results: response
            }
        }) 
    }
}


module.exports = controller;