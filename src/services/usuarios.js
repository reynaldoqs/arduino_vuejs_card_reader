import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const usuarios = (data = {}) => {
    const createUser = base('admin/users')
    return createUser.get(data)
}
export const remove = (data) => {
    const createUser = base('admin/users')
    return createUser.delete(data)
}