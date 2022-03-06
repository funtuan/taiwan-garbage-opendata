
const { downloadCSV } = require('../unit/download')

const garbageKeyDay = [
  'garbageSunday',
  'garbageMonday',
  'garbageTuesday',
  'garbageWednesday',
  'garbageThursday',
  'garbageFriday',
  'garbageSaturday',
]
const recycleKeyDay = [
  'recyclingSunday',
  'recyclingMonday',
  'recyclingTuesday',
  'recyclingWednesday',
  'recyclingThursday',
  'recyclingFriday',
  'recyclingSaturday',
]

function parseTimeText(text) {
  const h = text.substr(0, 2)
  const m = text.substr(3, 2)
  return Number(h) * 60 + Number(m)
}

module.exports = async () => {
  console.log('newtaipei running...')
  let run = true
  let page = 0
  const json = []
  while (run) {
    const data = await downloadCSV(`https://data.ntpc.gov.tw/api/datasets/EDC3AD26-8AE7-4916-A00B-BC6048D19BF8/csv?page=${page}&size=1000`)
    page++
    console.log(`newtaipei page ${page}`)
    json.push(...data)
    if (data.length === 0)run = false
  }
  // console.log('json', json)

  const data = json.reduce((row, one) => {
    row.push({
      address: `新北市${one['city']}${one['name']}`,
      startTime: parseTimeText(one['time']),
      endTime: null,
      lat: Number(one['latitude']),
      lon: Number(one['longitude']),
      garbageDay: [...Array(7).keys()].filter((day) => one[garbageKeyDay[day]] === 'Y'),
      recycleDay: [...Array(7).keys()].filter((day) => one[recycleKeyDay[day]] === 'Y'),
    })
    return row
  }, [])
  // console.log('data', data)

  console.log('newtaipei done')
  return data
}

