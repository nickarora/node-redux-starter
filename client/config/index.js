const devEndpoint = `http://localhost:${process.env.PORT}`
const prodEndpoint = `http://localhost:${process.env.PORT}`

export default {
  endpoint: process.env.NODE_ENV === 'development' ? devEndpoint : prodEndpoint,
}
