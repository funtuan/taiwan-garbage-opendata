

const fs = require('fs')
const taipeiCrawler = require('./crawler/taipei')

module.exports = async () => {
  const taipeiData = await taipeiCrawler()

  await fs.writeFileSync('./data/taipei.json', JSON.stringify(taipeiData))
  await fs.writeFileSync('./data/all.json', JSON.stringify([
    ...taipeiData,
  ]))
}
