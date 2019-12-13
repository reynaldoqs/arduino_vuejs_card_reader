import axios from 'axios'
export const crudder = domain => resource => {
    const url = `${domain}/${resource}`
    const user =  sessionStorage.getItem('user')
    console.log(JSON.parse(user))
    return ({
        create: (x) => axios({
                method: 'post',
                url: url,
                headers: user? {'Authorization' : `Bearer ${JSON.parse(user).token}`}:{},
                data: x
            }),
        update: (x) => axios({
                method: 'patch',
                url: url,
                headers: user? {'Authorization' : `Bearer ${JSON.parse(user).token}`}:{},
                data: x
            }),
        get: (x) => axios({
                method: 'get',
                url: url,
                headers: user? {'Authorization' : `Bearer ${JSON.parse(user).token}`}:{},
                params: x
            }),
        delete: (x) => axios({
                method: 'delete',
                url: url,
                headers: user? {'Authorization' : `Bearer ${JSON.parse(user).token}`}:{},
                data: x
            })
    })   
}
