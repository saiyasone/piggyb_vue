import axios from "axios"
const url = 'shops'
class ShopService {
    async getShops(page) {
        const res = await axios.get(url, {
            params: {
                page: page
            }
        })
        return res.data
    }

    async getAllShop() {
        const res = await axios.get(url + '/select')
        return res.data
    }

    async getShopById(id) {
        const res = await axios.get(url + `/${id}`)
        return res.data
    }

    async getShopStock(payload) {
        const res = await axios.post(url + '/stock/get-all', {
            shopId: payload.shopId
        }, {
            params: {
                page: payload.page
            }
        })
        return res.data
    }

}

export default new ShopService()