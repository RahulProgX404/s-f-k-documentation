# Complete Actions, Conditions, and Parameters Documentation

Source:

- `06. 売上入力 のカスタマイズ-1609.xlsx`

Total analyzed sheets: 28

---

# Complete Actions with Parameters

```javascript
const actions = {
  mergeAllRecordTables: {
    title: "すべてのレコードのテーブルを結合する",
    reading: "すべてのレコードのテーブルをけつごうする",
    meaning: "Merge tables from all records",
    parameters: [
      {
        title: "レコード",
        reading: "レコード",
        meaning: "records",
      },
      {
        title: "テーブル",
        reading: "テーブル",
        meaning: "table",
      },
      {
        title: "結合対象",
        reading: "けつごうたいしょう",
        meaning: "merge target",
      },
    ],
  },

  showErrorDialogAndCancelSave: {
    title: "エラーダイアログを表示して保存をキャンセルする",
    reading: "エラーダイアログをひょうじしてほぞんをキャンセルする",
    meaning: "Display an error dialog and cancel saving",
    parameters: [
      {
        title: "メッセージ入力",
        reading: "メッセージにゅうりょく",
        meaning: "message input",
      },
      {
        title: "OKボタンの名前",
        reading: "オーケーボタンのなまえ",
        meaning: "OK button name",
      },
      {
        title: "キャンセルボタンの名前",
        reading: "キャンセルボタンのなまえ",
        meaning: "Cancel button name",
      },
    ],
  },

  getRecordsByKey: {
    title: "キーを指定してレコードを取得する",
    reading: "キーをしていしてレコードをしゅとくする",
    meaning: "Retrieve records by specifying a key",
    parameters: [
      {
        title: "キー",
        reading: "キー",
        meaning: "key",
      },
      {
        title: "検索値",
        reading: "けんさくち",
        meaning: "search value",
      },
      {
        title: "取得元アプリ",
        reading: "しゅとくもとアプリ",
        meaning: "source application",
      },
    ],
  },

  deleteRowsMatchingConditions: {
    title: "テーブルから条件を満たす行を削除する",
    reading: "テーブルからじょうけんをみたすぎょうをさくじょする",
    meaning: "Delete rows matching conditions from a table",
    parameters: [
      {
        title: "テーブル",
        reading: "テーブル",
        meaning: "table",
      },
      {
        title: "削除条件",
        reading: "さくじょじょうけん",
        meaning: "deletion conditions",
      },
      {
        title: "対象行",
        reading: "たいしょうぎょう",
        meaning: "target rows",
      },
    ],
  },

  addRowsToTable: {
    title: "テーブルに行を追加する",
    reading: "テーブルにぎょうをついかする",
    meaning: "Add rows to a table",
    parameters: [
      {
        title: "テーブル",
        reading: "テーブル",
        meaning: "table",
      },
      {
        title: "追加行",
        reading: "ついかぎょう",
        meaning: "additional row",
      },
      {
        title: "追加データ",
        reading: "ついかデータ",
        meaning: "data to add",
      },
    ],
  },

  addRecordWithTableData: {
    title: "テーブルデータをセットしたレコードを追加する",
    reading: "テーブルデータをセットしたレコードをついかする",
    meaning: "Add records with table data set",
    parameters: [
      {
        title: "納品書番号",
        reading: "のうひんしょばんごう",
        meaning: "delivery note number",
      },
      {
        title: "得意先名",
        reading: "とくいさきめい",
        meaning: "customer name",
      },
      {
        title: "納品先",
        reading: "のうひんさき",
        meaning: "delivery destination",
      },
      {
        title: "郵便番号",
        reading: "ゆうびんばんごう",
        meaning: "postal code",
      },
      {
        title: "納品日",
        reading: "のうひんび",
        meaning: "delivery date",
      },
      {
        title: "売上No",
        reading: "うりあげナンバー",
        meaning: "sales number",
      },
      {
        title: "区分",
        reading: "くぶん",
        meaning: "classification",
      },
    ],
  },

  setFieldValue: {
    title: "フィールドに値をセットする",
    reading: "フィールドにあたいをセットする",
    meaning: "Set a value to a field",
    parameters: [
      {
        title: "フィールド",
        reading: "フィールド",
        meaning: "field",
      },
      {
        title: "設定値",
        reading: "せっていち",
        meaning: "value to set",
      },
    ],
  },

  showFieldsOrGroups: {
    title: "フィールドやグループを表示する",
    reading: "フィールドやグループをひょうじする",
    meaning: "Display fields or groups",
    parameters: [
      {
        title: "対象フィールド",
        reading: "たいしょうフィールド",
        meaning: "target field",
      },
      {
        title: "対象グループ",
        reading: "たいしょうグループ",
        meaning: "target group",
      },
    ],
  },

  hideFieldsOrGroups: {
    title: "フィールドやグループを非表示にする",
    reading: "フィールドやグループをひひょうじにする",
    meaning: "Hide fields or groups",
    parameters: [
      {
        title: "対象フィールド",
        reading: "たいしょうフィールド",
        meaning: "target field",
      },
      {
        title: "対象グループ",
        reading: "たいしょうグループ",
        meaning: "target group",
      },
    ],
  },

  placeButtonInMenu: {
    title: "ボタンをメニュー位置に配置する",
    reading: "ボタンをメニューいちにはいちする",
    meaning: "Place a button in the menu position",
    parameters: [
      {
        title: "場所",
        reading: "ばしょ",
        meaning: "location",
      },
      {
        title: "ラベル",
        reading: "ラベル",
        meaning: "label",
      },
      {
        title: "追加位置",
        reading: "ついかいち",
        meaning: "insert position",
      },
    ],
  },

  removeDuplicateRecords: {
    title: "レコードから重複を除去する",
    reading: "レコードからちょうふくをじょきょする",
    meaning: "Remove duplicate records",
    parameters: [
      {
        title: "重複対象",
        reading: "ちょうふくたいしょう",
        meaning: "duplicate target",
      },
      {
        title: "得意先ID",
        reading: "とくいさきアイディー",
        meaning: "customer ID",
      },
    ],
  },

  addRecord: {
    title: "レコードを追加する",
    reading: "レコードをついかする",
    meaning: "Add a record",
    parameters: [
      {
        title: "追加先アプリ",
        reading: "ついかさきアプリ",
        meaning: "destination application",
      },
      {
        title: "レコード",
        reading: "レコード",
        meaning: "record",
      },
    ],
  },

  countRecordRows: {
    title: "レコード行数をカウントする",
    reading: "レコードぎょうすうをカウントする",
    meaning: "Count record rows",
    parameters: [
      {
        title: "レコード",
        reading: "レコード",
        meaning: "record",
      },
      {
        title: "件数",
        reading: "けんすう",
        meaning: "count",
      },
    ],
  },

  getSelectedRecords: {
    title: "一覧で選択されたレコードを取得する",
    reading: "いちらんでせんたくされたレコードをしゅとくする",
    meaning: "Retrieve selected records from the list",
    parameters: [
      {
        title: "一覧",
        reading: "いちらん",
        meaning: "list",
      },
      {
        title: "選択レコード",
        reading: "せんたくレコード",
        meaning: "selected records",
      },
    ],
  },

  getSpecificDateFromBaseDate: {
    title: "基準日から特定の日付を取得する",
    reading: "きじゅんびからとくていのひづけをしゅとくする",
    meaning: "Retrieve a specific date from a base date",
    parameters: [
      {
        title: "基準日",
        reading: "きじゅんび",
        meaning: "base date",
      },
      {
        title: "加算日数",
        reading: "かさんにっすう",
        meaning: "number of days to add",
      },
    ],
  },

  showInformationDialog: {
    title: "情報ダイアログを表示する",
    reading: "じょうほうダイアログをひょうじする",
    meaning: "Display an information dialog",
    parameters: [
      {
        title: "タイトル",
        reading: "タイトル",
        meaning: "title",
      },
      {
        title: "メッセージ",
        reading: "メッセージ",
        meaning: "message",
      },
    ],
  },

  formatNumericValues: {
    title: "数値をフォーマットする",
    reading: "すうちをフォーマットする",
    meaning: "Format numeric values",
    parameters: [
      {
        title: "数値",
        reading: "すうち",
        meaning: "numeric value",
      },
      {
        title: "小数点桁数",
        reading: "しょうすうてんけたすう",
        meaning: "decimal places",
      },
    ],
  },

  calculateDate: {
    title: "日付を計算する",
    reading: "ひづけをけいさんする",
    meaning: "Calculate dates",
    parameters: [
      {
        title: "開始日",
        reading: "かいしび",
        meaning: "start date",
      },
      {
        title: "終了日",
        reading: "しゅうりょうび",
        meaning: "end date",
      },
      {
        title: "日数",
        reading: "にっすう",
        meaning: "number of days",
      },
    ],
  },

  showDateInputDialog: {
    title: "日付入力ダイアログを表示する",
    reading: "ひづけにゅうりょくダイアログをひょうじする",
    meaning: "Display a date input dialog",
    parameters: [
      {
        title: "メッセージ入力",
        reading: "メッセージにゅうりょく",
        meaning: "message input",
      },
      {
        title: "初期値",
        reading: "しょきち",
        meaning: "initial value",
      },
      {
        title: "空を許可するかどうか",
        reading: "からをきょかするかどうか",
        meaning: "whether empty values are allowed",
      },
    ],
  },

  buildConditionAndGetRecords: {
    title: "条件を組み立ててレコードを取得する",
    reading: "じょうけんをくみたててレコードをしゅとくする",
    meaning: "Build conditions and retrieve records",
    parameters: [
      {
        title: "条件",
        reading: "じょうけん",
        meaning: "condition",
      },
      {
        title: "並び順",
        reading: "ならびじゅん",
        meaning: "sort order",
      },
      {
        title: "取得件数",
        reading: "しゅとくけんすう",
        meaning: "number of retrieved records",
      },
    ],
  },

  showConfirmationDialog: {
    title: "確認ダイアログを表示する",
    reading: "かくにんダイアログをひょうじする",
    meaning: "Display a confirmation dialog",
    parameters: [
      {
        title: "確認メッセージ",
        reading: "かくにんメッセージ",
        meaning: "confirmation message",
      },
      {
        title: "OKボタン",
        reading: "オーケーボタン",
        meaning: "OK button",
      },
      {
        title: "キャンセルボタン",
        reading: "キャンセルボタン",
        meaning: "Cancel button",
      },
    ],
  },

  showLoadingScreen: {
    title: "読み込み中画面を表示する",
    reading: "よみこみちゅうがめんをひょうじする",
    meaning: "Display the loading screen",
    parameters: [
      {
        title: "メッセージ",
        reading: "メッセージ",
        meaning: "message",
      },
    ],
  },

  showWarningDialog: {
    title: "警告ダイアログを表示する",
    reading: "けいこくダイアログをひょうじする",
    meaning: "Display a warning dialog",
    parameters: [
      {
        title: "警告メッセージ",
        reading: "けいこくメッセージ",
        meaning: "warning message",
      },
    ],
  },

  showSelectionDialog: {
    title: "選択肢から選択するダイアログを表示する",
    reading: "せんたくしからせんたくするダイアログをひょうじする",
    meaning: "Display a dialog to select from choices",
    parameters: [
      {
        title: "タイトル",
        reading: "タイトル",
        meaning: "title",
      },
      {
        title: "選択肢",
        reading: "せんたくし",
        meaning: "choices",
      },
      {
        title: "初期値",
        reading: "しょきち",
        meaning: "initial value",
      },
    ],
  },
};
```

