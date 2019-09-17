
export default (to, from, next) =>  {

    const publicPages = ['/login']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = sessionStorage.getItem('user')
    if(authRequired && !loggedIn){
        next('/login')
    }
    next()
   
}