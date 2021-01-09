import { withIronSession } from 'next-iron-session'
import {ironSessionOptions} from '@core/ironSessionOptions'

const handler = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

export default withIronSession(handler, ironSessionOptions)
