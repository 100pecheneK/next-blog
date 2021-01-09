export const ironLoginRequired = (req, res, next) => {
  const session = req.session.get('user')
  if (!session?.id) {
    return res.status(403).json({ message: 'Invalid session' })
  }
  req.userId = session.id
  next()
}
