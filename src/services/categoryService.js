import axios from "axios";
var url = 'categories'

class CategoryService {
    // paginators
    findPagination = async (page) => {
        const res = await axios.get(url, {
            params: {
                page: page
            }
        })
        return res.data
    }

    findAll = async () => {
        const res = await axios.get(url + '/select')
        return res.data
    }

    create = async (payload) => {
        return await axios.post(url, {
            name: payload
        })
    }

    update = async (payload) => {
        return await axios.put(url, {
            categoryId: payload.id,
            name: payload.name
        })
    }

    deleteOne = async (id) => {
        return await axios.post(url + '/delete', {
            categoryId: id
        })
    }
}

export default new CategoryService()