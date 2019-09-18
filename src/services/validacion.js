
import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const validate = (data) => {
    const createUser = base('validacion')
    return createUser.create(data)
}
export const validaciones = (data = {}) => {
    console.log(data)
    const createUser = base('validacion')
    return createUser.get(data)
}