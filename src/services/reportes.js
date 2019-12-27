
import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const reportes = (data = {}) => {
    const createUser = base('reportes')
    return createUser.get(data)
}