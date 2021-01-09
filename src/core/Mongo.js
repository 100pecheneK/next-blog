import mongoose from 'mongoose'

const connection = {
  isConnected: false,
}

const connectDb = async () => {
  if (connection.isConnected) {
    return
  }
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    connection.isConnected = !!dbConnection.connections[0].readyState
  } catch (err) {
    console.error(`error connecting to db ${err.message || err}`)
  }
}

const mondoMiddleware = (req, res, next) => {
  connectDb()
  next()
}
const withMongo = handler => {
  return ctx => {
    connectDb()
    return handler(ctx)
  }
}
export { mondoMiddleware, withMongo }
