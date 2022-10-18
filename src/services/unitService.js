import axios from "axios"
const url = 'units'
class UnitService {

    async findPaginations(page) {
        const res = await axios.get(url, {
            params: {
                page: page
            }
        })
        return res.data
    }

    async findAll() {
        const res = await axios.get(url + '/select')
        return res.data
    }
}

export default new UnitService()