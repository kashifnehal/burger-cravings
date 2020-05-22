import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgercravings.firebaseio.com/'
});

export default instance;