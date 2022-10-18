import store from "@/store";

class AuthService {
    accessToken() {
        const isAuthenticated = store.getters['auth/isAuthenticated']
        if (isAuthenticated) {
            return {
                "Authorization": `Bearer ${store.getters['auth/token']}`
            }
        } else {
            return ''
        }
    }
}

export default new AuthService();