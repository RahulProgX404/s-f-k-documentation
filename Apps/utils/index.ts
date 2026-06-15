export const FIELDS = {
  string: "SINGLE_LINE_TEXT",
  textArea: "MULTI_LINE_TEXT",
  number: "DECIMAL",
  calculatedField: "CALCULATION_AUTO_COMPUTED",
  date: "DATE",
  datetime: "DATETIME",
  time: "TIME",
  link: "HYPERLINK",
  radio: "RADIO_BUTTON",
  checkbox: "CHECK_BOX",
  dropdown: "DROP_DOWN",
  paragraph: "RICH_TEXT",
  userSelect: "KINTONE_USER_PICKER",
  lookup: "LOOKUP",
  file: "FILE",
  group: "COLLAPSIBLE_SECTION",
  recordList: "RELATED_RECORDS_TABLE",
  recordNumber: "RECORD_NUMBER",
} as const;

export type FieldType = (typeof FIELDS)[keyof typeof FIELDS];

export type LookupMapping = {
  from: string;
  to: string;
};

export type DisplayCondition = {
  thisAppField: string;
  destAppField: string;
  condition: string;
};

export type BaseField<T extends FieldType = FieldType> = {
  label: string;
  hiraganaLabel: string;
  fieldCode: string;
  type: T;
  required?: boolean;
  formula?: string;
  isDeveloperField?: boolean;
  group?: string;
  table?: string;
  section?: string;
};

export type StringField = BaseField<typeof FIELDS.string>;
export type NumberField = BaseField<typeof FIELDS.number>;
export type TextAreaField = BaseField<typeof FIELDS.textArea>;
export type DateField = BaseField<typeof FIELDS.date>;
export type TimeField = BaseField<typeof FIELDS.time>;
export type DateTimeField = BaseField<typeof FIELDS.datetime>;
export type LinkField = BaseField<typeof FIELDS.link>;
export type ParagraphField = BaseField<typeof FIELDS.paragraph>;
export type UserSelectField = BaseField<typeof FIELDS.userSelect>;
export type FileField = BaseField<typeof FIELDS.file>;
export type CalculationField = BaseField<typeof FIELDS.calculatedField>;
export type GroupField = BaseField<typeof FIELDS.group>;
export type RecordNumber = BaseField<typeof FIELDS.recordNumber>;

export type RelatedRecordField = BaseField<typeof FIELDS.recordList> & {
  relatedApp: string;
  displayConditions: DisplayCondition[];
  displayFields: string[];
};

export type OptionFieldType =
  | typeof FIELDS.radio
  | typeof FIELDS.checkbox
  | typeof FIELDS.dropdown;

export type OptionField<T extends OptionFieldType> = BaseField<T> & {
  options: string[];
};

export type RadioField = OptionField<typeof FIELDS.radio>;
export type CheckboxField = OptionField<typeof FIELDS.checkbox>;
export type DropdownField = OptionField<typeof FIELDS.dropdown>;

export type LookupField = BaseField<typeof FIELDS.lookup> & {
  lookupApp: string;
  lookupFields: LookupMapping[];
};

export type AppField =
  | StringField
  | NumberField
  | TextAreaField
  | DateField
  | TimeField
  | DateTimeField
  | LinkField
  | RadioField
  | CheckboxField
  | DropdownField
  | ParagraphField
  | UserSelectField
  | LookupField
  | FileField
  | CalculationField
  | GroupField
  | RelatedRecordField
  | RecordNumber;

export type AppDefinition<
  TFields extends Record<string, AppField> = Record<string, AppField>,
> = {
  appName: string;
  appId: number;
  space: string;
  fields: TFields;
};
