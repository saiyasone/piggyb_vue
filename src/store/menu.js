import MenuService from "@/services/menuService"

export default {
    namespaced: true,
    state: {
        menus: [],
        items: [],
        page: 1,
        totalItems: 0
    },
    getters: {
        menus(state) {
            return state.menus
        }
    },
    mutations: {
        SET_MENUS(state, payload) {
            state.menus = payload
        },
        SET_ITEMS(state, payload) {
            state.items = payload
        },
        SET_TOTAL_ITEM(state, payload) {
            state.totalItems = payload
        }
    },

    actions: {
        getMenuAll({
            commit
        }) {
            commit('SET_LOADING', true, {
                root: true
            })
            MenuService.findAll().then(res => {
                const menus = []
                for (const data of res.menus) {
                    menus.push(data);
                }
                commit('SET_LOADING', false, {
                    root: true
                })
                commit('SET_MENUS', menus)
            }).catch(() => {
                commit('SET_LOADING', false, {
                    root: true
                })
            })
        }
    },
}
