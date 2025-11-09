const axios = require('axios');
const API_URL = 'http://localhost:5000/api';
module.exports = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });
