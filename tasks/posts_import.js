'use strict'

const _ = require('lodash')
const fs = require('fs-extra')
const globby = require('globby')
const yamlFront = require('yaml-front-matter')

const postsPath = __dirname + '/../../akrasia-jekyll/_posts/*.md'
const outPath = __dirname + '/../public/posts'
let dataObj = {}

for (let path of _.reverse(globby.sync(postsPath))) {
  let content = fs.readFileSync(path, 'utf8')
  let yaml = yamlFront.loadFront(content)
  let fileName = _.last(path.split('/'))
  let date = fileName.substr(0, 10)
  let name = fileName.replace(date + '-', '').replace('.md', '')

  fs.writeFileSync(outPath + '/' + name + '.md', _.trim(yaml.__content), 'utf8')

  delete yaml.__content
  dataObj[name] = _.assign({}, { date: date }, yaml)

  fs.writeFileSync(outPath + '/_data.json', JSON.stringify(dataObj, null, 2), 'utf8')

  console.log(date, name, yaml.title)
}
