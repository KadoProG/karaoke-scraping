# カラオケスクレイピングの結果

## リストの取得

### エンドポイント

`https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do`

### query

- cdmCardNo: カード ID（`string`）`required`
- scoringAiId: 採点 Ai の ID（`string`）設定すると１行だけ取得
- pageNo: ページ No（`number`）
- detailFlg: detail を表示するか(`0`か`1`, default: `0`(表示しない))

### response

xml 形式でデータが返却される

scoringAiId がない場合、ページ No に応じて、５個ずつデータが表示される

<details>
<summary>xmlの結果</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns="https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML" type="2.2">
<result>
<status>OK</status>
<statusCode>0000</statusCode>
<message></message>
</result>
<data>
<page dataCount="192" pageCount="39" hasNext="1" hasPreview="0">1</page>
<cdmCardNo>{cdmCardNo}</cdmCardNo>
</data>
<list count="5">
<data>
<scoring scoringAiId="1413882" requestNo="5373-53" contentsName="もぐもぐYUMMY!" artistName="猫又おかゆ" dContentsName="もぐもぐYUMMY!" dArtistName="猫又おかゆ" lastPerformKey="0" scoringDateTime="20240615085712" favorite="0">90066</scoring>
</data>
<data>
<scoring scoringAiId="1413880" requestNo="1263-42" contentsName="カミサマ・ネコサマ" artistName="猫又おかゆ" dContentsName="カミサマ・ネコサマ" dArtistName="猫又おかゆ" lastPerformKey="0" scoringDateTime="20240615085148" favorite="0">82395</scoring>
</data>
<data>
<scoring scoringAiId="1413875" requestNo="2463-46" contentsName="あした天気になれ" artistName="中島みゆき" dContentsName="あした天気になれ" dArtistName="中島みゆき" lastPerformKey="0" scoringDateTime="20240615084616" favorite="0">88489</scoring>
</data>
<data>
<scoring scoringAiId="1413874" requestNo="1249-95" contentsName="NEXT COLOR PLANET" artistName="星街すいせい" dContentsName="NEXT COLOR PLANET" dArtistName="星街すいせい" lastPerformKey="0" scoringDateTime="20240615084122" favorite="0">89070</scoring>
</data>
<data>
<scoring scoringAiId="1413871" requestNo="1192-34" contentsName="いのち" artistName="AZKi" dContentsName="いのち" dArtistName="AZKi" lastPerformKey="0" scoringDateTime="20240615083629" favorite="0">85902</scoring>
</data>
</list>
</document>
```

</details>

<details>
<summary>jsonに変換すると</summary>

```json
{
  "document": {
    "$": {
      "xmlns": "https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML",
      "type": "2.2"
    },
    "result": [{ "status": ["OK"], "statusCode": ["0000"], "message": [""] }],
    "data": [
      {
        "page": [
          {
            "_": "1",
            "$": {
              "dataCount": "192",
              "pageCount": "39",
              "hasNext": "1",
              "hasPreview": "0"
            }
          }
        ],
        "cdmCardNo": ["{cdmCardNo}"]
      }
    ],
    "list": [
      {
        "$": { "count": "5" },
        "data": [
          {
            "scoring": [
              {
                "_": "90066",
                "$": {
                  "scoringAiId": "1413882",
                  "requestNo": "5373-53",
                  "contentsName": "もぐもぐYUMMY!",
                  "artistName": "猫又おかゆ",
                  "dContentsName": "もぐもぐYUMMY!",
                  "dArtistName": "猫又おかゆ",
                  "lastPerformKey": "0",
                  "scoringDateTime": "20240615085712",
                  "favorite": "0"
                }
              }
            ]
          },
          {
            "scoring": [
              {
                "_": "82395",
                "$": {
                  "scoringAiId": "1413880",
                  "requestNo": "1263-42",
                  "contentsName": "カミサマ・ネコサマ",
                  "artistName": "猫又おかゆ",
                  "dContentsName": "カミサマ・ネコサマ",
                  "dArtistName": "猫又おかゆ",
                  "lastPerformKey": "0",
                  "scoringDateTime": "20240615085148",
                  "favorite": "0"
                }
              }
            ]
          },
          {
            "scoring": [
              {
                "_": "88489",
                "$": {
                  "scoringAiId": "1413875",
                  "requestNo": "2463-46",
                  "contentsName": "あした天気になれ",
                  "artistName": "中島みゆき",
                  "dContentsName": "あした天気になれ",
                  "dArtistName": "中島みゆき",
                  "lastPerformKey": "0",
                  "scoringDateTime": "20240615084616",
                  "favorite": "0"
                }
              }
            ]
          },
          {
            "scoring": [
              {
                "_": "89070",
                "$": {
                  "scoringAiId": "1413874",
                  "requestNo": "1249-95",
                  "contentsName": "NEXT COLOR PLANET",
                  "artistName": "星街すいせい",
                  "dContentsName": "NEXT COLOR PLANET",
                  "dArtistName": "星街すいせい",
                  "lastPerformKey": "0",
                  "scoringDateTime": "20240615084122",
                  "favorite": "0"
                }
              }
            ]
          },
          {
            "scoring": [
              {
                "_": "85902",
                "$": {
                  "scoringAiId": "1413871",
                  "requestNo": "1192-34",
                  "contentsName": "いのち",
                  "artistName": "AZKi",
                  "dContentsName": "いのち",
                  "dArtistName": "AZKi",
                  "lastPerformKey": "0",
                  "scoringDateTime": "20240615083629",
                  "favorite": "0"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

</details>

### scoringAiId を取得した際の結果

<details>
<summary>xml</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns="https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML" type="2.2">
<result>
<status>OK</status>
<statusCode>0000</statusCode>
<message></message>
</result>
<data>
<page dataCount="1" pageCount="1" hasNext="0" hasPreview="0">1</page>
<cdmCardNo>{cdmCardNo}</cdmCardNo>
</data>
<list count="1">
<data>
<scoring scoringAiId="1413882" requestNo="5373-53" contentsName="もぐもぐYUMMY!" artistName="猫又おかゆ" dContentsName="もぐもぐYUMMY!" dArtistName="猫又おかゆ" damserial="AT016103" dataKind="A00001" dataSize="" scoringEngineVersionNumber="" edyId="" clubDamCardNo="{cdmCardNo}" entryCount="1" topRecordNumber="" lastPerformKey="0" requestNoTray="5373" requestNoChapter="53" fadeout="0" analysisReportCommentNo="3701" radarChartPitch="86" radarChartStability="79" radarChartExpressive="65" radarChartVibratoLongtone="89" radarChartRhythm="83" spare1="" singingRangeHighest="70" singingRangeLowest="54" vocalRangeHighest="68" vocalRangeLowest="54" intonation="82" kobushiCount="6" shakuriCount="4" fallCount="0" timing="4" longtoneSkill="7" vibratoSkill="7" vibratoType="11" vibratoTotalSecond="22" vibratoCount="4" accentCount="0" hammeringOnCount="0" edgeVoiceCount="0" hiccupCount="0" aiSensitivityMeterAdd="64" aiSensitivityMeterDeduct="0" aiSensitivityPoints="64" aiSensitivityBonus="3453" nationalAverageTotalPoints="82183" nationalAveragePitch="73" nationalAverageStability="60" nationalAverageExpression="60" nationalAverageVibratoAndLongtone="53" nationalAverageRhythm="86" spare2="" intervalGraphPointsSection01="84" intervalGraphPointsSection02="91" intervalGraphPointsSection03="86" intervalGraphPointsSection04="85" intervalGraphPointsSection05="90" intervalGraphPointsSection06="88" intervalGraphPointsSection07="90" intervalGraphPointsSection08="94" intervalGraphPointsSection09="90" intervalGraphPointsSection10="96" intervalGraphPointsSection11="79" intervalGraphPointsSection12="86" intervalGraphPointsSection13="92" intervalGraphPointsSection14="90" intervalGraphPointsSection15="82" intervalGraphPointsSection16="95" intervalGraphPointsSection17="92" intervalGraphPointsSection18="92" intervalGraphPointsSection19="84" intervalGraphPointsSection20="81" intervalGraphPointsSection21="87" intervalGraphPointsSection22="82" intervalGraphPointsSection23="82" intervalGraphPointsSection24="78" intervalGraphIndexSection01="B'01" intervalGraphIndexSection02="B'01" intervalGraphIndexSection03="B'01" intervalGraphIndexSection04="B'10" intervalGraphIndexSection05="B'10" intervalGraphIndexSection06="B'10" intervalGraphIndexSection07="B'10" intervalGraphIndexSection08="B'10" intervalGraphIndexSection09="B'10" intervalGraphIndexSection10="B'00" intervalGraphIndexSection11="B'01" intervalGraphIndexSection12="B'01" intervalGraphIndexSection13="B'01" intervalGraphIndexSection14="B'10" intervalGraphIndexSection15="B'10" intervalGraphIndexSection16="B'10" intervalGraphIndexSection17="B'10" intervalGraphIndexSection18="B'10" intervalGraphIndexSection19="B'10" intervalGraphIndexSection20="B'10" intervalGraphIndexSection21="B'10" intervalGraphIndexSection22="B'10" intervalGraphIndexSection23="B'10" intervalGraphIndexSection24="B'10" maxTotalPoints="86276" scoringDateTime="20240615085712" aiSensitivityGraphAddPointsSection01="21" aiSensitivityGraphAddPointsSection02="40" aiSensitivityGraphAddPointsSection03="48" aiSensitivityGraphAddPointsSection04="31" aiSensitivityGraphAddPointsSection05="12" aiSensitivityGraphAddPointsSection06="35" aiSensitivityGraphAddPointsSection07="21" aiSensitivityGraphAddPointsSection08="42" aiSensitivityGraphAddPointsSection09="30" aiSensitivityGraphAddPointsSection10="12" aiSensitivityGraphAddPointsSection11="12" aiSensitivityGraphAddPointsSection12="56" aiSensitivityGraphAddPointsSection13="12" aiSensitivityGraphAddPointsSection14="22" aiSensitivityGraphAddPointsSection15="12" aiSensitivityGraphAddPointsSection16="40" aiSensitivityGraphAddPointsSection17="42" aiSensitivityGraphAddPointsSection18="55" aiSensitivityGraphAddPointsSection19="56" aiSensitivityGraphAddPointsSection20="27" aiSensitivityGraphAddPointsSection21="27" aiSensitivityGraphAddPointsSection22="42" aiSensitivityGraphAddPointsSection23="31" aiSensitivityGraphAddPointsSection24="22" aiSensitivityGraphDeductPointsSection01="0" aiSensitivityGraphDeductPointsSection02="0" aiSensitivityGraphDeductPointsSection03="0" aiSensitivityGraphDeductPointsSection04="0" aiSensitivityGraphDeductPointsSection05="0" aiSensitivityGraphDeductPointsSection06="0" aiSensitivityGraphDeductPointsSection07="0" aiSensitivityGraphDeductPointsSection08="0" aiSensitivityGraphDeductPointsSection09="0" aiSensitivityGraphDeductPointsSection10="0" aiSensitivityGraphDeductPointsSection11="0" aiSensitivityGraphDeductPointsSection12="0" aiSensitivityGraphDeductPointsSection13="0" aiSensitivityGraphDeductPointsSection14="0" aiSensitivityGraphDeductPointsSection15="0" aiSensitivityGraphDeductPointsSection16="0" aiSensitivityGraphDeductPointsSection17="0" aiSensitivityGraphDeductPointsSection18="0" aiSensitivityGraphDeductPointsSection19="0" aiSensitivityGraphDeductPointsSection20="0" aiSensitivityGraphDeductPointsSection21="0" aiSensitivityGraphDeductPointsSection22="0" aiSensitivityGraphDeductPointsSection23="0" aiSensitivityGraphDeductPointsSection24="0" aiSensitivityGraphIndexSection01="B'01" aiSensitivityGraphIndexSection02="B'01" aiSensitivityGraphIndexSection03="B'01" aiSensitivityGraphIndexSection04="B'10" aiSensitivityGraphIndexSection05="B'10" aiSensitivityGraphIndexSection06="B'10" aiSensitivityGraphIndexSection07="B'10" aiSensitivityGraphIndexSection08="B'10" aiSensitivityGraphIndexSection09="B'10" aiSensitivityGraphIndexSection10="B'00" aiSensitivityGraphIndexSection11="B'01" aiSensitivityGraphIndexSection12="B'01" aiSensitivityGraphIndexSection13="B'01" aiSensitivityGraphIndexSection14="B'10" aiSensitivityGraphIndexSection15="B'10" aiSensitivityGraphIndexSection16="B'10" aiSensitivityGraphIndexSection17="B'10" aiSensitivityGraphIndexSection18="B'10" aiSensitivityGraphIndexSection19="B'10" aiSensitivityGraphIndexSection20="B'10" aiSensitivityGraphIndexSection21="B'10" aiSensitivityGraphIndexSection22="B'10" aiSensitivityGraphIndexSection23="B'10" aiSensitivityGraphIndexSection24="B'10" favorite="0">90066</scoring>
</data>
</list>
</document>
```

</details>

特典の詳細が表示される。基本的にはリスト取得とデータ構造は同じ。property が増えたイメージ（リストで `detailFlg` を有効にすることも可能）。
