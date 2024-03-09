const api = process.env.NODE_ENV === 'Production' ?  'https://cashbook-in-api.onrender.com/api'  : 'http://localhost:8080/api'

export default api;