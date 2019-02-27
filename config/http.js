import axios from 'axios'
axios.defaults.baseURL = 'http://116.62.69.124/xmd'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
// axios.defaults.baseURL = '/xmd'
export default axios
