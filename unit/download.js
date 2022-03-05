
const request = require('request')
const csv = require('csvtojson')
const iconv = require('iconv-lite')

module.exports.downloadCSV = (url) => {
  return csv()
      .fromStream(request.get(url).pipe(iconv.decodeStream('big5')))
}
