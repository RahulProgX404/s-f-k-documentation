import { AppDefinition, FIELDS } from "../utils/index";

export const Machine_Master: AppDefinition = {
  appName: "03. 機械マスタ",
  appId: 7,
  space: "N/A",
  fields: {
    machineCode: {
      label: "機械コード",
      hiraganaLabel: "きかいコード",
      fieldCode: "機械コード",
      type: FIELDS.string,
    },
    machineName: {
      label: "機械名",
      hiraganaLabel: "きかいめい",
      fieldCode: "機械名",
      type: FIELDS.string,
    },
    processingUnitPricePerSheet: {
      label: "加工単価(枚)",
      hiraganaLabel: "かこうたんか (まい)",
      fieldCode: "加工単価(枚)",
      type: FIELDS.number,
    },
    unitPriceForModelChangePerTime: {
      label: "型替単価(回)",
      hiraganaLabel: "かたがえたんか (かい)",
      fieldCode: "型替単価_回_",
      type: FIELDS.string,
    },
    outsourcingLaborRatePerHour: {
      label: "内職単価(H)",
      hiraganaLabel: "ないしょくたんか (H)",
      fieldCode: "内職単価_H_",
      type: FIELDS.string,
    },
    machineHourlyRate: {
      label: "機械単価(H)",
      hiraganaLabel: "きかいたんか (H)",
      fieldCode: "機械単価_H_",
      type: FIELDS.number,
    },
    printingUnitPrice: {
      label: "印刷単価",
      hiraganaLabel: "いんさつたんか",
      fieldCode: "印刷単価",
      type: FIELDS.number,
    },
    plateChangeUnitPrice: {
      label: "版替単価",
      hiraganaLabel: "はんがえたんか",
      fieldCode: "版替単価",
      type: FIELDS.number,
    },
    mixedIntUnitPrice: {
      label: "練インキ単価",
      hiraganaLabel: "ねりインキたんか",
      fieldCode: "練インキ単価",
      type: FIELDS.number,
    },
    notes: {
      label: "備考",
      hiraganaLabel: "びこう",
      fieldCode: "備考",
      type: FIELDS.textArea,
    },
    machineId: {
      label: "機械マスタID",
      hiraganaLabel: "きかいマスタID",
      fieldCode: "機械マスタID",
      type: FIELDS.recordNumber,
    },
  },
} as const;
