import { User } from '@models/User'
import session from '@api-utils/session'
import { mondoMiddleware } from '@core/Mongo'
import nextConnect from 'next-connect'
import nextConnectOptions from '@api-utils/nextConnectOptions'

export default nextConnect(nextConnectOptions)
  .use(session)
  .use(mondoMiddleware)
  .post(async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) {
      return res.status(403).json({ error: 'All fields are required.' })
    }
    const existingUser = await User.findOne({ email })
    if (!existingUser || existingUser.password !== password) {
      return res.status(403).json({ error: 'Bad credentials.' })
    }

    req.session.set('user', {
      id: existingUser._id,
    })
    await req.session.save()

    res.json({ message: 'Success login' })
  })
