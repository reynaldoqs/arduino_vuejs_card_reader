import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const registrarObjeto = (data) => {
    const postObjetos = base('objetos')
    return postObjetos.create(data)
}
export const objetosRegistrados = (data = {}) => {
    const getObjetos = base('objetos')
    return getObjetos.get(data)
}
export const updateObjeto = (idObjeto,data) => {
    const updateObjetos = base(`objetos/${idObjeto}`)
    return updateObjetos.update(data)
}