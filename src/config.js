const fs = require('fs-extra')
const path = require('path')
const YAML = require('yaml')

if (!fs.pathExistsSync('./authme/config.yml')) {
  fs.ensureDirSync('./authme')
  fs.copyFileSync(
    path.join(__dirname, '../default/config.yml'),
    './authme/config.yml'
  )
}
const file = fs.readFileSync('./authme/config.yml', 'utf8')
exports.config = YAML.parse(file)
