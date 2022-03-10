
const { downloadCSV } = require('../unit/download')

const taipeiGeneralGarbageDay = [1, 2, 4, 5, 6]
const taipeiRecycleGarbageDay = [2, 4, 6]

function parseTimeText(text) {
  const h = text.substr(0, 2)
  const m = text.substr(2, 2)
  return Number(h) * 60 + Number(m)
}

module.exports = async () => {
  console.log('taipei running...')
  const json = await downloadCSV('https://data.taipei/api/getDatasetInfo/downloadResource?id=6bb3304b-4f46-4bb0-8cd1-60c66dcd1cae&rid=60524c47-412c-41b4-ac8f-79d29a9deca7', {
    format: 'big5',
  })

  const data = json.reduce((row, one) => {
    row.push({
      address: one['地點'],
      startTime: parseTimeText(one['抵達時間']),
      endTime: parseTimeText(one['離開時間']),
      // 台北經度緯度數據顛倒
      lat: Number(one['經度']),
      lon: Number(one['緯度']),
      garbageDay: taipeiGeneralGarbageDay,
      recycleDay: taipeiRecycleGarbageDay,
    })
    return row
  }, [])

  console.log('taipei done')
  return data
}

