import axios from 'axios'
export const crudder = domain => resource => {
    const url = `${domain}/${resource}`
    const user =  sessionStorage.getItem('user')
    return ({
        create: (x) => axios({
                method: 'post',
                url: url,
                headers: user? {'Authorization' : `Bearer ${JSON.parse(user).token}`}:{},
                data: x
            })
    })   
}
