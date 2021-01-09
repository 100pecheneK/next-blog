import mongoose from 'mongoose'

export default function createModel(modelName, schema) {
  return mongoose.models[modelName] || mongoose.model(modelName, schema)
}
