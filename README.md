
## 全台垃圾車清運點開放資料整理

鑑於台灣各縣市清運開放資料來源散落各處、格式不同統一以及缺乏重要定位數據（經緯度），為利開源生態，建置可共同維護的清運點蒐集開放資料應用

## 垃圾車清運點位

### Open Data

[全部垃圾車清運點位](https://raw.githubusercontent.com/funtuan/taiwan-garbage-opendata/open-data/data/all.json)

[台北市垃圾車清運點位](https://raw.githubusercontent.com/funtuan/taiwan-garbage-opendata/open-data/data/taipei.json)

[新北市垃圾車清運點位](https://raw.githubusercontent.com/funtuan/taiwan-garbage-opendata/open-data/data/newtaipei.json)

### 更新頻率

6 小時一次

### 欄位

| 欄位         | 屬性     | 說明                                     |
| ------------ | ------- | --------------------------------------- |
| address      | String  | 詳細地址                                 |
| startTime    | Number  | 預計抵達時間，為從 00:00 計算的分鐘數        |
| endTime      | Number  | 預計抵達時間，為從 00:00 計算的分鐘數（選填） |
| lat          | Number  | 緯度                                    |
| lon          | Number  | 經度                                    |
| garbageDay   | [Number]| 一般垃圾收運星期                          |
| recycleDay   | [Number]| 回收收運星期                              |

星期的格式為 0~6 ，同於 new Date().getDay()

### 注意

GitHub raw 有大概 5 分鐘的快取，可能會取得非即時的資料
