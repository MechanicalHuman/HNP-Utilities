'use strict'

const fp = require('lodash/fp')
const fs = require('fs')
const path = require('path')
const licenses = require('./licenses.json')
const now = new Date()

const findByValue = value => fp.find(['value', value])(licenses)

const getTemplate = fp.pipe(
  findByValue,
  ({ value }) => path.resolve(__dirname, 'templates', `${value}.txt`),
  fs.readFileSync,
  fp.template
)

const isValid = fp.pipe(
  findByValue,
  fp.negate(fp.isEmpty)
)

exports.normalize = value => (isValid(value) ? value : 'UNLICENSED')

exports.generate = (value, author) => {
  return getTemplate(exports.normalize(value))({
    author,
    year: now.getFullYear()
  })
}
