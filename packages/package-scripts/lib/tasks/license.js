'use strict'

const fp = require('lodash/fp')
const { generate } = require('@hnp/license-generator')
const { LICENSE_PATH } = require('../constants')
const utils = require('../utils')

const current = fp.getOr('UNLICENSED', 'pkg.license')

const author = fp.pipe(
  fp.get('pkg.author'),
  utils.parsePerson,
  fp.get('name')
)

module.exports = ctx =>
  utils.writeFile(LICENSE_PATH, generate(current(ctx), author(ctx)))

// npm config get init-license
// npm config get init-author-name
// npm config get init-author-email
// npm config get init-author-url
