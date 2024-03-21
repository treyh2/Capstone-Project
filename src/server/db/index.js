//src/server/db/index.js
module.exports = {
  ...require('./users'),
  ...require('./shoes'),
  ...require('./cart')
}