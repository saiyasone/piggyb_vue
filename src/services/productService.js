import axios from "axios"
var url = 'products'

class ProductService {
  getProductPage = async (page) => {
    const res = await axios.get(url, {
      params: {
        page: page
      }
    })
    return res.data
  }

  getProductAll = async  () => {
    const res = await axios.get(url + '/select')
    return res.data
  }
}

export default new ProductService()
