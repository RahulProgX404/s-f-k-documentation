const ACTIONS = {
  ボタンをメニュー位置に配置する: {
    title: "ボタンをメニュー位置に配置する",
    reading: "ボタンをメニューいちにはいちする",
    meaning: "Place the button in the menu position.",
    parameters: [
      {
        title: "場所",
        reading: "ばしょ",
        meaning: "place / location",
      },
      {
        title: "ラベル",
        reading: "ラベル",
        meaning: "label",
      },
      {
        title: "追加位置",
        reading: "ついかいち",
        meaning: "insertion position / add position",
      },
    ],

    vocab: {
      位置: "position, location",
      配置する: "to place, arrange, position",
    },
  },

  日付入力ダイアログを表示する: {
    title: "日付入力ダイアログを表示する",
    reading: "ひづけにゅうりょくダイアログをひょうじする",
    meaning: "Display/show the date input dialog.",
    parameters: [
      {
        title: "メッセージ入力",
        reading: "メッセージにゅうりょく",
        meaning: "message input",
      },
      {
        title: "OKボタンの名前",
        reading: "OKボタンのなまえ",
        meaning: "OK button name",
      },
      {
        title: "キャンセルボタンの名前",
        reading: "キャンセルボタンのなまえ",
        meaning: "Cancel button name",
      },
      {
        title: "空を許可するかどうか",
        reading: "からをきょかするかどうか",
        meaning: "whether empty values are allowed",
      },
      {
        title: "初期値",
        reading: "しょきち",
        meaning: "initial value / default value",
      },
    ],
    vocab: {
      許可する: "to allow, permit",
      初期値: "initial, beginning, startup",
    },
  },

  選択肢から選択するダイアログを表示する: {
    title: "選択肢から選択するダイアログを表示する",
    reading: "せんたくしからせんたくするダイアログをひょうじする",
    meaning: "Display/show a dialog for selecting from choices.",
    parameters: [
      {
        title: "メッセージ入力",
        reading: "メッセージにゅうりょく",
        meaning: "message input",
      },
      {
        title: "選択肢",
        reading: "せんたくし",
        meaning: "choices / options",
      },
      {
        title: "未選択を表す「-----」",
        reading: "みせんたくをあらわす「-----」",
        meaning: `"-----" representing unselected state`,
      },
      {
        title: "OKボタンの名前",
        reading: "OKボタンのなまえ",
        meaning: "OK button name",
      },
      {
        title: "キャンセルボタンの名前",
        reading: "キャンセルボタンのなまえ",
        meaning: "Cancel button name",
      },
      {
        title: "未選択を許可するかどうか",
        reading: "みせんたくをきょかするかどうか",
        meaning: "whether unselected state is allowed",
      },
      {
        title: "初期値",
        reading: "しょきち",
        meaning: "initial value / default value",
      },
    ],
    vocab: {
      選択肢: "options, choices",
      選択する: "to select, choose",
      未: "not yet / un-",
      未選択: "unselected, no selection",
      表す: "to represent, indicate, denote",
    },
  },

  条件を組み立ててレコードを取得する: {
    title: "条件を組み立ててレコードを取得する",
    reading: "じょうけんをくみたててレコードをしゅとくする",
    meaning: "Build conditions and retrieve records.",
    parameters: [
      {
        title: "取得元アプリ",
        reading: "しゅとくもとアプリ",
        meaning: "source application",
      },
      {
        title: "検索条件",
        reading: "けんさくじょうけん",
        meaning: "search conditions",
      },
      {
        title: "最大取得件数",
        reading: "さいだいしゅとくけんすう",
        meaning: "maximum number of records to retrieve",
      },
    ],
    vocab: {
      取得する: "to acquire, obtain, retrieve",
      組み立てる: "to build, construct",
      組み立てて: "assembling, constructing, building",
      最大: "maximum",
      取得: "acquisition, retrieval, fetching",
      件数: "number of items/records",
    },
  },

  レコード行数をカウントする: {
    title: "レコード行数をカウントする",
    reading: "レコードぎょうすうをカウントする",
    meaning: "Count the number of record rows.",
    parameters: [
      {
        title: "レコード選択アクション",
        reading: "レコードせんたくアクション",
        meaning: "record selection action",
      },
      {
        title: "結果をセットするフィールド（省略可）",
        reading: "けっかをセットするフィールド（しょうりゃくか）",
        meaning: "field to set the result (optional)",
      },
    ],
    vocab: {
      行数: "(ぎょうすう)	number of rows/lines",
      省略: "(しょうりゃく)	omission, skipping",
      可: "(か)	permitted, allowed",
    },
  },

  レコードから重複を除去する: {
    title: "レコードから重複を除去する",
    reading: "レコードからちょうふくをじょきょする",
    meaning: "Remove duplicates from records.",
    parameters: [
      {
        title: "レコード選択アクション",
        reading: "レコードせんたくアクション",
        meaning: "record selection action",
      },
      {
        title: "キーとなるフィールド",
        reading: "キーとなるフィールド",
        meaning: "key field",
      },
    ],
    vocab: {
      重複: "(ちょうふく / じゅうふく) duplication, duplicate",
      除去する: "(じょきょする) remove, eliminate",
    },
  },

  読み込み中画面を表示する: {
    title: "読み込み中画面を表示する",
    reading: "よみこみちゅうがめんをひょうじする",
    meaning: "Display/show the loading screen.",
    parameters: [
      {
        title: "メッセージ",
        reading: "メッセージ",
        meaning: "message",
      },
    ],
  },

  リストから要素を取り出す: {
    title: "リストから要素を取り出す",
    reading: "リストからようそをとりだす",
    meaning: "Extract/get an element from a list.",
    parameters: [
      {
        title: "リスト",
        reading: "リスト",
        meaning: "list",
      },
    ],
    vocab: {
      要素: "(ようそ) element, item, component",
      取り出す: "(とりだす) take out, extract, retrieve",
    },
  },

  レコードを並べ替える: {
    title: "レコードを並べ替える",
    reading: "レコードをならべかえる",
    meaning: "Sort/reorder records.",
    parameters: [
      {
        title: "レコード選択アクション",
        reading: "レコードせんたくアクション",
        meaning: "record selection action",
      },
      {
        title: "キーとなるフィールド(1)",
        reading: "キーとなるフィールド いち",
        meaning: "key field (1)",
      },
      {
        title: "並び順(1)",
        reading: "ならびじゅん いち",
        meaning: "sort order (1)",
      },
      {
        title: "キーとなるフィールド(2)",
        reading: "キーとなるフィールド に",
        meaning: "key field (2)",
      },
      {
        title: "並び順(2)",
        reading: "ならびじゅん に",
        meaning: "sort order (2)",
      },
      {
        title: "キーとなるフィールド(3)",
        reading: "キーとなるフィールド さん",
        meaning: "key field (3)",
      },
      {
        title: "並び順(3)",
        reading: "ならびじゅん さん",
        meaning: "sort order (3)",
      },
    ],
    vocab: {
      並べ替える: "(ならべかえる) rearrange, reorder, sort",
      並び: "(ならび)	arrangement, order, sequence",
      順: "(じゅん) order, sequence, priority",
      昇順: "（しょうじゅん） ascending order",
      降順: "（こうじゅん） descending order",
    },
  },

  レコードを書き出す: {
    title: "レコードを書き出す",
    reading: "レコードをかきだす",
    meaning: "Export records.",
    parameters: [
      {
        title: "レコード",
        reading: "レコード",
        meaning: "record",
      },
      {
        title: "書き出し先アプリ",
        reading: "かきだしさきアプリ",
        meaning: "export destination application",
      },
      {
        title: "マッピング",
        reading: "マッピング",
        meaning: "mapping",
      },
      {
        title: "更新または追加",
        reading: "こうしんまたはついか",
        meaning: "update or add",
      },
    ],
  },

  読み込み中画面を終了する: {
    title: "読み込み中画面を終了する",
    reading: "よみこみちゅうがめんをしゅうりょうする",
    meaning: "Close/end the loading screen.",
  },

  すべてのレコードのテーブルを結合する: {
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

  エラーダイアログを表示して保存をキャンセルする: {
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

  キーを指定してレコードを取得する: {
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

  テーブルから条件を満たす行を削除する: {
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

  テーブルに行を追加する: {
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

  テーブルデータをセットしたレコードを追加する: {
    title: "テーブルデータをセットしたレコードを追加する",
    reading: "テーブルデータをセットしたレコードをついかする",
    meaning: "Add records with table data set",
    parameters: [
      {
        title: "追加先アプリ",
        reading: "ついかさきアプリ",
        meaning: "destination application to add to",
      },
      {
        title: "レコードに対するマッピング",
        reading: "レコードにたいするマッピング",
        meaning: "mapping for the record",
      },
      {
        title: "テーブル",
        reading: "テーブル",
        meaning: "table",
      },
      {
        title: "テーブルの元になるレコード",
        reading: "テーブルのもとになるレコード",
        meaning: "record that becomes the source of the table",
      },
      {
        title: "テーブルに対するマッピング",
        reading: "テーブルにたいするマッピング",
        meaning: "mapping for the table",
      },
      {
        title: "画面遷移",
        reading: "がめんせんい",
        meaning: "screen transition / screen navigation",
      },
    ],
  },

  フィールドに値をセットする: {
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

  フィールドやグループを表示する: {
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

  フィールドやグループを非表示にする: {
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

  レコードを追加する: {
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

  一覧で選択されたレコードを取得する: {
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

  基準日から特定の日付を取得する: {
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

  情報ダイアログを表示する: {
    title: "情報ダイアログを表示する",
    reading: "じょうほうダイアログをひょうじする",
    meaning: "Display an information dialog",
    parameters: [
      {
        title: "メッセージ入力",
      },
      {
        title: "OKボタンの名前",
      },
    ],
  },

  数値をフォーマットする: {
    title: "数値をフォーマットする",
    reading: "すうちをフォーマットする",
    meaning: "Format numeric values",
    parameters: [
      {
        title: "数値",
        reading: "すうち",
        meaning: "numeric value / number",
      },
      {
        title: "桁区切りを表示する",
        reading: "けたくぎりをひょうじする",
        meaning: "display digit separators",
      },
      {
        title: "整数部の桁数",
        reading: "せいすうぶのけたすう",
        meaning: "number of digits in the integer part",
      },
      {
        title: "整数部をゼロ埋めするか",
        reading: "せいすうぶをゼロうめするか",
        meaning: "whether to zero-pad the integer part",
      },
      {
        title: "小数点以下の桁数",
        reading: "しょうすうてんいかのけたすう",
        meaning: "number of decimal places",
      },
      {
        title: "小数部をゼロ埋めするか",
        reading: "しょうすうぶをゼロうめするか",
        meaning: "whether to zero-pad the decimal part",
      },
      {
        title: "セット先フィールド（省略可）",
        reading: "セットさきフィールド（しょうりゃくか）",
        meaning: "destination field to set the value (optional)",
      },
    ],
    vocab: {
      桁: "(けた)	digit, place (of a number)",
      区切り: "(くぎり)	separator, division, delimiter",
      桁区切り: "(けたくぎり) digit grouping, number separator",
      整数部: "(せいすうぶ) integer part",
      桁数: "(けたすう) number of digits",
      ゼロ埋め: "(ぜろうめ) zero padding",
      小数点: "(しょうすうてん) decimal point",
      桁数: "(けたすう) number of digits",
    },
  },

  日付を計算する: {
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

  確認ダイアログを表示する: {
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

  読み込み中画面を表示する: {
    title: "読み込み中画面を表示する",
    reading: "よみこみちゅうがめんをひょうじする",
    meaning: "Display the loading screen",
  },

  警告ダイアログを表示する: {
    title: "警告ダイアログを表示する",
    reading: "けいこくダイアログをひょうじする",
    meaning: "Display a warning dialog",
    parameters: [
      {
        title: "メッセージ入力",
      },
      {
        title: "OKボタンの名前",
      },
    ],
    vocab: {
      警告: "(けいこく) warning, alert",
    },
  },
};
