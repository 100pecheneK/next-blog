import { User } from '@models/User'

export const reqWithUserMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -createdAt -updatedAt -__v')
      .lean()
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    req.user = user
    next()
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found.' })
    }
  }
}
