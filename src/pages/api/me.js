import { ironLoginRequired } from '@middlewares/ironLoginRequired'
import session from '@api-utils/session'
import { mondoMiddleware } from '@core/Mongo'
import { reqWithUserMiddleware } from '@middlewares/reqWithUser'
import nextConnectOptions from '@api-utils/nextConnectOptions'
import nextConnect from 'next-connect'
export default nextConnect(nextConnectOptions)
  .use(session)
  .use(ironLoginRequired)
  .use(mondoMiddleware)
  .use(reqWithUserMiddleware)
  .get(async (req, res) => {
    return res.json({ message: req.user })
  })
