'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  LOCAL_HOST:'"yanguo"',
  NODE_ENV: '"development"'
})
