import { Schema } from 'mongoose'
import createModel from './createModel'
import mongoosePaginate from 'mongoose-paginate-v2'
export const PostSchema = new Schema(
  {
    text: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

PostSchema.plugin(mongoosePaginate)

const Post = createModel('Post', PostSchema)

export default Post
