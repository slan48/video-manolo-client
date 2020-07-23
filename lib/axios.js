import axios from "axios";
import Cookies from 'js-cookie';

if (Cookies.get('token')){
  axios.defaults.headers.common['Authorization'] = Cookies.get('token');
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
