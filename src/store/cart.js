export default {
    namespaced: true,
    state: {
        cart: [],
        total: 0,
    },
    getters: {
        cart(state) {
            return state.cart
        },
        total(state) {
            return state.total
        }
    },
    mutations: {
        COMMIT_CART(state, payload) {
            state.cart = payload
        },
        COMMIT_TOTAL(state, payload) {
            state.total = payload
        }
    },

    actions: {
        addToCart({
            commit,
            state
        }, payload) {
            const index = state.cart.findIndex((el) => {
                return el.id === payload.id
            })
            if (index >= 0) {
                state.cart[index].amount += payload.amount
                state.cart[index].total = state.cart[index].amount * state.cart[index].price
            } else {
                state.cart.unshift(payload)
            }
            let value = 0
            state.cart.map(res => {
                value += res.total
            })

            commit('COMMIT_CART', state.cart)
            commit('COMMIT_TOTAL', value)

        },
        deleteItem({
            commit,
            state
        }, payload) {
            const newVal = state.cart.filter(el => el.id !== payload)
            let value = 0
            newVal.map(res => {
                value += res.total
            })
            commit('COMMIT_CART', newVal)
            commit('COMMIT_TOTAL', value)
        },

        emptyCart({
            commit
        }) {
            commit('COMMIT_CART', [])
            commit('COMMIT_TOTAL', 0)
        }
    },
}