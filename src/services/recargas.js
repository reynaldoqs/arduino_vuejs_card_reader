
import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const recargar = (data) => {
    const createUser = base('recarga')
    return createUser.create(data)
}
export const recargas = (data = {}) => {
    const createUser = base('recarga')
    return createUser.get(data)
}