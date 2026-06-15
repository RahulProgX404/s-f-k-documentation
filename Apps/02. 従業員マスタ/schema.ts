import { AppDefinition, FIELDS } from "../utils/index";

export const Employee_Master: AppDefinition = {
  appName: "02. 従業員マスタ",
  appId: 7,
  space: "N/A",
  fields: {
    employeeName: {
      label: "従業員名",
      hiraganaLabel: "じゅうぎょういんめい",
      fieldCode: "従業員名",
      type: FIELDS.string,
    },
    furigana: {
      label: "ふりがな",
      hiraganaLabel: "ふりがな",
      fieldCode: "ふりがな",
      type: FIELDS.string,
    },
    employeeCategory: {
      label: "従業員カテゴリ",
      hiraganaLabel: "じゅうぎょういんカテゴリ",
      fieldCode: "従業員カテゴリ",
      type: FIELDS.dropdown,
      options: [
        "営業",
        "総務",
        "製造",
        "工務",
        "制作",
        "製造パート",
        "営業パート",
      ],
    },
    personInChargeCode: {
      label: "担当者コード",
      hiraganaLabel: "たんとうしゃコード",
      fieldCode: "担当者コード",
      type: FIELDS.string,
    },
    workerCode: {
      label: "作業員コード",
      hiraganaLabel: "さぎょういんコード",
      fieldCode: "作業員コード",
      type: FIELDS.string,
    },
    departmentCode: {
      label: "部課コード",
      hiraganaLabel: "ぶかコード",
      fieldCode: "部課コード",
      type: FIELDS.string,
    },
    employmentStatus: {
      label: "在籍状況",
      hiraganaLabel: "ざいせきじょうきょう",
      fieldCode: "在籍状況",
      type: FIELDS.radio,
      options: ["在籍中", "休職中", "退職済"],
    },
    notes: {
      label: "備考",
      hiraganaLabel: "びこう",
      fieldCode: "備考",
      type: FIELDS.textArea,
    },
    workUnitPrice: {
      label: "作業単価",
      hiraganaLabel: "さぎょうたんか",
      fieldCode: "作業単価",
      type: FIELDS.number,
    },
    employeeId: {
      label: "従業員ID",
      hiraganaLabel: "じゅうぎょういんID",
      fieldCode: "従業員ID",
      type: FIELDS.recordNumber,
    },
  },
} as const;
