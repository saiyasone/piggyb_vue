import ProductService from "@/services/productService"

export default {
    namespaced: true,
    state: {
        products: [],
        items: [],
        totalItems: 0,

    },
    getters: {
        products(state) {
            return state.products
        },
        productItems(state) {
            return state.items
        },

        totalItems(state) {
            return state.totalItems
        }
    },
    mutations: {
        COMMIT_PRODUCT_ALL(state, payload) {
            state.products = payload
        },
        COMMIT_PRODUCT_ITEMS(state, payload) {
            state.items = payload
        },
        COMMIT_TOTAL_ITEM(state, payload) {
            state.totalItems = payload
        }
    },
    actions: {
        getProducts({
            commit
        }, payload) {
            ProductService.getProductPage(payload - 1).then(res => {
                const items = []
                for (const data of res.items) {
                    items.push(data)
                }
                commit('COMMIT_PRODUCT_ITEMS', items)
                commit('COMMIT_TOTAL_ITEM', res.totalItems)
            })
        },
        getAllProducts({
            commit
        }) {
            ProductService.getProductAll().then(res => {
                const products = []
                for (const data of res.products) {
                    products.push(data)
                }
                commit('COMMIT_PRODUCT_ALL', products)
            })
        }
    },
}
