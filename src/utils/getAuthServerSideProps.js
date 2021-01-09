import { withIronSession } from 'next-iron-session'
import { ironSessionOptions } from '@core/ironSessionOptions'
import { User } from '@models/User'
import { withMongo } from '@core/Mongo'
import { withAuth } from '@middlewares/withAuth'

export const privateServerSideProps = withIronSession(
  withAuth(ctx => {
    return { props: { userId: ctx.req.userId } }
  }),
  ironSessionOptions
)
