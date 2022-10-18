import Address from "@/services/addressService"

export default {
    state: {
        province: {
            provinces: [],
            items: [],
        },
        district: {
            districts: [],
            items: []
        }
    },
    getters: {
        provinces(state) {
            return state.province.provinces
        },
        districts(state) {
            return state.district.districts
        },
    },
    mutations: {
        COMMIT_PROVINCE_ALL(state, payload) {
            state.province.provinces = payload
        },
        COMMIT_DISTRICT_ALL(state, payload) {
            state.district.districts = payload
        }
    },
    actions: {
        getProvinceAll({
            commit
        }) {
            Address.getProvinceAll().then(res => {
                const provinces = []
                for (const data of res.provinces) {
                    provinces.push(data)
                }
                commit('COMMIT_PROVINCE_ALL', provinces)
            })
        },

        getDistrictAll({
            commit
        }, payload) {

            Address.getDistrictAll(payload).then(res => {
                const districts = []
                for (const data of res.districts) {
                    districts.push(data)
                }

                commit('COMMIT_DISTRICT_ALL', districts)
            })
        }
    },
}