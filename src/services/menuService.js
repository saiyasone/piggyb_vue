import axios from "axios"
const url = 'menus'

class MenuService {

    async findAll() {
        const res = await axios.get(url + '/select')
        return res.data
    }

    async findAllPagination(page) {
        const res = await axios.get(url, {
            params: {
                page: page
            }
        })
        return res.data
    }
}

export default new MenuService()
