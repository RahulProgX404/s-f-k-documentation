Here's the bilingual flowchart for `createInvoice()`.

```text
┌─────────────────────────────────────────────┐
│ Start / 開始                                │
│ createInvoice(salesIds)                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Remove duplicates & sort IDs                │
│ ID重複削除・昇順ソート                       │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Fetch all sales records in parallel         │
│ 全売上レコードを並列取得                    │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Extract valid records                       │
│ 有効な売上レコードを抽出                    │
│ (allRecords)                                │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Validation 1                               │
│ 売上先(Customer)チェック                    │
│ Extract unique customer names              │
└─────────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Multiple customers ? │
          │ 売上先が複数あるか？  │
          └──────────────────────┘
                │ Yes / はい
                ▼
┌─────────────────────────────────────────────┐
│ Error                                       │
│ 同じ「売上先」のみ選択してください          │
└─────────────────────────────────────────────┘

                No / いいえ
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Validation 2                               │
│ 納品書番号チェック                          │
│ Find records without Delivery Number       │
│ 納品書番号未設定レコード抽出                │
└─────────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Missing DN exists ?  │
          │ 納品書番号未設定あり? │
          └──────────────────────┘
                │ Yes / はい
                ▼
┌─────────────────────────────────────────────┐
│ Error                                       │
│ 請求書作成前に全レコードへ                  │
│ 納品書番号が必要                            │
└─────────────────────────────────────────────┘

                No / いいえ
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Split records                               │
│ レコード分類                                │
│                                             │
│ withIN    = 請求書番号あり                  │
│ withoutIN = 請求書番号なし                  │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Extract unique invoice numbers              │
│ 請求書番号を重複排除して取得                │
└─────────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Multiple IN ?        │
          │ 請求書番号が複数？    │
          └──────────────────────┘
                │ Yes / はい
                ▼
┌─────────────────────────────────────────────┐
│ Error                                       │
│ 同じ「請求書番号」のみ選択してください      │
└─────────────────────────────────────────────┘

                No / いいえ
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Save existing invoice number                │
│ 既存請求書番号を保持                        │
│ hasInvoiceNumber                            │
└─────────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ withIN > 0 ?         │
          │ 既存請求書あり？      │
          └──────────────────────┘
                │ Yes / はい
                ▼
┌─────────────────────────────────────────────┐
│ FLOW A                                      │
│ 既存請求書更新                              │
│ Group by Invoice Number                     │
│ 請求書番号ごとにグループ化                  │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ For each Invoice Number                     │
│ 各請求書番号ごと                            │
│                                             │
│ updateInvoice()                             │
│ 既存請求書へ明細追加                        │
└─────────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ withoutIN > 0 ?      │
          │ 未請求レコードあり？  │
          └──────────────────────┘
                │ No / いいえ
                ▼
┌─────────────────────────────────────────────┐
│ End / 終了                                  │
└─────────────────────────────────────────────┘

                Yes / はい
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ FLOW B                                      │
│ 新規請求書作成                              │
│ Group by Customer ID                        │
│ 売上先ごとにグループ化                      │
└─────────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Existing IN exists?  │
          │ 既存請求書番号あり？  │
          └──────────────────────┘
                │ No / いいえ
                ▼
┌─────────────────────────────────────────────┐
│ Get latest invoice number                   │
│ 最新請求書番号取得                          │
│                                             │
│ Generate next invoice number                │
│ 次の請求書番号生成                          │
└─────────────────────────────────────────────┘

                Yes / はい
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ For each Customer                           │
│ 各売上先ごと                                │
│                                             │
│ createFirstInvoice()                        │
│ 請求書作成                                  │
│                                             │
│ applyInvoiceNumber()                        │
│ 売上レコードへ請求書番号反映                │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ End / 終了                                  │
└─────────────────────────────────────────────┘
```

### Key Differences from `createDeliveryNote()`

| Delivery Note (納品書)         | Invoice (請求書)                                |
| ------------------------------ | ----------------------------------------------- |
| Customer must be same          | Customer must be same                           |
| Delivery Number optional       | Delivery Number mandatory                       |
| Creates/updates Delivery Notes | Creates/updates Invoices                        |
| Groups by Customer Name        | Groups by Customer ID                           |
| Uses `deliveryNumber`          | Uses `invoiceNumber`                            |
| Can create new DN directly     | Cannot create Invoice until all records have DN |
| `updateDeliveryNote()`         | `updateInvoice()`                               |
| `createFirstDeliveryNote()`    | `createFirstInvoice()`                          |

The most important additional validation in `createInvoice()` is:

```text
全ての選択レコードに納品書番号が必要
(All selected records must already have a Delivery Number)

Missing Delivery Number
        ↓
      Error
        ↓
Invoice creation stops
```

This dependency does not exist in `createDeliveryNote()`, making the invoice flow stricter than the delivery note flow.
