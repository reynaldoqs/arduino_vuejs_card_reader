import {SERVER_URL} from '../config/urlConfig'
import { crudder } from './crudder'

const base = crudder(SERVER_URL)
export const userSignUp = (data) => {
    const createUser = base('users')
    return createUser.create(data)
}
export const userSignIn = (data) => {
    const loginUser = base('users/login')
    return loginUser.create(data)
}