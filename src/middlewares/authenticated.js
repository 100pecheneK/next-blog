import {verify} from 'jsonwebtoken'
import {SECRET} from '../../config'


const authenticated = (req, res, next) => {
  try {
    const user = {}
    const token = verify(req.cookies.auth, SECRET)
    user.id = token.userId
    user.authToken = req.cookies.auth
    req.user = user
    return next()
  } catch (e) {
    return res.status(401).json({message: 'No token'})
  }
}

export default authenticated
