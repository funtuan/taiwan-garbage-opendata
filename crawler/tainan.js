
const { downloadCSV } = require('../unit/download')

function parseTimeText(text) {
  const h = text.substr(0, 2)
  const m = text.substr(3, 2)
  return Number(h) * 60 + Number(m)
}

module.exports = async () => {
  console.log('tainan running...')
  const json = await downloadCSV(`https://www.tnepb.gov.tw/opendata/TrashRoutes.csv`)
  // console.log('json', json)

  const data = json.reduce((row, one) => {
    row.push({
      address: `台南市${one['AREA']}${one['POINTNAME']}`,
      startTime: parseTimeText(one['TIME']),
      endTime: null,
      lat: Number(one['LATITUDE']),
      lon: Number(one['LONGITUDE']),
      garbageDay: one['WORDDAY'].split(',').map((day) => day === '7' ? 0 : Number(day)),
      recycleDay: one['RECYCLEDAY'].split(',').map((day) => day === '7' ? 0 : Number(day)),
    })
    return row
  }, [])
  // console.log('data', data)

  console.log('tainan done')
  return data
}

