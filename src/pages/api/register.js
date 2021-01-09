import { User } from '../../models/User'
import session from '../../api-utils/session'
import { mondoMiddleware } from '../../core/Mongo'
import nextConnect from 'next-connect'
import nextConnectOptions from '@api-utils/nextConnectOptions'
export default nextConnect(nextConnectOptions)
  .use(session)
  .use(mondoMiddleware)
  .post(async (req, res) => {
    const { username, password, email } = req.body
    if (!(username && password && email)) {
      return res.status(403).json({ error: 'All fields are required.' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(403)
        .json({ error: 'User with this email already exists.' })
    }

    const user = new User({ username, password, email })
    await user.save()

    req.session.set('user', {
      id: user._id,
    })
    await req.session.save()

    res.json({ message: 'Success register and login. You are welcome!' })
  })
