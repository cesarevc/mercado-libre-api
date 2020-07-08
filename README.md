# EXAMEN (API REST)

## Construido con 🛠️

* [nodejs](https://nodejs.org/es/) - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [express](https://expressjs.com/es/) - is a web application framework for nodejs.

### Instalación 

Este proyecto requiere [Nodejs](https://nodejs.org/) v4+ 

Instala las dependencias y dependencias de desarrollo ejecutando:

```sh
$ npm install
or
$ npm i
```


### Despliegue del servidor 
Este proyecto correra en el puerto 5000

```sh
$ npm start
```
## Endpoints

_se utilizaron los datos de CELULANDIA STORE para las pruebas_

http://localhost:5000/api/getCompanyData/CELULANDIA STORE

http://localhost:5000/api/getCompanyArticles/84331371

## INFO

La aplicacion tambien se encuentra en el servicio web de heroku en la siguiente dirección

https://cesarevc-api-ml.herokuapp.com/

los endpoints quedarian de la siguiente manera siendo ambas peticiones de tipo get

https://cesarevc-api-ml.herokuapp.com/api/getCompanyData/CELULANDIA STORE
https://cesarevc-api-ml.herokuapp.com/api/getCompanyArticles/84331371