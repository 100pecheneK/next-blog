const nextConnectOptions = {
  onError(error, _, res) {
    res.status(500).json({ message: `Somethimg went wrong: ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  },
}
export default nextConnectOptions
