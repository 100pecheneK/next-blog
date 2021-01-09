require('dotenv').config()

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
  },
  pageExtensions: ['jsx', 'js'],
}
