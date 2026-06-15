const CONDITION = {
  一覧画面を表示した時: {
    title: "一覧画面を表示した時",
    reading: "いちらんがめんをひょうじしたとき",
    meaning: "When the list screen is displayed.",
    parameters: [],
  },

  ログインユーザーが指定のユーザーならば: {
    title: "ログインユーザーが指定のユーザーならば",
    reading: "ログインユーザーがしていのユーザーならば",
    meaning: "If the logged-in user matches the specified user.",
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

  ボタンを押した時: {
    title: "ボタンを押した時",
    reading: "ボタンをおしたとき",
    meaning: "When the button is pressed.",
    parameters: [
      {
        title: "ボタン",
        reading: "ボタン",
        meaning: "button",
      },
    ],
  },

  "確認・入力ダイアログで「OK」を押した時": {
    title: "確認・入力ダイアログで「OK」を押した時",
    reading: "かくにん・にゅうりょくダイアログでオーケーをおしたとき",
    meaning: "When OK is pressed in the confirmation/input dialog.",
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

  "2つの値を比較して条件を満たすならば": {
    title: "2つの値を比較して条件を満たすならば",
    reading: "ふたつのあたいをひかくしてじょうけんをみたすならば",
    meaning: "If two values are compared and satisfy the condition.",
    parameters: [
      {
        title: "比較する値(A)",
        reading: "ひかくするあたい エー",
        meaning: "value to compare (A)",
      },
      {
        title: "条件",
        reading: "じょうけん",
        meaning: "condition",
      },
      {
        title: "比較する値(B)",
        reading: "ひかくするあたい ビー",
        meaning: "value to compare (B)",
      },
      {
        title: "数字の比較方法",
        reading: "すうじのひかくほうほう",
        meaning: "number comparison method",
      },
    ],
  },

  フィールド値が特定の値ならば: {
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

  フィールド値が空でないならば: {
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

  フィールド値が空ならば: {
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

  レコード件数が０件ならば: {
    title: "レコード件数が０件ならば",
    reading: "レコードけんすうがゼロけんならば",
    meaning: "If record count is 0",
    parameters: [
      {
        title: "レコード",
      },
    ],
  },

  レコード件数が１件以上ならば: {
    title: "レコード件数が１件以上ならば",
    reading: "レコードけんすうがいっけんいじょうならば",
    meaning: "if the number of records is one or more",
    parameters: [
      {
        title: "レコード",
      },
    ],
  },

  編集画面を表示した時: {
    title: "編集画面を表示した時",
    reading: "へんしゅうがめんをひょうじしたとき",
    meaning: "When the edit screen is displayed",
    parameters: [],
  },

  詳細画面を表示した時: {
    title: "詳細画面を表示した時",
    reading: "しょうさいがめんをひょうじしたとき",
    meaning: "When the detail screen is displayed",
    parameters: [],
  },

  いずれかのアクションの実行が完了した時: {
    title: "いずれかのアクションの実行が完了した時",
    reading: "いずれかのアクションのじっこうがかんりょうしたとき",
    meaning: "when the execution of any action is completed",
    parameters: [
      {
        title: "アクション",
      },
    ],
  },

  他のアクションの実行が完了した時: {
    title: "他のアクションの実行が完了した時",
    reading: "ほかのアクションのじっこうがかんりょうしたとき",
    meaning: "when the execution of another action is completed",
    parameters: [
      {
        title: "アクション",
      },
    ],
  },
};
