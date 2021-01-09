export const ironSessionOptions = {
  cookieName: 'iron',
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
