import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const createCliente = (data) => {
    const createClient = base('clientes')
    return createClient.create(data)
}
export const getClientes = (data = {}) => {
    const getClients = base('clientes')
    return getClients.get(data)
}
export const updateCliente = (idClient,data) => {
    const getClients = base(`clientes/${idClient}`)
    return getClients.update(data)
}