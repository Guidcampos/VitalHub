import axios from 'axios'
//Declarar porta da api
const portaApi = '4466'
//Declarar o ip da máquina
const ip = '192.168.21.125'
//definir url padrão
const apiUrlLocal = `http://${ip}:${portaApi}/api`
//Trazer a configuração do axios
const api = axios.create({
    baseURL : apiUrlLocal

})

export default api;