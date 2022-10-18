import shopService from "@/services/shopService"
export default {
    namespaced: true,
    state: {
        shops: [],
        items: [],
        shop: null,
        totalItems: 0,
        stock: {
            items: [],
            total: 0
        }
    },

    getters: {
        shops(state) {
            return state.shops
        },
        items(state) {
            return state.items
        },
        shop(state) {
            return state.shop
        },
        totalItems(state) {
            return state.totalItems
        },
        stockItems(state) {
            return state.stock.items
        },
        stockTotal(state) {
            return state.stock.total
        }
    },

    mutations: {
        SET_ITEMS(state, payload) {
            state.items = payload
        },
        SET_SHOPS(state, payload) {
            state.shops = payload
        },
        SET_SHOP(state, payload) {
            state.shop = payload
        },
        SET_TOTAL(state, payload) {
            state.totalItems = payload
        },

        SET_STOCK_ITEM(state, payload) {
            state.stock.items = payload
        },
        SET_STOCK_TOTAL(state, payload) {
            state.stock.total = payload
        },

    },

    actions: {
        getShops({
            commit
        }, payload) {
            const param = payload - 1
            shopService.getShops(param).then(res => {
                const shops = []
                for (const data of res.items) {
                    shops.push(data)
                }

                commit('SET_ITEMS', shops)
                commit('SET_TOTAL', res.totalItems)
            })
        },

        getShop({
            commit
        }, payload) {
            shopService.getShopById(payload).then(res => {
                commit('SET_SHOP', res.shop)
            })
        },

        getStocks({
            commit
        }, payload) {
            const params = {
                shopId: payload.id,
                page: payload.page - 1
            }
            shopService.getShopStock(params).then(res => {
                const items = []
                for (const data of res.items) {
                    items.push(data)
                }

                commit('SET_STOCK_TOTAL', res.totalItems)
                commit('SET_STOCK_ITEM', items)
            }).catch(() => {

            })
        }
    },
}