---

# Complete Conditions / Triggers with Parameters

```javascript
const conditions = {
  fieldValueMatchesSpecificValue: {
    title: "フィールド値が特定の値ならば",
    reading: "フィールドちがとくていのあたいならば",
    meaning: "If field value matches a specific value",
    parameters: [
      {
        title: "対象フィールド",
        reading: "たいしょうフィールド",
        meaning: "target field",
      },
      {
        title: "比較値",
        reading: "ひかくち",
        meaning: "comparison value",
      },
    ],
  },

  fieldValueIsNotEmpty: {
    title: "フィールド値が空でないならば",
    reading: "フィールドちがからでないならば",
    meaning: "If field value is not empty",
    parameters: [
      {
        title: "対象フィールド",
        reading: "たいしょうフィールド",
        meaning: "target field",
      },
    ],
  },

  fieldValueIsEmpty: {
    title: "フィールド値が空ならば",
    reading: "フィールドちがからならば",
    meaning: "If field value is empty",
    parameters: [
      {
        title: "対象フィールド",
        reading: "たいしょうフィールド",
        meaning: "target field",
      },
    ],
  },

  whenButtonPressed: {
    title: "ボタンを押した時",
    reading: "ボタンをおしたとき",
    meaning: "When a button is pressed",
    parameters: [
      {
        title: "ボタン名",
        reading: "ボタンめい",
        meaning: "button name",
      },
    ],
  },

  whenRecordCountIsZero: {
    title: "レコード件数が０件ならば",
    reading: "レコードけんすうがゼロけんならば",
    meaning: "If record count is 0",
    parameters: [
      {
        title: "件数",
        reading: "けんすう",
        meaning: "count",
      },
    ],
  },

  loginUserMatchesSpecifiedUser: {
    title: "ログインユーザーが指定のユーザーならば",
    reading: "ログインユーザーがしていのユーザーならば",
    meaning: "If logged-in user is the specified user",
    parameters: [
      {
        title: "ログインユーザー",
        reading: "ログインユーザー",
        meaning: "logged-in user",
      },
      {
        title: "指定ユーザー",
        reading: "していユーザー",
        meaning: "specified user",
      },
    ],
  },

  whenListScreenDisplayed: {
    title: "一覧画面を表示した時",
    reading: "いちらんがめんをひょうじしたとき",
    meaning: "When the list screen is displayed",
    parameters: [],
  },

  whenEditScreenDisplayed: {
    title: "編集画面を表示した時",
    reading: "へんしゅうがめんをひょうじしたとき",
    meaning: "When the edit screen is displayed",
    parameters: [],
  },

  whenDetailScreenDisplayed: {
    title: "詳細画面を表示した時",
    reading: "しょうさいがめんをひょうじしたとき",
    meaning: "When the detail screen is displayed",
    parameters: [],
  },

  compareTwoValues: {
    title: "２つの値を比較して条件を満たすならば",
    reading: "ふたつのあたいをひかくしてじょうけんをみたすならば",
    meaning: "If two values satisfy comparison conditions",
    parameters: [
      {
        title: "比較対象1",
        reading: "ひかくたいしょういち",
        meaning: "comparison target 1",
      },
      {
        title: "比較対象2",
        reading: "ひかくたいしょうに",
        meaning: "comparison target 2",
      },
      {
        title: "比較条件",
        reading: "ひかくじょうけん",
        meaning: "comparison condition",
      },
      {
        title: "文字として比較",
        reading: "もじとしてひかく",
        meaning: "compare as text",
      },
    ],
  },

  whenOkPressedInDialog: {
    title: "確認・入力ダイアログで「OK」を押した時",
    reading: "かくにん・にゅうりょくダイアログでオーケーをおしたとき",
    meaning: "When OK is pressed in the dialog",
    parameters: [
      {
        title: "確認ダイアログ",
        reading: "かくにんダイアログ",
        meaning: "confirmation dialog",
      },
      {
        title: "入力ダイアログ",
        reading: "にゅうりょくダイアログ",
        meaning: "input dialog",
      },
    ],
  },
};
```

---

# Most Frequently Used Parameters

```javascript
const commonParameters = {
  customerId: {
    title: "得意先ID",
    reading: "とくいさきアイディー",
    meaning: "customer ID",
  },

  customerName: {
    title: "得意先名",
    reading: "とくいさきめい",
    meaning: "customer name",
  },

  salesDate: {
    title: "売上日",
    reading: "うりあげび",
    meaning: "sales date",
  },

  deliveryDate: {
    title: "納品日",
    reading: "のうひんび",
    meaning: "delivery date",
  },

  invoiceNumber: {
    title: "納品書番号",
    reading: "のうひんしょばんごう",
    meaning: "delivery note number",
  },

  billingClosingDate: {
    title: "請求締日",
    reading: "せいきゅうしめび",
    meaning: "billing closing date",
  },

  recordCount: {
    title: "件数",
    reading: "けんすう",
    meaning: "count",
  },

  message: {
    title: "メッセージ",
    reading: "メッセージ",
    meaning: "message",
  },

  sortOrder: {
    title: "並び順",
    reading: "ならびじゅん",
    meaning: "sort order",
  },
};
```
