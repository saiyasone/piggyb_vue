import UnitService from "@/services/unitService"

export default {
    namespaced: true,
    state: {
        units: [],
        items: [],
        totalItems: 0
    },
    getters: {
        units(state) {
            return state.units
        },
        items(state) {
            return state.items
        },
        totalItems(state) {
            return state.totalItems
        },
    },
    mutations: {
        SET_UNITS(state, payload) {
            state.units = payload
        },
        SET_ITEMS(state, payload) {
            state.items = payload
        },
        SET_TOTAL(state, payload) {
            state.totalItems = payload
        },
    },
    actions: {
        getAllUnit() {
            UnitService.findAll().then(res => {
                console.log(res);
            })
        },
        getUnits({
            commit
        }, payload) {
            const params = payload - 1
            UnitService.findPaginations(params).then(res => {
                const units = []
                for (const data of res.items) {
                    units.push(data)
                }
                commit('SET_ITEMS', units)
                commit('SET_TOTAL', res.totalItems)
            })
        }
    },
}