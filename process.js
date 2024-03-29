

const fs = require('fs')
const taipeiCrawler = require('./crawler/taipei')
const newtaipeiCrawler = require('./crawler/newtaipei')
const tainanCrawler = require('./crawler/tainan')
const kaohsiungCrawler = require('./crawler/kaohsiung')

module.exports = async () => {
  const taipeiData = await taipeiCrawler()
  const newtaipeiData = await newtaipeiCrawler()
  const tainanData = await tainanCrawler()
  const kaohsiungData = await kaohsiungCrawler()

  await fs.writeFileSync('./data/taipei.json', JSON.stringify(taipeiData))
  await fs.writeFileSync('./data/newtaipei.json', JSON.stringify(newtaipeiData))
  await fs.writeFileSync('./data/tainan.json', JSON.stringify(tainanData))
  await fs.writeFileSync('./data/kaohsiung.json', JSON.stringify(kaohsiungData))
  await fs.writeFileSync('./data/all.json', JSON.stringify([
    ...taipeiData,
    ...newtaipeiData,
    ...tainanData,
    ...kaohsiungData,
  ]))
}
