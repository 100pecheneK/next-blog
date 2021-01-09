import session from '@api-utils/session'
import { mondoMiddleware } from '@core/Mongo'
import { ironLoginRequired } from '@middlewares/ironLoginRequired'
import { reqWithUserMiddleware } from '@middlewares/reqWithUser'
import Post from '@models/Post'
import nextConnect from 'next-connect'
import nextConnectOptions from '@api-utils/nextConnectOptions'

const getHandle = async (req, res) => {
  /**
   * 1 - ?q=all return all posts
   * 2 - ?q=byUser return posts by given userId
   * 3 - ?q=my return posts of current user
   * 4 - ?q=one return one post by given id
   *
   * - ?page=number return posts by given page (usage in 123)
   * - ?perPage=number return 'number' per page posts by given perPage (usage in 123)
   * - ?userId=string userId of user posts (usage in 2)
   * - ?id=string id of user post (usage in 4)
   */
  const postsQuery = {
    async all({ query: { first, page, perPage } }) {
      const options = {
        limit: +perPage || 10,
        populate: {
          path: 'user',
          select: '-password -createdAt -updatedAt -__v',
        },
        sort: { createdAt: -1 },
      }

      if (first) {
        const firstPost = await Post.findById(first)
        const youngerPostsCount = await Post.countDocuments({
          createdAt: { $gt: firstPost.createdAt },
        })
        const offset = +youngerPostsCount + (+page - 1) * +perPage
        options.offset = offset
      }
      console.log('all -> options', options)

      const postss = await Post.paginate({}, options)
      console.log(postss)
      return postss
    },
    async byUser({ query: { userId, page, perPage } }) {
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        populate: {
          path: 'user',
          select: '-password -createdAt -updatedAt -__v',
        },
        sort: { createdAt: -1 },
      }
      return await Post.paginate({ user: userId }, options)
    },
    async my({ userId, query: { page, perPage } }) {
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        populate: {
          path: 'user',
          select: '-password -createdAt -updatedAt -__v',
        },
        sort: { createdAt: -1 },
      }
      return await Post.paginate({ user: userId }, options)
    },
    async one({ query: { id } }) {
      const post = await Post.findById(id)
      if (!post) throw new PostNotFound()
      return post
    },
  }
  try {
    if (!req.query.q) return res.status(400).json({ error: 'Invalid query' })
    const message = await postsQuery[req.query.q](req)
    return res.json({ message })
  } catch (err) {
    switch (err.kind) {
      case 'ObjectId':
      case 'PostNotFound':
        return res.status(404).json({ message: 'Post not found' })
      default:
        return res.status(500).json({ message: err.message })
    }
  }
}

const postHandle = async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Text required' })
  const post = new Post({ text, user: req.user._id })
  await post.save()
  return res.json({ message: post })
}

const common = nextConnect({ nextConnectOptions }).get(getHandle)
const authHandle = nextConnect({ nextConnectOptions })
  .use(session)
  .use(ironLoginRequired)
  .use(reqWithUserMiddleware)
  .post(postHandle)

export default nextConnect(nextConnectOptions)
  .use(common)
  .use(authHandle)
  .put(async (req, res) => {
    // TODO: Редактирование
  })
  .delete(async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Id required' })
    const post = await Post.findById(id)
    if (!post || post.user.toString() !== req.userId) {
      return res.status(404).json({ error: 'Post not found' })
    }
    await post.remove()
    return res.status(401).json({ message: 'Delete success' })
  })

class PostNotFound extends Error {
  constructor() {
    super()
    this.message = 'Post not found'
    this.kind = 'PostNotFound'
  }
}
