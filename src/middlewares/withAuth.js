export const withAuth = handler => {
  return ctx => {
    const session = ctx.req.session.get('user')
    if (!session?.id) {
      return {
        redirect: {
          destination: '/login',
          permanent: true,
        },
      }
    }
    ctx.req.userId = session.id
    return handler(ctx)
  }
}
