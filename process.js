

const fs = require('fs')
const taipeiCrawler = require('./crawler/taipei')
const newtaipeiCrawler = require('./crawler/newtaipei')

module.exports = async () => {
  const taipeiData = await taipeiCrawler()
  const newtaipeiData = await newtaipeiCrawler()

  await fs.writeFileSync('./data/taipei.json', JSON.stringify(taipeiData))
  await fs.writeFileSync('./data/newtaipei.json', JSON.stringify(newtaipeiData))
  await fs.writeFileSync('./data/all.json', JSON.stringify([
    ...taipeiData,
    ...newtaipeiData,
  ]))
}
