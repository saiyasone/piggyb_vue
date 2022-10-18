import router from "@/router/router"
import axios from "axios"
import Authentication from "@/services/authService"
import VueJwtDecode from "vue-jwt-decode"

export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        userId: '',
        roles: []
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated
        },
        token(state) {
            return state.accessToken
        },
        userId(state) {
            return state.userId
        },
        roles(state) {
            return state.roles
        },
        refreshToken(state) {
            return state.refreshToken
        }
    },
    mutations: {
        COMMIT_SUCCESS(state, payload) {
            state.isAuthenticated = true
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.userId = payload.userId
            state.roles = payload.roles
        },
        COMMIT_FAIL(state) {
            state.isAuthenticated = false
            state.accessToken = ''
            state.refreshToken = ''
            state.roles = []
            state.userId = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('roles')
            localStorage.removeItem('refreshToken')
        },

    },
    actions: {
        login({
            commit
        }, payload) {
            Authentication.onLogin(payload).then(res => {
                const decodeToken = VueJwtDecode.decode(res.accessToken)
                const data = {
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    userId: decodeToken.userId,
                    roles: decodeToken.roles
                }

                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('roles', data.roles)
                localStorage.setItem('refreshToken', data.refreshToken)
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`
                commit('COMMIT_SUCCESS', data)
                router.push('/core')
            }).catch(() => {
                commit('COMMIT_FAIL')
            })
        },

        refreshToken({
            getters,
            commit
        }) {
            const syncToken = {
                userId: getters.userId,
                refreshToken: getters.refreshToken
            }
            Authentication.onRefreshToken(syncToken).then(res => {
                const decodeToken = VueJwtDecode.decode(res.accessToken)
                const data = {
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    userId: decodeToken.userId,
                    roles: decodeToken.roles
                }

                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('roles', data.roles)
                localStorage.setItem('refreshToken', data.refreshToken)
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`
                commit('COMMIT_SUCCESS', data)
                router.push('/').then(() => {
                    window.location.reload()
                })
            })
        },

        autoLogin({
            commit
        }) {
            const accessToken = localStorage.getItem('token')
            const refreshToken = localStorage.getItem('refreshToken')

            if (accessToken && refreshToken) {
                const decodeToken = VueJwtDecode.decode(accessToken)
                const data = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    userId: decodeToken.userId,
                    roles: decodeToken.roles
                }
                commit('COMMIT_SUCCESS', data)
            } else {
                commit('COMMIT_FAIL')
            }
        },

        logout({
            commit
        }) {
            return new Promise((_, resolve) => {
                commit('COMMIT_FAIL')
                router.push('/login').then(() => {
                    window.location.reload()
                })
                resolve()
            })
        }
    },
}