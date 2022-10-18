import axios from "axios"

class Address {
    async getProvinceAll() {
        const res = await axios.get('provinces/select')
        return res.data
    }

    async getDistrictAll(id) {
        const res = await axios.get(`districts/${id}/select`)
        return res.data
    }
}

export default new Address();