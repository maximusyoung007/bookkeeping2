import axios from "axios"

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: "", // 设置基本URL
  timeout: 50000, // 设置超时时间
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }, // 设置请求头
})

instance.defaults.withCredentials=true

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理，比如添加loading效果
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 返回具体数据
    return response.data
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

export default instance