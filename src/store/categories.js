import CategoryService from "@/services/categoryService"
export default {
    namespaced: true,
    state: {
        categories: [],
        items: [],
        totalItems: 0,
        page: 1
    },
    getters: {
        categories(state) {
            return state.categories
        }
    },
    mutations: {
        COMMIT_TOTAL(state, payload) {
            state.totalItems = payload
        },
        COMMIT_AllCategories(state, payload) {
            state.categories = payload
        },
        COMMIT_CATEGORIES(state, payload) {
            state.items = payload
        },
    },
    actions: {
        getCategories({
            state,
            commit
        }) {
            CategoryService.findPagination(state.page).then(res => {
                const items = []
                for (const data of res.items) {
                    items.push(data)
                }
                commit('COMMIT_CATEGORIES', items)
                commit('COMMIT_TOTAL', res.totalItems)
            }).catch(() => {

            })
        },

        getAllCategories({
            commit
        }) {
            CategoryService.findAll().then(res => {
                const categories = []
                for (const data of res.categories) {
                    categories.push(data)
                }
                commit('COMMIT_AllCategories', categories)
            }).catch(() => {})
        },

        createCategory({
            dispatch
        }, payload) {
            CategoryService.create(payload).then(() => {
                dispatch('getAllCategories')
            }).catch(() => {})
        },

        updateCategory({
            dispatch
        }, payload) {
            CategoryService.update(payload).then(() => {
                dispatch('getAllCategories')
            }).catch(() => {})
        },

        deleteCategory({
            dispatch
        }, payload) {
            CategoryService.deleteOne(payload).then(() => {
                dispatch('getAllCategories')
            }).catch(() => {})
        },
    },
}