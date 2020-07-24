if (process.env.NEXT_PUBLIC_ENV === 'testing') require('dotenv').config();
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
