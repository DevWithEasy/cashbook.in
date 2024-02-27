const api = process.env.NODE_ENV === 'Production' ?  'https://cashbook-devwitheasy.vercel.app/api'  : 'http://localhost:8080/api'

export default api;