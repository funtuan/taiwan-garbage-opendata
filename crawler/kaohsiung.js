
const { downloadCSV } = require('../unit/download')

const dayText = ['日', '一', '二', '三', '四', '五', '六']
function parseTimeText(text) {
  const h = text.substr(0, 2)
  const m = text.substr(3, 2)
  return Number(h) * 60 + Number(m)
}

module.exports = async () => {
  console.log('kaohsiung running...')
  const json = await downloadCSV(`https://data.kcg.gov.tw/dataset/074c805a-00e1-4fc5-b5f8-b2f4d6b64aa4/resource/a6ba725a-488c-4d40-b5a2-c2fe65d3e134/download/ksepb.csv`)
  // console.log('json', json)

  const data = json.reduce((row, one) => {
    if (one['停留時間'] !== '') {
      one['停留時間'] = one['停留時間'].replace('～', '-').replace('~', '-')
      row.push({
        address: `高雄市${one['行政區']}${one['停留地點']}`,
        startTime: parseTimeText(one['停留時間'].split('-')[0]),
        endTime: one['停留時間'].split('-').length > 1 ? parseTimeText(one['停留時間'].split('-')[1]) : null,
        lat: Number(one['緯度']),
        lon: Number(one['經度']),
        garbageDay: [1, 2, 4, 5, 6],
        recycleDay: one['回收日'].split('、').map((d) => dayText.indexOf(d)),
      })
    }
    return row
  }, [])
  // console.log('data', data)

  console.log('kaohsiung done')
  return data
}

