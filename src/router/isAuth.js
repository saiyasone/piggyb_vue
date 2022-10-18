import store from "@/store"
export default async (to, from, next) => {
    if (await store.getters['auth/isAuthenticated']) {
        return next()
    } else {
        return next({
            name: 'login'
        })
    }
}