import jwt from 'jwt-simple'

const userToken = (user) => jwt.encode({
  sub: user.id,
  iat: new Date().getTime(),
}, process.env.AUTH_KEY)

export default userToken
