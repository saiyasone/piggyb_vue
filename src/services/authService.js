import axios from "axios";

class Authentication {
  onLogin = async (payload) => {
    const res = await axios.post('auth/login', {
      email: payload.email,
      password: payload.password
    })
    return res.data
  }

  onRefreshToken = async (payload) => {
    const res = await axios.post('auth/refresh-token', {
      userId: payload.userId,
      refreshToken: payload.refreshToken
    })
    return res.data
  }

}

export default new Authentication()
