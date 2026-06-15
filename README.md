# Kintone Apps — Complete Technical Documentation

### System: 製袋業（袋製造業）向け kintone カスタマイズシステム

### Total Apps Documented: 27

### Coverage: All Fields · Subtables · Views · Workflows · Plugins · Business Logic · Inter-App Links

---

## TABLE OF CONTENTS

| #    | App Name                       | Category        | Key Function                        |
| ---- | ------------------------------ | --------------- | ----------------------------------- |
| 01   | 取引先マスタ（得意先・仕入先） | Master Data     | Customer & Supplier central master  |
| 02   | 従業員マスタ                   | Master Data     | Employee records & rates            |
| 03   | 機械マスタ                     | Master Data     | Machine specs & cost rates          |
| 04   | 受注入力                       | Sales           | Order entry — most complex app      |
| 05   | 納品(仕入)入力                 | Purchase        | Purchase receiving & AP trigger     |
| 06   | 売上入力                       | Sales           | Sales entry & AR key generation     |
| 07   | 支払入力                       | Finance         | Outgoing payment batches            |
| 08   | 【新】日報入力                 | Production      | Daily work & cost reports           |
| 09   | 見積書管理                     | Sales           | Quotation management & PDF          |
| 10   | 納品書管理（売上）             | Sales           | Delivery note management & PDF      |
| 11   | 請求書管理（売上）             | Sales           | Invoice management (インボイス対応) |
| 12   | 製袋予定管理                   | Production      | Gantt chart production scheduling   |
| 13   | 在庫管理                       | Operations      | Real-time inventory tracking        |
| 14   | 事故報告管理                   | Compliance      | Accident & incident reporting       |
| 15   | 運送請求データ取込             | Finance         | Transport invoice import            |
| 16   | 申請管理                       | HR/Workflow     | Leave & approval requests           |
| 17   | 安全衛生チェック               | Compliance      | Safety inspection checklists        |
| 18   | アルコールチェック             | Compliance      | Driver alcohol checks (legal req.)  |
| 19   | 消耗品マスタ                   | Master Data     | Consumables master & reorder points |
| 20   | 消耗品発注                     | Procurement     | Consumables purchase orders         |
| 21   | 売入金管理（売上）             | Finance         | AR payment tracking & matching      |
| 22   | 過去の売上データ               | Finance/Archive | Historical sales by fiscal year     |
| 22-  | 過去の売上データ（開発アプリ） | Dev             | Developer copy for testing          |
| 23-2 | 売掛管理（締日別）             | Finance         | AR ledger by closing date           |
| 23   | 売掛管理                       | Finance         | AR ledger by calendar month         |
| 23   | 買掛管理                       | Finance         | AP ledger by month                  |
| 25   | 販売先別売上計画               | Planning        | Sales plan vs actual by customer    |

---

## HOW TO READ THIS DOCUMENT

### Field Type Legend

| Type Code          | Meaning                 | Notes                           |
| ------------------ | ----------------------- | ------------------------------- |
| SINGLE_LINE_TEXT   | Single-line text input  | Most common field type          |
| MULTIPLE_LINE_TEXT | Multi-line textarea     | Long text, memos                |
| DECIMAL            | Numeric / decimal       | Amounts, quantities, IDs        |
| CALC               | Calculated field        | Auto-computed — do not edit     |
| DATE               | Date picker             | YYYY-MM-DD                      |
| DATETIME           | Date + time picker      | Scheduling fields               |
| TIME               | Time-only picker        | HH:MM format                    |
| SINGLE_SELECT      | Dropdown single choice  | Fixed option list               |
| MULTIPLE_CHECK     | Checkbox group          | Multiple selections             |
| SINGLE_CHECK       | Single checkbox         | True/False                      |
| USER_SELECT        | Kintone user picker     | Links to kintone user accounts  |
| FILE               | File attachment         | PDFs, images, documents         |
| LINK               | Hyperlink field         | URL, tel, email (clickable)     |
| GROUP              | Collapsible section     | Visual grouping only            |
| REFERENCE_TABLE    | Related records display | Read-only view from another app |
| STATUS             | Process status field    | Used with kintone workflow      |

### Field Notation

| Symbol               | Meaning                                                    |
| -------------------- | ---------------------------------------------------------- |
| `*` after field name | Required field — cannot be blank                           |
| `[dev]`              | Developer-only hidden field — not visible to regular users |
| `→ LOOKUP`           | Value auto-filled via lookup from another app              |
| `CALC:`              | Formula-driven auto-calculated field                       |

### Critical Design Principles

1. **Every `*キー` field is sacred** — never rename fields ending in `キー`. They are the backbone of all cross-app Customine automation.
2. **`[dev]` fields must stay hidden** — Use field visibility settings to keep these from regular users.
3. **CALC fields are read-only** — Never try to manually set a CALC field value.
4. **Soft deletes everywhere** — No records are hard-deleted. Deactivation flags preserve history.

---

---

## 01. 取引先マスタ（得意先・仕入先）

**Category:** Master Data — Customer & Supplier Master
**Purpose:** Central master record for ALL companies the business transacts with. One record can serve as customer (得意先), supplier (仕入先), or both. This is the most critical master in the system — nearly every other app pulls data from here via lookup.

### Overview

```
Master Record Role:
  取引先マスタ is the single source of truth for:
  → Customer billing info (締日, 請求送付先, 消費税区分)
  → Supplier payment info (仕入カテゴリ, 支払条件)
  → Addresses (parent company AND individual company)
  → Invoice registration number (インボイス登録番号)
  → Historical reference tables (見積/納品/請求履歴)

Apps that LOOKUP from here:
  受注入力, 売上入力, 見積書管理, 納品書管理,
  請求書管理, 消耗品発注, 事故報告, 売入金管理
```

### Main Fields (74 total)

| Field Code                           | Label                   | Type               | Notes                                                   |
| ------------------------------------ | ----------------------- | ------------------ | ------------------------------------------------------- |
| ステータス                           | ステータス              | STATUS             | Record status                                           |
| 取引先コード                         | 取引先コード            | SINGLE_LINE_TEXT   | Unique customer/supplier code                           |
| 取引先名                             | 取引先名                | SINGLE_LINE_TEXT   | Full company name                                       |
| 略名                                 | 略名                    | SINGLE_LINE_TEXT   | Short name (used in document headers)                   |
| 親会社\_グループ会社                 | 親会社/グループ会社     | SINGLE_LINE_TEXT   | Parent/group company name                               |
| 旧得意先コード                       | 旧得意先コード          | SINGLE_LINE_TEXT   | Legacy code for historical matching                     |
| 担当者                               | 担当者                  | SINGLE_LINE_TEXT   | Customer's contact person name                          |
| 担当者\_0                            | 担当者                  | SINGLE_LINE_TEXT   | Secondary contact person                                |
| 自社担当者                           | 自社担当者              | USER_SELECT        | Our company's account manager                           |
| 担当者についてのメモ                 | 担当者についてのメモ    | MULTIPLE_LINE_TEXT | Notes about contacts                                    |
| **--- CLASSIFICATION ---**           |                         |                    |                                                         |
| 得意先分類区分                       | 得意先分類区分          | SINGLE_SELECT      | Customer classification category                        |
| 取引先カテゴリ                       | 取引先カテゴリ          | MULTIPLE_CHECK     | Transaction categories: 得意先/仕入先/両方              |
| 仕入カテゴリ                         | 仕入カテゴリ            | SINGLE_SELECT      | Purchase category type                                  |
| 得意先ステータス                     | 得意先ステータス        | SINGLE_SELECT      | Active/Inactive/Prospective                             |
| グループ名                           | グループ名              | SINGLE_SELECT      | Customer grouping                                       |
| 分類                                 | 分類                    | SINGLE_SELECT      | Sales classification                                    |
| フラグ                               | フラグ                  | SINGLE_LINE_TEXT   | [dev] Internal flag                                     |
| MF取引先ID                           | MF取引先ID              | SINGLE_LINE_TEXT   | MoneyForward integration ID                             |
| **--- BILLING SETTINGS ---**         |                         |                    |                                                         |
| 登録番号                             | 登録番号                | SINGLE_LINE_TEXT   | インボイス T-number (T + 13 digits)                     |
| 消費税区分                           | 消費税区分              | SINGLE_SELECT      | Tax type: 課税/非課税/免税/対象外                       |
| 端数区分                             | 端数区分                | SINGLE_SELECT      | Rounding: 切捨て/切上げ/四捨五入                        |
| 計算区分                             | 計算区分                | SINGLE_SELECT      | Calculation basis: 税込/税抜                            |
| 請求締日                             | 請求締日                | SINGLE_SELECT      | Billing closing date: 5日/10日/15日/20日/25日/末日/随時 |
| 請求書発行区分                       | 請求書発行区分          | SINGLE_SELECT      | Invoice delivery method                                 |
| 回収予定区分                         | 回収予定区分            | SINGLE_SELECT      | Expected collection type                                |
| 回収区分                             | 回収区分                | MULTIPLE_CHECK     | Collection method(s)                                    |
| 回収予定日                           | 回収予定日              | SINGLE_SELECT      | Expected payment date                                   |
| サイト                               | サイト                  | DECIMAL            | Payment terms (days)                                    |
| 金額*以上の金額*                     | 金額(以上の金額)万      | DECIMAL            | Credit limit (in 万円)                                  |
| 電子請求                             | 電子請求                | MULTIPLE_CHECK     | Electronic invoice delivery flag                        |
| 請求書送付先                         | 請求書送付先            | SINGLE_CHECK       | Invoice send to parent company                          |
| 納品書送付先                         | 納品書送付先            | SINGLE_CHECK       | Delivery note send to parent company                    |
| 納品書発行区分                       | 納品書発行区分          | SINGLE_SELECT      | Delivery note method                                    |
| **--- PARENT COMPANY ADDRESS ---**   |                         |                    |                                                         |
| 郵便番号*親会社*                     | 郵便番号(親会社)        | SINGLE_LINE_TEXT   | Parent company postal code                              |
| 都道府県*親会社*                     | 都道府県(親会社)        | SINGLE_LINE_TEXT   | Prefecture                                              |
| 市区町村*親会社*                     | 市区町村(親会社)        | SINGLE_LINE_TEXT   | City/ward                                               |
| 町名*親会社*                         | 町名(親会社)            | SINGLE_LINE_TEXT   | Street/district                                         |
| 住所*親会社*                         | 住所(親会社)            | SINGLE_LINE_TEXT   | Full address                                            |
| TEL*親会社*                          | TEL(親会社)             | LINK               | Phone number (clickable)                                |
| FAX*親会社*                          | FAX(親会社)             | LINK               | FAX number                                              |
| **--- CUSTOMER ADDRESS ---**         |                         |                    |                                                         |
| 郵便番号*得意先*                     | 郵便番号(得意先)        | SINGLE_LINE_TEXT   | Customer postal code                                    |
| 都道府県*得意先*                     | 都道府県(得意先)        | SINGLE_LINE_TEXT   | Prefecture                                              |
| 市区町村*得意先*                     | 市区町村(得意先)        | SINGLE_LINE_TEXT   | City/ward                                               |
| 町名*得意先*                         | 町名(得意先)            | SINGLE_LINE_TEXT   | Street/district                                         |
| 住所*得意先*                         | 住所(得意先)            | SINGLE_LINE_TEXT   | Full address                                            |
| TEL*得意先*                          | TEL(得意先)             | LINK               | Phone                                                   |
| FAX*得意先*                          | FAX(得意先)             | LINK               | FAX                                                     |
| 契約書等添付                         | 契約書等添付(得意先用） | FILE               | Contract documents attachment                           |
| **--- SUPPLIER SECTION ---**         |                         |                    |                                                         |
| 郵便番号*仕入先*                     | 郵便番号(仕入先)        | SINGLE_LINE_TEXT   | Supplier postal code                                    |
| 都道府県*仕入先*                     | 都道府県(仕入先)        | SINGLE_LINE_TEXT   | Prefecture                                              |
| 市区町村*仕入先*                     | 市区町村(仕入先)        | SINGLE_LINE_TEXT   | City/ward                                               |
| 町名*仕入先*                         | 町名(仕入先)            | SINGLE_LINE_TEXT   | Street/district                                         |
| 住所*仕入先*                         | 住所(仕入先)            | SINGLE_LINE_TEXT   | Full address                                            |
| TEL*仕入先*                          | TEL(仕入先)             | LINK               | Supplier phone                                          |
| FAX*仕入先*                          | FAX(仕入先)             | LINK               | Supplier FAX                                            |
| 仕入先住所も同様                     | 仕入先住所も同様        | MULTIPLE_CHECK     | Flag: supplier address = customer address               |
| 消費税区分*仕入先*                   | 消費税区分(仕入先)      | SINGLE_SELECT      | Supplier tax classification                             |
| 端数区分*仕入先*                     | 端数区分(仕入先)        | SINGLE_SELECT      | Supplier rounding method                                |
| 計算区分*仕入先*                     | 計算区分(仕入先)        | SINGLE_SELECT      | Supplier calculation basis                              |
| 前回支払残高                         | 前回支払残高            | DECIMAL            | Previous payment balance (legacy)                       |
| 前回買掛残高                         | 前回買掛残高            | DECIMAL            | Previous AP balance (legacy)                            |
| 旧得意先コード*仕入*                 | 旧得意先コード(仕入)    | SINGLE_LINE_TEXT   | Legacy supplier code                                    |
| 契約書等添付\_0                      | 契約書等添付(仕入用）   | FILE               | Supplier contract attachment                            |
| 備考                                 | 備考                    | MULTIPLE_LINE_TEXT | Customer notes                                          |
| 備考\_0                              | 備考                    | MULTIPLE_LINE_TEXT | Supplier notes                                          |
| **--- HISTORY REFERENCE TABLES ---** |                         |                    |                                                         |
| 見積履歴\_0                          | 見積履歴                | REFERENCE_TABLE    | Shows linked quotation records                          |
| 納品履歴\_0                          | 納品履歴                | REFERENCE_TABLE    | Shows linked delivery records                           |
| 請求履歴\_0                          | 請求履歴                | REFERENCE_TABLE    | Shows linked invoice records                            |

### Views

| View Name            | Type   | Purpose       |
| -------------------- | ------ | ------------- |
| 取引先一覧           | LIST   | All companies |
| 取引先一覧(検索特化) | CUSTOM | Smart search  |
| （すべて）           | LIST   | Default       |

### Key Logic

```
DUAL ROLE DESIGN:
  One record = One company
  取引先カテゴリ (MULTIPLE_CHECK) determines role:
    得意先 → used in sales/AR lookups
    仕入先 → used in purchase/AP lookups
    Both → appears in both contexts

ADDRESS HIERARCHY:
  Parent company address (親会社) = billing/invoice address
  Customer address (得意先) = delivery/shipping address
  Supplier address (仕入先) = supplier's physical address

  When 請求書送付先 = checked → use 親会社 address on invoice
  When unchecked → use 得意先 address

INVOICE COMPLIANCE (インボイス制度):
  登録番号 = T + 13-digit tax registration number
  This number MUST appear on all invoices to this customer
  If empty → customer may not be eligible for tax deduction

CLOSING DATE DRIVES ENTIRE BILLING CYCLE:
  請求締日 set here propagates to:
  → 売上入力.請求締日 (when order is created)
  → 売掛管理.締日 (for AR grouping)
  → 売掛管理(締日別) view filtering

8 active plugins — very high, includes Customine + history plugins
```

### What to Watch When Modifying

- This is the most-looked-up app — changing field codes breaks ALL dependent lookups
- 登録番号 format must start with "T" followed by 13 digits
- 端数区分/消費税区分/計算区分 values must match exactly what other apps expect
- History REFERENCE_TABLEs are display-only — they show data from 見積, 納品, 請求書 apps

---

---

## 02. 従業員マスタ

**Category:** Master Data — Employee Master
**Purpose:** Stores all employee records. Used as a lookup source for daily reports, alcohol checks, safety checks, and approval requests. The 在籍状況 flag determines if they appear in active employee lists.

### Main Fields

| Field Code     | Label          | Type               | Notes                                    |
| -------------- | -------------- | ------------------ | ---------------------------------------- |
| ステータス     | ステータス     | STATUS             | Record status                            |
| 従業員名       | 従業員名       | SINGLE_LINE_TEXT   | Full name                                |
| ふりがな       | ふりがな       | SINGLE_LINE_TEXT   | Reading in hiragana                      |
| 従業員カテゴリ | 従業員カテゴリ | SINGLE_SELECT      | 正社員/パート/アルバイト/派遣 etc.       |
| 担当者コード   | 担当者コード   | SINGLE_LINE_TEXT   | Staff code (used in sales/order linking) |
| 作業員コード   | 作業員コード   | SINGLE_LINE_TEXT   | Worker code (used in 日報入力)           |
| 作業単価       | 作業単価       | DECIMAL            | Hourly wage rate (auto-filled into 日報) |
| 部課コード     | 部課コード     | SINGLE_LINE_TEXT   | Department code                          |
| 在籍状況       | 在籍状況       | SINGLE_CHECK       | Employment status: checked = active      |
| 備考           | 備考           | MULTIPLE_LINE_TEXT | Notes                                    |

### Views

| View Name            | Type   | Filter                           |
| -------------------- | ------ | -------------------------------- |
| 在籍中の従業員一覧   | LIST   | 在籍状況 = checked (active only) |
| 従業員一覧(検索特化) | CUSTOM | Smart search                     |
| （すべて）           | LIST   | All including former employees   |

### Key Logic

```
ACTIVE EMPLOYEE FILTER:
  在籍状況 = SINGLE_CHECK (checked = active)
  在籍中の従業員一覧 filters by this field
  When employee leaves: uncheck 在籍状況 (soft delete)
  DO NOT delete records — historical 日報 references them

CODE FIELDS AND THEIR USES:
  担当者コード → copied to 売上入力, 受注入力 (sales person tracking)
  作業員コード → copied to 日報入力 (worker identification)
  部課コード → copied to 日報入力 (department tracking)
  作業単価 → auto-filled to 日報入力 for labor cost calculation

LOOKUP CHAIN:
  日報入力: 従業員ID → 従業員マスタ
    auto-fills: 作業者名, 作業員コード, 担当者コード, 部課コード, 作業単価

4 active plugins — minimal, just search and Customine
```

---

---

## 03. 機械マスタ

**Category:** Master Data — Machine/Equipment Master
**Purpose:** Stores all production machines with their pricing rates. Used as a lookup source for production scheduling (製袋予定管理) and daily reports (日報入力) to auto-fill cost rates.

### Main Fields

| Field Code   | Label        | Type               | Notes                                 |
| ------------ | ------------ | ------------------ | ------------------------------------- |
| ステータス   | ステータス   | STATUS             | Machine status                        |
| 機械コード   | 機械コード   | SINGLE_LINE_TEXT   | Unique machine identifier code        |
| 機械名       | 機械名       | SINGLE_LINE_TEXT   | Machine name (e.g., 製袋機1号)        |
| 加工単価*枚* | 加工単価(枚) | DECIMAL            | Processing rate per sheet (¥/枚)      |
| 型替単価*回* | 型替単価(回) | DECIMAL            | Die change rate per occurrence (¥/回) |
| 内職単価*H*  | 内職単価(H)  | DECIMAL            | Piecework rate per hour (¥/H)         |
| 機械単価*H*  | 機械単価(H)  | DECIMAL            | Machine usage rate per hour (¥/H)     |
| 印刷単価     | 印刷単価     | DECIMAL            | Printing rate                         |
| 版替単価     | 版替単価     | DECIMAL            | Plate change rate                     |
| 練インキ単価 | 練インキ単価 | DECIMAL            | Ink mixing rate                       |
| 備考         | 備考         | MULTIPLE_LINE_TEXT | Machine notes/specifications          |

### Views

| View Name          | Type   |
| ------------------ | ------ |
| 機械一覧           | LIST   |
| 機会一覧(検索特化) | CUSTOM |
| （すべて）         | LIST   |

### Key Logic

```
RATE LOOKUP CHAIN:
  When 機械名/機械コード is entered in 日報入力 subtable:
  → Customine/JS auto-fills all rate fields:
    加工単価(枚), 型替単価(回), 内職単価(H),
    機械単価(H), 印刷単価, 版替単価, 練インキ単価
  → These rates are used in CALC formulas for cost calculation

RATE CHANGE IMPACT:
  Changing a machine's rate in this master does NOT retroactively
  change historical 日報 records (rates are copied at time of entry)
  → This is correct behavior — historical costs should be preserved

製袋予定管理 LINK:
  機械コード in 製袋予定管理 must match 機械コード here
  The Gantt chart groups schedule bars by 機械名

Only 2 plugins — simplest app in the system
```

---

---

## 04. 受注入力

**Category:** Sales — Order Entry (Most Complex App)
**Purpose:** The core order management app. Records every customer order with complete product specifications for bag manufacturing: dimensions, materials, printing, die-cutting, packaging. This single record drives the entire production and delivery workflow.

### Overview

```
Order Flow:
  Sales creates 受注入力 record
  → 得意先 selected → auto-fills address, 締日, billing settings
  → Product specs entered: サイズ, 紙, 印刷, 製袋specs, etc.
  → Cost calculation: 見積原価合計, 見積利益, 利益率
  → Production: record links to 製袋予定管理, 日報入力
  → Sales: links to 売上入力 (tracks 売上済数量 vs 受注数量)
  → Completion: 製造残数量 = 0, 売上残数量 = 0
```

### Main Fields (139 total — selected key fields)

| Field Code                          | Label                          | Type               | Notes                                |
| ----------------------------------- | ------------------------------ | ------------------ | ------------------------------------ |
| **--- ORDER HEADER ---**            |                                |                    |                                      |
| ステータス                          | ステータス                     | STATUS             | Order workflow status                |
| ステータス\_0                       | ステータス                     | SINGLE_SELECT      | Manual status display field          |
| 注番                                | 注番                           | SINGLE_LINE_TEXT   | Order number (unique identifier)     |
| 受注日                              | 受注日                         | DATE               | Order received date                  |
| 担当者                              | 担当者                         | USER_SELECT        | Sales person responsible             |
| 得意先*受注先*                      | 得意先(受注先)                 | SINGLE_LINE_TEXT   | Customer name (LOOKUP)               |
| 受注先の得意先ID                    | 受注先の得意先ID               | DECIMAL            | [dev] FK to 取引先マスタ             |
| 受注先の得意先コード                | 受注先の得意先コード           | SINGLE_LINE_TEXT   | [dev] Customer code                  |
| 締日                                | 締日                           | SINGLE_LINE_TEXT   | Closing date from customer master    |
| **--- PRODUCT SPECS ---**           |                                |                    |                                      |
| 品名                                | 品名                           | SINGLE_LINE_TEXT   | Product name                         |
| 数量                                | 数量                           | DECIMAL            | Ordered quantity                     |
| 単位                                | 単位                           | SINGLE_SELECT      | Unit: 枚/個/冊 etc.                  |
| 見本                                | 見本                           | DECIMAL            | Sample quantity                      |
| 予備                                | 予備                           | DECIMAL            | Extra/spare quantity                 |
| 納期                                | 納期                           | DATE               | Required delivery date               |
| 時間                                | 時間                           | TIME               | Delivery time                        |
| 備考                                | 備考                           | SINGLE_LINE_TEXT   | Short notes                          |
| 備考\_0                             | 備考(メモ用)                   | MULTIPLE_LINE_TEXT | Internal memo notes                  |
| 作業者への伝言メモ                  | 作業者への伝言メモ(注文書右上) | MULTIPLE_LINE_TEXT | Message to factory workers           |
| 注意事項等                          | 注意事項等(備考欄下)           | MULTIPLE_LINE_TEXT | Special instructions                 |
| FSC                                 | FSC                            | MULTIPLE_CHECK     | FSC certification required           |
| FSC該当判定                         | FSC該当判定                    | SINGLE_LINE_TEXT   | [dev] FSC eligibility flag           |
| **--- BAG MANUFACTURING SPECS ---** |                                |                    |                                      |
| 製袋予定規格                        | 製袋予定規格                   | SINGLE_SELECT      | Bag specification type               |
| 角・長・洋                          | 角・長・洋                     | SINGLE_SELECT      | Envelope type: 角形/長形/洋形        |
| 号                                  | 号                             | SINGLE_LINE_TEXT   | Envelope size number                 |
| 左右                                | 左右                           | DECIMAL            | Width dimension (mm)                 |
| 天地                                | 天地                           | DECIMAL            | Height dimension (mm)                |
| ふた                                | ふた                           | DECIMAL            | Flap dimension (mm)                  |
| 底                                  | 底                             | DECIMAL            | Bottom dimension (mm)                |
| 展開寸法*左右*                      | 展開寸法(左右)                 | DECIMAL            | Flat width (mm)                      |
| 展開寸法*天地*                      | 展開寸法(天地)                 | DECIMAL            | Flat height (mm)                     |
| 貼方                                | 貼方                           | SINGLE_SELECT      | Sealing/gluing method                |
| ドロップダウン\_1                   | ふた区分                       | SINGLE_SELECT      | Flap type                            |
| 抜き                                | 抜き                           | SINGLE_SELECT      | Die cut specification                |
| 口糊                                | 口糊                           | SINGLE_SELECT      | Mouth adhesive type                  |
| 胴糊                                | 胴糊                           | SINGLE_SELECT      | Body adhesive type                   |
| 抜型                                | 抜型                           | SINGLE_LINE_TEXT   | Die mold number                      |
| 窓                                  | 窓                             | SINGLE_SELECT      | Window type                          |
| 窓*左右*                            | 窓(左右)                       | DECIMAL            | Window width                         |
| 窓*天地*                            | 窓(天地)                       | DECIMAL            | Window height                        |
| 左から                              | 左から                         | DECIMAL            | Window position from left            |
| 底から                              | 底から                         | DECIMAL            | Window position from bottom          |
| ケース番号                          | ダンボール番号                 | SINGLE_LINE_TEXT   | Cardboard box number                 |
| 入り数                              | 入り数                         | DECIMAL            | Items per box                        |
| 入数指定                            | 入数指定                       | MULTIPLE_CHECK     | Custom packing specification         |
| 仕切りケース                        | 仕切りケース                   | MULTIPLE_CHECK     | Partition box required               |
| 帯                                  | 帯                             | MULTIPLE_CHECK     | Band/wrapper required                |
| 帯枚数                              | 帯枚数                         | DECIMAL            | Number of bands                      |
| ラベル                              | ラベル                         | MULTIPLE_CHECK     | Label required                       |
| **--- PLATE/PRINT SPECS ---**       |                                |                    |                                      |
| 新旧版区分                          | 新旧版区分                     | SINGLE_SELECT      | New/existing plate                   |
| 前回使用日                          | 前回使用日                     | DATE               | Last plate usage date                |
| 版数                                | 版数                           | DECIMAL            | Number of plates                     |
| 単価*刷版*                          | 単価(刷版)                     | DECIMAL            | Plate unit price                     |
| 金額*刷版*                          | 金額(刷版)                     | CALC               | Plate amount                         |
| 保存区分                            | 保存区分                       | SINGLE_CHECK       | Plate storage required               |
| 版区分                              | 版区分                         | SINGLE_SELECT      | Plate type                           |
| デザイン料                          | デザイン料                     | DECIMAL            | Design fee                           |
| データ支給                          | データ支給                     | SINGLE_CHECK       | Customer provides data               |
| フィルム支給                        | フィルム支給                   | SINGLE_CHECK       | Customer provides film               |
| **--- PRICING ---**                 |                                |                    |                                      |
| 単価\_製袋                          | 単価                           | DECIMAL            | Bag manufacturing unit price         |
| 金額\_製袋                          | 金額                           | CALC               | Bag manufacturing amount             |
| 金額\_手動\_\_1                     | 金額(手動)                     | DECIMAL            | Manual override amount               |
| ケース代                            | ケース代                       | DECIMAL            | Box/case cost                        |
| 送料                                | 送料                           | DECIMAL            | Shipping charge                      |
| 売上金額                            | 売上金額                       | DECIMAL            | Total sales amount                   |
| 小計                                | 小計                           | CALC               | Subtotal of components               |
| **--- COST/PROFITABILITY ---**      |                                |                    |                                      |
| 見積原価合計                        | 見積原価合計                   | CALC               | Estimated total cost                 |
| 見積利益                            | 見積利益                       | CALC               | Estimated profit                     |
| 利益率                              | 利益率                         | CALC               | Profit margin %                      |
| 利益                                | 利益                           | DECIMAL            | Actual profit                        |
| 仕入金額                            | 仕入金額                       | DECIMAL            | Actual purchase cost                 |
| 社内原価                            | 社内原価                       | DECIMAL            | Internal production cost             |
| 実原価合計                          | 実原価合計                     | CALC               | Actual total cost                    |
| 実売上金額                          | 実売上金額                     | CALC               | Actual sales amount                  |
| **--- PRODUCTION TRACKING ---**     |                                |                    |                                      |
| 製造済数量                          | 製造済数量                     | DECIMAL            | Manufactured qty (updated from 日報) |
| 製造残数量                          | 製造残数量                     | CALC               | 数量 - 製造済数量                    |
| 製作完了見込み時間                  | 製作完了見込み時間             | DECIMAL            | Estimated production time            |
| 機械                                | 機械                           | SINGLE_LINE_TEXT   | Assigned machine name                |
| 機械コード                          | 機械コード                     | SINGLE_LINE_TEXT   | Machine code                         |
| **--- SALES TRACKING ---**          |                                |                    |                                      |
| 売上済数量                          | 売上済数量                     | DECIMAL            | Already invoiced quantity            |
| 売上残数量                          | 売上残数量                     | CALC               | 数量 - 売上済数量                    |
| 現在売上済金額                      | 現在売上済金額                 | DECIMAL            | Total invoiced amount to date        |
| 製造売上                            | 製造売上                       | DECIMAL            | Manufacturing revenue recorded       |
| **--- PRODUCTION DATES ---**        |                                |                    |                                      |
| 印刷日                              | 印刷日                         | DATE               | Planned print date                   |
| 印刷場所                            | 印刷場所                       | SINGLE_LINE_TEXT   | Print location/supplier              |
| 持込日                              | 持込日                         | DATE               | Material bring-in date               |
| 持込場所                            | 持込場所                       | SINGLE_LINE_TEXT   | Bring-in location                    |
| 持込便                              | 持込便                         | SINGLE_LINE_TEXT   | Transport method                     |
| 完成日                              | 完成日                         | DATE               | Completion date                      |
| **--- DOCUMENT LINKS ---**          |                                |                    |                                      |
| 作業明細表*注文書*                  | 作業明細表(注文書)             | FILE               | Work order document                  |
| 作業明細表*営業控*                  | 作業明細表(営業控)             | FILE               | Sales copy document                  |
| 作業明細表*原稿添付用*              | 作業明細表(原稿添付用)         | FILE               | Manuscript attachment copy           |
| PDF保存*注文書*                     | PDF保存(注文書)                | SINGLE_LINE_TEXT   | [dev] Work order PDF URL             |
| **--- INTEGRATION KEYS ---**        |                                |                    |                                      |
| 注番\_日報連携キー                  | 注番\_日報連携キー             | SINGLE_LINE_TEXT   | [dev] Key for 日報入力 link          |
| 加算更新用キー                      | 加算更新用キー                 | SINGLE_LINE_TEXT   | [dev] Key for incremental updates    |
| 関連レコードキー                    | 関連レコードキー               | SINGLE_LINE_TEXT   | [dev] General cross-app link key     |
| **--- REFERENCE TABLES ---**        |                                |                    |                                      |
| 日報一覧                            | 日報一覧                       | REFERENCE_TABLE    | Shows linked daily reports           |
| 仕入履歴                            | 仕入履歴                       | REFERENCE_TABLE    | Shows linked purchase records        |

### Subtables

**1. 用紙情報 (Paper/Material Info)**

| Field          | Label    | Type             | Notes                            |
| -------------- | -------- | ---------------- | -------------------------------- |
| 仕入先*用紙*   | 仕入先   | SINGLE_LINE_TEXT | Paper supplier                   |
| 得意先ID       | 得意先ID | DECIMAL          | Supplier FK                      |
| 用紙名称       | 用紙名称 | SINGLE_LINE_TEXT | Paper material name              |
| 判             | 判       | SINGLE_LINE_TEXT | Paper sheet size                 |
| kg             | kg       | DECIMAL          | Paper weight                     |
| 目             | 目       | SINGLE_SELECT    | Paper grain direction: 縦目/横目 |
| 枚数           | 枚数     | DECIMAL          | Number of sheets                 |
| 計算方法       | 計算方法 | SINGLE_SELECT    | Calculation method               |
| 用紙単価       | 用紙単価 | DECIMAL          | Paper unit price                 |
| 用紙金額       | 用紙金額 | CALC             | Paper cost                       |
| 束             | 束       | DECIMAL          | Bundles                          |
| 断裁単価       | 断裁単価 | DECIMAL          | Cutting unit price               |
| 断裁金額       | 断裁金額 | CALC             | Cutting cost                     |
| 切             | 切       | SINGLE_LINE_TEXT | Cut specification                |
| 略名\_用紙情報 | 略名     | SINGLE_LINE_TEXT | Supplier short name              |

**2. 印刷 (Printing)**

| Field                | Label  | Type             | Notes                         |
| -------------------- | ------ | ---------------- | ----------------------------- |
| 仕入先\_印刷テーブル | 仕入先 | SINGLE_LINE_TEXT | Print supplier                |
| 面付\_印刷テーブル   | 面付   | DECIMAL          | Imposition (sheets per plate) |
| 通し数\_印刷テーブル | 通し数 | DECIMAL          | Print run count               |
| 色数\_印刷テーブル   | 色数   | DECIMAL          | Number of colors              |
| 刷色\_印刷テーブル   | 刷色   | SINGLE_LINE_TEXT | Ink colors                    |
| 単価\_印刷テーブル   | 単価   | DECIMAL          | Print unit price              |
| 金額\_印刷テーブル   | 金額   | CALC             | Print cost                    |

**3. トムソン・NO・シルク・箔 (Die Cut / Embossing / Foil)**

Similar structure to printing table — for special finishing processes.

**4. 売上履歴 (Sales History — display subtable)**

| Field       | Label    | Type             |
| ----------- | -------- | ---------------- |
| 売上No      | 売上No   | SINGLE_LINE_TEXT |
| 売上日付    | 売上日付 | DATE             |
| 売上金額\_0 | 売上金額 | DECIMAL          |

### Views

| View Name              | Type   | Filter                   |
| ---------------------- | ------ | ------------------------ |
| 自分が担当の受注一覧   | LIST   | LOGINUSER() — my orders  |
| 受注一覧               | LIST   | All orders               |
| 受注一覧(検索特化)     | CUSTOM | Smart search             |
| 売上完了               | LIST   | 売上残数量 = 0           |
| 未売上あり             | LIST   | 売上残数量 >= 1          |
| 未製造あり             | LIST   | 製造残数量 >= 1          |
| 製造完了               | LIST   | 製造残数量 = 0           |
| 発送完了済             | LIST   | Status = shipped         |
| 製袋予定一覧           | LIST   | Production schedule view |
| 製袋予定表出力(テスト) | LIST   | Print output test        |
| （すべて）             | LIST   | Default                  |

### Key Logic

```
ORDER COMPLETION TRACKING:
  製造完了 = when 製造残数量 = 0
  売上完了 = when 売上残数量 = 0
  Both 0 = fully complete order
  These are CALC fields:
    製造残数量 = 数量 - 製造済数量
    売上残数量 = 数量 - 売上済数量

PROFITABILITY CALCULATION:
  見積原価合計 = 用紙金額 + 断裁金額 + 印刷金額 + 製袋金額 + 版代
  見積利益 = 売上金額 - 見積原価合計
  利益率 = 見積利益 / 売上金額 × 100

UPDATE FROM OTHER APPS:
  製造済数量 ← updated from 日報入力 when jobs are logged
  売上済数量 ← updated from 売上入力 when sales are recorded
  仕入金額 ← updated from 納品(仕入)入力

注番_日報連携キー:
  Format: likely {注番} or {注番}_{品名}
  Used by 日報入力 subtable to cross-link to orders

15 active plugins — highest in system
  Includes: Customine, PDF generation, print plugin,
            krewSheet, Gantt plugin, search plugin
```

---

---

## 05. 納品(仕入)入力

**Category:** Purchase — Purchase/Delivery Receiving
**Purpose:** Records goods received from suppliers (inbound deliveries). Each record = one delivery receipt from one supplier on one date. Links to 受注入力 via 受注No, triggers AP update in 買掛管理.

### Main Fields

| Field Code           | Label                      | Type             | Notes                          |
| -------------------- | -------------------------- | ---------------- | ------------------------------ |
| ステータス           | ステータス                 | STATUS           | Record status                  |
| 納品*仕入*日         | 納品(仕入)日               | DATE             | Delivery/receipt date          |
| 納品*仕入*入力No     | 納品(仕入)入力No           | SINGLE_LINE_TEXT | Unique receiving record number |
| 仕入先               | 仕入先                     | SINGLE_LINE_TEXT | Supplier name (LOOKUP)         |
| 仕入先\_得意先ID     | 仕入先/得意先ID            | DECIMAL          | [dev] FK to 取引先マスタ       |
| 受注No               | 受注No                     | SINGLE_LINE_TEXT | Linked order number            |
| 得意先ID*受注No*     | 得意先ID(受注No)           | DECIMAL          | [dev] Customer ID via order    |
| 品名\_0              | 品名                       | SINGLE_LINE_TEXT | Received item name             |
| 単価\_0              | 単価                       | DECIMAL          | Unit price                     |
| 数量\_0              | 数量                       | DECIMAL          | Quantity received              |
| 金額\_0              | 金額                       | DECIMAL          | Base amount                    |
| 断裁金額             | 断裁金額                   | DECIMAL          | Cutting surcharge              |
| 版代                 | 版代・木型代               | DECIMAL          | Plate/die fee                  |
| 置き版代             | 置き版代・セット代・その他 | DECIMAL          | Plate storage/setup fee        |
| 特色                 | 特色・色替・CPU・その他    | DECIMAL          | Special color/misc fee         |
| 仕入金額合計         | 仕入金額合計               | CALC             | SUM of all charges             |
| 仕入年月             | 仕入年月                   | SINGLE_LINE_TEXT | YYYYMM for AP period           |
| 仕入カテゴリ         | 仕入カテゴリ               | SINGLE_SELECT    | Purchase category              |
| 仕入カテゴリ*マスタ* | 仕入カテゴリ(マスタ)       | SINGLE_LINE_TEXT | Category from master           |
| 仕入カテゴリ判定     | 仕入カテゴリ判定           | SINGLE_LINE_TEXT | [dev] Category determination   |
| 買掛連携キー         | 買掛連携キー               | SINGLE_LINE_TEXT | [dev] Key to update 買掛管理   |
| 支払済金額           | 支払済金額                 | DECIMAL          | Amount already paid            |
| 支払残               | 支払残                     | CALC             | 仕入金額合計 - 支払済金額      |
| 支払判定             | 支払判定                   | SINGLE_LINE_TEXT | Payment status flag            |
| 消費税区分           | 消費税区分                 | SINGLE_LINE_TEXT | Tax classification             |
| 端数区分*仕入*       | 端数区分(仕入)             | SINGLE_LINE_TEXT | Rounding method                |
| 帳端処理             | 帳端処理                   | MULTIPLE_CHECK   | Period-end processing flag     |
| 受注連携             | 受注連携                   | MULTIPLE_CHECK   | Whether to update 受注入力     |
| 買掛連携             | 買掛連携                   | MULTIPLE_CHECK   | Whether to update 買掛管理     |
| 仕入原価超過         | 仕入原価超過               | MULTIPLE_CHECK   | Flag: actual > estimated cost  |
| 通知先               | 通知先                     | USER_SELECT      | Who to notify on cost overrun  |
| 用紙超過チェック     | 用紙超過チェック           | SINGLE_LINE_TEXT | Paper cost overrun indicator   |
| 印刷超過チェック     | 印刷超過チェック           | SINGLE_LINE_TEXT | Print cost overrun indicator   |
| トムソン超過チェック | トムソン超過チェック       | SINGLE_LINE_TEXT | Die-cut cost overrun indicator |
| 刷版超過チェック     | 刷版超過チェック           | SINGLE_LINE_TEXT | Plate cost overrun indicator   |
| FSC                  | FSC                        | MULTIPLE_CHECK   | FSC certified materials        |
| 関連レコードキー     | 関連レコードキー           | SINGLE_LINE_TEXT | [dev] Cross-app link key       |
| 注番基本情報         | 注番基本情報               | REFERENCE_TABLE  | Shows linked order info        |
| 同注番の仕入履歴     | 同注番の仕入履歴           | REFERENCE_TABLE  | Other purchases for same order |

### Views

| View Name                | Type   |
| ------------------------ | ------ |
| 納品(仕入)一覧           | LIST   |
| 納品(仕入)一覧(検索特化) | CUSTOM |
| （すべて）               | LIST   |

### Key Logic

```
COST CALCULATION:
  仕入金額合計 = 金額 + 断裁金額 + 版代 + 置き版代 + 特色
  支払残 = 仕入金額合計 - 支払済金額

AP UPDATE (買掛連携):
  When 買掛連携 is checked:
  買掛連携キー format: {仕入先ID}_{仕入年月}
  → Customine updates 買掛管理.仕入額 and category fields
  Category mapped from 仕入カテゴリ to specific field in 買掛管理

ORDER UPDATE (受注連携):
  When 受注連携 is checked:
  → Updates 受注入力.仕入金額 with this delivery amount
  → Used for actual vs estimated cost comparison

COST OVERRUN ALERTS:
  If actual purchase cost > estimated (from 受注入力):
  仕入原価超過 is checked
  通知先 user receives kintone notification
  Specific overrun fields show which category exceeded budget:
    用紙超過, 印刷超過, トムソン超過, 刷版超過

11 active plugins — high automation
```

---

---

## 06. 売上入力

**Category:** Sales — Sales Entry
**Purpose:** Records individual sales transactions. Each record = one delivery/sale line item. Links to 受注入力 via 注番, generates 納品書 (delivery note) and 請求書 (invoice), and updates 売掛管理 AR balances.

### Main Fields (92 total — key fields)

| Field Code                          | Label                | Type             | Notes                                   |
| ----------------------------------- | -------------------- | ---------------- | --------------------------------------- |
| **--- SALE HEADER ---**             |                      |                  |                                         |
| ステータス                          | ステータス           | STATUS           | Record status                           |
| 区分                                | 区分                 | SINGLE_CHECK     | Type flag (e.g., regular vs adjustment) |
| 売上日                              | 売上日               | DATE             | Sale/delivery date                      |
| 売上No                              | 売上No               | SINGLE_LINE_TEXT | Unique sales record number              |
| 注番                                | 注番                 | SINGLE_LINE_TEXT | Linked order number (from 受注入力)     |
| 売上先                              | 売上先               | SINGLE_LINE_TEXT | Customer name (LOOKUP)                  |
| 売上先の得意先ID                    | 売上先の得意先ID     | DECIMAL          | [dev] FK to 取引先マスタ                |
| 売上先の得意先コード                | 売上先の得意先コード | SINGLE_LINE_TEXT | [dev] Customer code                     |
| 得意先名                            | 得意先名             | SINGLE_LINE_TEXT | Customer display name                   |
| 担当者                              | 担当者               | USER_SELECT      | Sales person                            |
| **--- PRODUCT ---**                 |                      |                  |                                         |
| 品名                                | 品名                 | SINGLE_LINE_TEXT | Product name                            |
| 売上数量                            | 売上数量             | DECIMAL          | Quantity sold this transaction          |
| 単位                                | 単位                 | SINGLE_SELECT    | Unit                                    |
| 売上単価                            | 売上単価             | DECIMAL          | Unit selling price                      |
| 売上金額                            | 売上金額             | DECIMAL          | Sale amount (qty x price)               |
| 合計売上金額                        | 合計売上金額         | CALC             | Total including adjustments             |
| 受注数量                            | 受注数量             | DECIMAL          | Original ordered quantity               |
| 見積原価合計                        | 見積原価合計         | DECIMAL          | Estimated cost from order               |
| **--- TAX CALCULATION ---**         |                      |                  |                                         |
| 税率                                | 税率                 | SINGLE_SELECT    | 10% or 8%                               |
| 税区分                              | 税区分               | SINGLE_CHECK     | Tax classification flag                 |
| 消費税                              | 消費税               | CALC             | Tax amount                              |
| 売上金額*税込*                      | 売上金額(税込)       | CALC             | Total incl. tax                         |
| 売上金額*税抜*                      | 売上金額(税抜)       | CALC             | Total excl. tax                         |
| *10*対象売上金額                    | 10%対象売上金額      | CALC             | Amount at 10%                           |
| *8*対象売上金額                     | 8%対象売上金額       | CALC             | Amount at 8%                            |
| *10*対象消費税                      | 10%対象消費税        | CALC             | Tax at 10%                              |
| *8*対象消費税                       | 8%対象消費税         | CALC             | Tax at 8%                               |
| 端数区分                            | 端数区分             | SINGLE_LINE_TEXT | Rounding method                         |
| **--- BILLING ---**                 |                      |                  |                                         |
| 請求締日                            | 請求締日             | SINGLE_LINE_TEXT | Closing date (from customer master)     |
| 請求締日変更                        | 請求締日変更         | SINGLE_SELECT    | Manual closing date override            |
| 請求日付                            | 請求日付             | DATE             | Invoice date                            |
| 売上年月                            | 売上年月             | SINGLE_LINE_TEXT | YYYYMM for AR aggregation               |
| 売掛更新キー                        | 売掛更新キー         | SINGLE_LINE_TEXT | [dev] Key to update 売掛管理            |
| 締日売掛更新キー                    | 締日売掛更新キー     | SINGLE_LINE_TEXT | [dev] Key for 売掛管理(締日別)          |
| 随時判定                            | 随時判定             | SINGLE_LINE_TEXT | [dev] 随時請求 flag                     |
| **--- DELIVERY ---**                |                      |                  |                                         |
| 納品予定日                          | 納品予定日           | DATE             | Planned delivery date                   |
| 納品書作成                          | 納品書作成           | MULTIPLE_CHECK   | Create delivery note flag               |
| 納品書番号                          | 納品書番号           | SINGLE_LINE_TEXT | Generated delivery note number          |
| 請求書作成                          | 請求書作成           | MULTIPLE_CHECK   | Create invoice flag                     |
| 請求書番号                          | 請求書番号           | SINGLE_LINE_TEXT | Generated invoice number                |
| 納品書送付先                        | 納品書送付先         | SINGLE_LINE_TEXT | Delivery note recipient                 |
| 請求書送付先                        | 請求書送付先         | SINGLE_LINE_TEXT | Invoice recipient                       |
| **--- ADDRESS ---**                 |                      |                  |                                         |
| 郵便番号*親会社*                    | 郵便番号(親会社)     | SINGLE_LINE_TEXT | Parent company postal code              |
| 納品先住所*親会社*                  | 納品先住所(親会社)   | SINGLE_LINE_TEXT | Parent company delivery address         |
| 郵便番号*得意先*                    | 郵便番号(得意先)     | SINGLE_LINE_TEXT | Customer postal code                    |
| 納品先住所*得意先*                  | 納品先住所(得意先)   | SINGLE_LINE_TEXT | Customer delivery address               |
| その他の送付先                      | その他の送付先を入力 | MULTIPLE_CHECK   | Manual address override flag            |
| 郵便番号*手動*                      | 郵便番号(手動)       | SINGLE_LINE_TEXT | Manual postal code                      |
| 納品先住所*手動*                    | 納品先住所(手動)     | SINGLE_LINE_TEXT | Manual delivery address                 |
| **--- DATE BREAKDOWN (for AR) ---** |                      |                  |                                         |
| 日/年月/翌月/年/月 etc.             | Various              | CALC             | Date decomposition for period matching  |
| 月度                                | 月度                 | SINGLE_LINE_TEXT | Fiscal month label                      |

### Subtable: 按分 (Sales Allocation)

| Field          | Label          | Type        | Notes                       |
| -------------- | -------------- | ----------- | --------------------------- |
| 担当者*按分*   | 担当者(按分)   | USER_SELECT | Sales person for allocation |
| 割合           | 割合           | DECIMAL     | Allocation percentage       |
| 売上金額*按分* | 売上金額(按分) | CALC        | Allocated sales amount      |

### Views

| View Name              | Type   | Filter                 |
| ---------------------- | ------ | ---------------------- |
| 自身が作成した売上一覧 | LIST   | LOGINUSER() — my sales |
| 売上一覧               | LIST   | All sales              |
| 5日締日一覧            | LIST   | 請求締日 = "5日"       |
| 10日締日一覧           | LIST   | 請求締日 = "10日"      |
| 15日締日一覧           | LIST   | 請求締日 = "15日"      |
| 20日締日一覧           | LIST   | 請求締日 = "20日"      |
| 25日締日一覧           | LIST   | 請求締日 = "25日"      |
| 末日締日一覧           | LIST   | 請求締日 = "末日"      |
| 随時請求一覧           | LIST   | 請求締日 = "随時請求"  |
| 得意先別売上           | CUSTOM | Customer pivot view    |
| 売上一覧(検索特化)     | CUSTOM | Smart search           |
| （すべて）             | LIST   | Default                |

### Key Logic

```
CLOSING DATE VIEWS:
  Identical pattern to 売掛管理 — one view per closing date
  Allows staff to process all "5日締" customers at once

AR UPDATE CHAIN (CRITICAL):
  When 売上入力 is saved:
  売掛更新キー = {売上先の得意先ID}_{売上年月}
  締日売掛更新キー = {売上先の得意先ID}_{締日}_{売上年月}

  Customine uses these keys to:
  → Update 売掛管理.売上額
  → Update 売掛管理(締日別).売上額

ORDER UPDATE:
  受注入力.売上済数量 incremented when sale recorded
  受注入力.現在売上済金額 updated

DOCUMENT GENERATION FLAGS:
  納品書作成 checked → Customine creates 納品書管理 record
  請求書作成 checked → Customine creates/updates 請求書管理 record

按分 SUBTABLE (Sales Allocation):
  For orders with multiple sales reps
  Sum of 割合 must = 100%
  按分売上金額 = 売上金額 × (割合 / 100)
  按分割合合計 CALC verifies total = 100

TAX CALCULATIONS (インボイス対応):
  10%/8% amounts calculated separately
  消費税 = FLOOR(売上金額 × 税率)
  These flow to 納品書管理 and 請求書管理

13 active plugins — second highest
```

---

---

## 07. 支払入力

**Category:** Finance — Outgoing Payments

**Purpose:** Records all outgoing payment transactions to suppliers. Each record represents one payment batch with a payment date and detailed line items per supplier.

### Overview

```
Payment Flow:
  仕入先 (Supplier) → 支払入力 → 買掛管理 (AP Update)
  One record = One payment batch on a given date
  Each subtable row = One supplier payment
```

### Main Fields

| Field Code   | Label        | Type   | Notes                           |
| ------------ | ------------ | ------ | ------------------------------- |
| ステータス   | ステータス   | STATUS | Process workflow status         |
| 支払日       | 支払日       | DATE   | Payment execution date          |
| 支払金額合計 | 支払金額合計 | CALC   | Auto-sum of all subtable 支払額 |

### Subtable: 支払内容詳細 (Payment Line Items)

| Field Code   | Label        | Type             | Notes                                   |
| ------------ | ------------ | ---------------- | --------------------------------------- |
| 金種名       | 金種名       | SINGLE_SELECT    | Payment method: 振込/小切手/現金        |
| 支払額       | 支払額       | DECIMAL          | Amount paid to this supplier            |
| 備考         | 備考         | SINGLE_LINE_TEXT | Notes                                   |
| 出金日       | 出金日       | DATE             | Actual bank withdrawal date             |
| 仕入先       | 仕入先       | SINGLE_LINE_TEXT | Supplier name                           |
| 仕入先ID     | 仕入先ID     | DECIMAL          | [dev] FK to supplier record             |
| 支払年月     | 支払年月     | SINGLE_LINE_TEXT | YYYYMM for aggregation                  |
| 買掛更新キー | 買掛更新キー | SINGLE_LINE_TEXT | [dev] Key to trigger AP balance update  |
| コピー用日付 | コピー用日付 | CALC             | Date used for copy/duplicate operations |

### Views

| View Name                  | Type   | Purpose              |
| -------------------------- | ------ | -------------------- |
| 支払入力一覧               | LIST   | All payment records  |
| 支払入力一覧(テーブル表示) | LIST   | Table layout version |
| 支払一覧(検索特化)         | CUSTOM | Smart search widget  |
| （すべて）                 | LIST   | Default system view  |

### Key Logic & Integration

```
1. 支払金額合計 = SUM(支払内容詳細.支払額)

2. 買掛更新キー format: {仕入先ID}_{支払年月}
   When payment saved → Customine matches this key to
   買掛管理 record → updates 当月支払額

3. 支払日 = Decision/approval date
   出金日 = Actual bank transfer date (may differ)

4. Active plugins: 8 (Customine + search + print plugins)
```

### What to Watch When Modifying

- 買掛更新キー format is CRITICAL — changing breaks AP automation
- 支払年月 format must match 年月 in 買掛管理 exactly
- 支払金額合計 is CALC — do not try to manually set it
- Check Customine rules before adding new subtable fields

---

---

## 08. 【新】日報入力

**Category:** Production — Daily Work Reports (New Version)
**Purpose:** Daily manufacturing work report per employee. Tracks each production job, materials used, hours worked, machine used, and calculates production costs and yields.

### Overview

```
Daily Report Flow:
  Worker selects: 作業日 (date) + 作業者 (self)
  → Adds job rows in subtable (one row per production job)
  → Per row: 注番, machine, hours, quantity, materials used
  → CALC fields auto-compute: work hours, material costs, production costs
  → Data feeds: 製袋予定管理 (status update), 在庫 (material deduction)
```

### Main Fields

| Field Code               | Label                    | Type             | Notes                            |
| ------------------------ | ------------------------ | ---------------- | -------------------------------- |
| ステータス               | ステータス               | STATUS           | Workflow status                  |
| 作業日                   | 作業日                   | DATE             | Work date                        |
| 作業者\_0                | 作業者                   | SINGLE_LINE_TEXT | Worker name                      |
| 作業員コード             | 作業員コード             | SINGLE_LINE_TEXT | [dev] Employee code              |
| 従業員ID                 | 従業員ID                 | DECIMAL          | [dev] FK to 従業員マスタ         |
| 担当者コード             | 担当者コード             | SINGLE_LINE_TEXT | [dev] Staff code                 |
| 部課コード               | 部課コード               | SINGLE_LINE_TEXT | [dev] Department code            |
| 作業単価                 | 作業単価                 | DECIMAL          | [dev] Worker hourly rate         |
| ダンボール原価合計       | ダンボール原価合計       | CALC             | SUM of all cardboard costs       |
| ダンボール原価*仕切*合計 | ダンボール原価(仕切)合計 | CALC             | SUM of partition cardboard costs |
| 作業時間合計             | 作業時間合計             | CALC             | Total work hours all jobs today  |
| 製造原価合計             | 製造原価合計             | CALC             | Total manufacturing cost for day |
| \_作業者                 | \*作業者                 | SINGLE_LINE_TEXT | [dev] Internal worker name copy  |

### Subtable: 日報詳細 (Job Detail Lines)

| Field Code           | Label                | Type               | Notes                                     |
| -------------------- | -------------------- | ------------------ | ----------------------------------------- |
| 注番\_0              | 注番                 | SINGLE_LINE_TEXT   | Order number (from 受注)                  |
| 品名\_0              | 品名                 | SINGLE_LINE_TEXT   | Product name                              |
| 受注数\_0            | 受注数               | DECIMAL            | Total ordered quantity                    |
| 製造済数\_0          | 製造済数             | DECIMAL            | Already manufactured qty                  |
| 製造残数\_0          | 製造残数             | DECIMAL            | Remaining qty to produce                  |
| 機械名               | 機械名               | SINGLE_LINE_TEXT   | Machine used                              |
| 機械コード           | 機械コード           | SINGLE_LINE_TEXT   | Machine code (from 機械マスタ)            |
| ダンボール名称       | ダンボール名称       | SINGLE_LINE_TEXT   | Cardboard material name                   |
| 在庫数\_0            | 在庫数               | DECIMAL            | Current stock of this material            |
| 使用数\_0            | 使用数               | DECIMAL            | Quantity of material used                 |
| ダンボール名称*仕切* | ダンボール名称(仕切) | SINGLE_LINE_TEXT   | Partition cardboard name                  |
| 在庫数*仕切*         | 在庫数(仕切)         | DECIMAL            | Partition cardboard stock                 |
| 使用数*仕切*         | 使用数(仕切)         | DECIMAL            | Partition cardboard used                  |
| 糊\_0                | 糊                   | SINGLE_SELECT      | Glue type used                            |
| 糊代                 | 糊代                 | DECIMAL            | Glue cost                                 |
| 開始時間\_0          | 開始時間(24H)        | TIME               | Job start time                            |
| 終了時間\_0          | 終了時間(24H)        | TIME               | Job end time                              |
| 休憩時間             | 休憩時間             | TIME               | Break time                                |
| 型変作業時間\_0      | 型変作業時間         | DECIMAL            | Die-change setup time (minutes)           |
| 回数\_0              | 回数                 | DECIMAL            | Number of production runs                 |
| 出来上\_0            | 出来上               | DECIMAL            | Actual completed quantity                 |
| 作業人数\_0          | 作業人数             | DECIMAL            | Number of workers on this job             |
| 人数割\_0            | 人数割               | CALC               | Per-person allocation                     |
| 品質チェック\_0      | 品質チェック         | MULTIPLE_CHECK     | Quality check items passed                |
| 手袋\_0              | 手袋                 | MULTIPLE_CHECK     | Glove check (safety)                      |
| ケガ\_前\_\_0        | ケガ(前)             | DECIMAL            | Injuries before shift                     |
| ケガ\_後\_\_0        | ケガ(後)             | DECIMAL            | Injuries after shift                      |
| 現在のステータス\_0  | 現在のステータス     | SINGLE_LINE_TEXT   | Current order status (read from 製袋予定) |
| ステータスの更新     | ステータスの更新     | MULTIPLE_CHECK     | Whether to update order status            |
| ステータス更新値     | ステータス更新値     | SINGLE_SELECT      | New status to write to order              |
| 難易度\_0            | 難易度               | SINGLE_SELECT      | Job difficulty level                      |
| 備考\_0              | 備考                 | MULTIPLE_LINE_TEXT | Notes                                     |
| 加工単価*枚*         | 加工単価(枚)         | DECIMAL            | Processing rate per sheet                 |
| 型替単価*回*         | 型替単価(回)         | DECIMAL            | Die change rate per occurrence            |
| 内職単価*H*          | 内職単価(H)          | DECIMAL            | Piecework rate per hour                   |
| 機械単価*H*          | 機械単価(H)          | DECIMAL            | Machine rate per hour                     |
| 印刷単価             | 印刷単価             | DECIMAL            | Printing rate                             |
| 版替単価             | 版替単価             | DECIMAL            | Plate change rate                         |
| 練インキ単価         | 練インキ単価         | DECIMAL            | Ink mixing rate                           |
| 作業時間\_0          | 作業時間             | CALC               | 終了時間 - 開始時間 - 休憩時間            |
| 機械使用料           | 機械使用料           | CALC               | 機械単価(H) x 作業時間                    |
| 枚数単価             | 枚数単価             | CALC               | 加工単価(枚) x 出来上                     |
| 型替え単価           | 型替え単価           | CALC               | 型替単価(回) x 回数                       |
| 社内原価             | 社内原価             | CALC               | Total internal cost                       |
| 製造売上             | 製造売上             | CALC               | Manufacturing revenue this line           |
| 時給計算             | 時給計算             | CALC               | Hourly wage calculation                   |
| ダンボール原価       | ダンボール原価       | DECIMAL            | Cardboard material cost                   |
| ダンボール原価*仕切* | ダンボール原価(仕切) | DECIMAL            | Partition cardboard cost                  |
| 枚数単価\_型替え単価 | 枚数単価+型替え単価  | CALC               | Sum of two unit costs                     |
| 作業者名             | 作業者名             | SINGLE_LINE_TEXT   | Worker name copied from header            |

### Views

| View Name          | Type   | Purpose           |
| ------------------ | ------ | ----------------- |
| 日報一覧           | LIST   | All daily reports |
| 日報一覧(検索特化) | CUSTOM | Smart search view |
| （すべて）         | LIST   | Default           |

### Key Business Logic

```
COST CALCULATION CHAIN:
  作業時間 = 終了時間 - 開始時間 - 休憩時間
  機械使用料 = 機械単価(H) x 作業時間
  枚数単価 = 加工単価(枚) x 出来上
  型替え単価 = 型替単価(回) x 回数
  社内原価 = material cost + labor + machine cost
  製造売上 = 枚数単価 + 型替え単価 + 機械使用料 + ...

ORDER STATUS UPDATE:
  If ステータスの更新 is checked AND ステータス更新値 is set:
  → Customine writes new status to linked order in 製袋予定管理

MATERIAL DEDUCTION:
  在庫数 is auto-filled from 在庫管理 by ダンボール名称
  使用数 = manually entered by worker
  On report approval: 在庫 decremented by 使用数

10 active plugins — highest dependency on Customine in all apps
```

### What to Watch When Modifying

- Subtable has 48 fields — largest in system. CALC formula changes cascade
- 機械コード must match 機械マスタ exactly for lookups to work
- 注番 links to multiple apps — changes must be coordinated system-wide
- Before adding subtable fields, check if Customine reads them

---

---

## 09. 見積書管理

**Category:** Sales — Quotation Management
**Purpose:** Manages customer quotations (estimates). Each record = one quotation with line items, auto-calculates total, stores PDF, and links to the customer who requested it.

### Main Fields

| Field Code          | Label               | Type               | Notes                          |
| ------------------- | ------------------- | ------------------ | ------------------------------ |
| ステータス          | ステータス          | STATUS             | Quote status                   |
| 見積日付            | 見積日付            | DATE               | Quotation date                 |
| 見積書番号          | 見積書番号          | SINGLE_LINE_TEXT   | Quote number                   |
| 得意先名            | 得意先名            | SINGLE_LINE_TEXT   | Customer name (LOOKUP)         |
| 得意先名\_0         | 得意先名            | SINGLE_LINE_TEXT   | Customer name alternate field  |
| 得意先名*略名取得*  | 得意先名(略名取得)  | SINGLE_LINE_TEXT   | Customer short name            |
| 得意先ID            | 得意先ID            | DECIMAL            | [dev] FK to 取引先マスタ       |
| 担当者              | 担当者              | USER_SELECT        | Sales person                   |
| 品名                | 品名                | SINGLE_LINE_TEXT   | Product name                   |
| サイズ              | サイズ              | SINGLE_LINE_TEXT   | Product size spec              |
| 紙                  | 紙                  | SINGLE_LINE_TEXT   | Paper material                 |
| 印刷                | 印刷                | SINGLE_LINE_TEXT   | Print specification            |
| 窓                  | 窓                  | SINGLE_LINE_TEXT   | Window specification           |
| 口糊                | 口糊                | SINGLE_LINE_TEXT   | Adhesive specification         |
| 見積金額*税抜*      | 見積金額(税抜)      | CALC               | Total excl. tax (SUM subtable) |
| 備考                | 備考                | MULTIPLE_LINE_TEXT | Notes                          |
| 見積書PDF           | 見積書PDF           | FILE               | Generated quotation PDF        |
| ファイル保存名      | ファイル保存名      | SINGLE_LINE_TEXT   | PDF filename                   |
| その他フリー入力*1* | その他フリー入力(1) | SINGLE_LINE_TEXT   | Free specification field 1     |
| その他フリー入力*2* | その他フリー入力(2) | SINGLE_LINE_TEXT   | Free specification field 2     |
| その他フリー入力*3* | その他フリー入力(3) | SINGLE_LINE_TEXT   | Free specification field 3     |

### Subtable: 見積内容 (Quote Line Items)

| Field | Label | Type    | Notes       |
| ----- | ----- | ------- | ----------- |
| 枚数  | 枚数  | DECIMAL | Quantity    |
| 単価  | 単価  | DECIMAL | Unit price  |
| 金額  | 金額  | CALC    | 枚数 × 単価 |

### Views

| View Name          | Type   |
| ------------------ | ------ |
| 見積一覧           | LIST   |
| 見積一覧(検索特化) | CUSTOM |
| （すべて）         | LIST   |

### Key Logic

```
QUOTE TOTAL:
  見積金額(税抜) = SUM(見積内容.金額)
  Tax is NOT calculated here — added at invoice stage

PDF GENERATION:
  見積書PDF (FILE field) stores the generated quote PDF
  ファイル保存名 = filename for the PDF
  Generated by a print/PDF plugin when quote is finalized

SPEC FIELDS (plain text):
  サイズ, 紙, 印刷, 窓, 口糊 are all free-text fields
  No strict validation — whatever the sales person types
  その他フリー入力(1/2/3) for additional specifications

LOOKUP FROM 取引先マスタ:
  得意先ID → auto-fills 得意先名 and 得意先名(略名取得)
  略名 is used in PDF document header

5 active plugins — includes PDF generation plugin
```

---

---

## 10. 納品書管理（売上）

**Category:** Sales — Delivery Note Management
**Purpose:** Manages delivery notes (納品書) sent to customers. Each record = one delivery note covering one or more sale items for one customer. Generates legally-formatted PDF delivery notes.

### Main Fields

| Field Code              | Label                 | Type               | Notes                          |
| ----------------------- | --------------------- | ------------------ | ------------------------------ |
| ステータス              | ステータス            | STATUS             | Document status                |
| 送付                    | 送付                  | SINGLE_CHECK       | Sent to customer flag          |
| 売上日付                | 売上日付              | DATE               | Sales/delivery date            |
| 納品日                  | 納品日                | DATE               | Actual delivery date           |
| 納品書番号              | 納品書番号            | SINGLE_LINE_TEXT   | Delivery note number           |
| 得意先名                | 得意先名              | SINGLE_LINE_TEXT   | Customer name                  |
| 得意先ID                | 得意先ID              | DECIMAL            | [dev] FK to 取引先マスタ       |
| 得意先コード            | 得意先コード          | SINGLE_LINE_TEXT   | Customer code                  |
| 担当者                  | 担当者                | USER_SELECT        | Sales person                   |
| 登録番号                | 登録番号              | SINGLE_LINE_TEXT   | Our T-number (インボイス)      |
| 請求締日                | 請求締日              | SINGLE_LINE_TEXT   | Closing date                   |
| 税率                    | 税率                  | SINGLE_SELECT      | 10% or 8%                      |
| 納品金額合計*税抜*      | 納品金額合計(税抜)    | CALC               | Total excl. tax                |
| 消費税合計              | 消費税合計            | CALC               | Total tax                      |
| *10*対象小計            | 10%対象小計           | CALC               | 10% taxable amount             |
| *8*対象小計             | 8%対象小計            | CALC               | 8% taxable amount              |
| *10*対象消費税          | 10%対象消費税         | CALC               | Tax on 10% items               |
| *8*対象消費税           | 8%対象消費税          | CALC               | Tax on 8% items                |
| 非課税対象小計          | 非課税対象小計        | CALC               | Tax-exempt amount              |
| 対象外小計              | 対象外小計            | CALC               | Outside-scope amount           |
| 端数区分                | 端数区分              | SINGLE_LINE_TEXT   | Rounding method                |
| 備考                    | 備考                  | MULTIPLE_LINE_TEXT | Notes                          |
| 納品書PDF               | 納品書PDF             | FILE               | Generated PDF                  |
| **--- ADDRESS ---**     |                       |                    |                                |
| 郵便番号*親会社*        | 郵便番号(親会社)      | SINGLE_LINE_TEXT   | Parent company postal code     |
| 納品先*親会社*          | 納品先(親会社)        | SINGLE_LINE_TEXT   | Parent company address         |
| 郵便番号*得意先*        | 郵便番号(得意先)      | SINGLE_LINE_TEXT   | Customer postal code           |
| 納品先*得意先*          | 納品先(得意先)        | SINGLE_LINE_TEXT   | Customer address               |
| 郵便番号*任意指定*      | 郵便番号(任意指定)    | SINGLE_LINE_TEXT   | Manual address override        |
| 納品先*任意指定*        | 納品先(任意指定)      | SINGLE_LINE_TEXT   | Manual delivery address        |
| 郵便番号                | 郵便番号              | SINGLE_LINE_TEXT   | Final postal code used         |
| 納品先                  | 納品先                | SINGLE_LINE_TEXT   | Final address used             |
| **--- INTEGRATION ---** |                       |                    |                                |
| Crenaレコード更新キー   | Crenaレコード更新キー | SINGLE_LINE_TEXT   | [dev] Key for 売上入力 sync    |
| TIS関連レコードキー     | TIS関連レコードキー   | SINGLE_LINE_TEXT   | [dev] Cross-system link key    |
| 納品書作成              | 納品書作成            | MULTIPLE_CHECK     | Creation trigger flag          |
| 請求書発行区分          | 請求書発行区分        | SINGLE_LINE_TEXT   | Invoice flag from master       |
| 納品書発行区分          | 納品書発行区分        | SINGLE_LINE_TEXT   | Delivery note flag from master |

### Subtable: 納品内容詳細 (Delivery Line Items)

| Field      | Label      | Type             | Notes                       |
| ---------- | ---------- | ---------------- | --------------------------- |
| 売上No     | 売上No     | SINGLE_LINE_TEXT | Linked sales record number  |
| 注番       | 注番       | SINGLE_LINE_TEXT | Order number                |
| 品名       | 品名       | SINGLE_LINE_TEXT | Product name                |
| 数量       | 数量       | DECIMAL          | Quantity delivered          |
| 単位       | 単位       | SINGLE_LINE_TEXT | Unit                        |
| 単価       | 単価       | DECIMAL          | Unit price                  |
| 小計       | 小計       | DECIMAL          | Line subtotal               |
| 税率\_0    | 税率       | SINGLE_SELECT    | Tax rate for this line      |
| 区分       | 区分       | SINGLE_SELECT    | Line type                   |
| 納品日\_0  | 納品日     | DATE             | Delivery date for this line |
| 摘要       | 摘要       | SINGLE_LINE_TEXT | Description/note            |
| 月日       | 月日       | SINGLE_LINE_TEXT | MM/DD display               |
| *10*対象   | 10%対象    | CALC             | 10% tax line amount         |
| *8*対象    | 8%対象     | CALC             | 8% tax line amount          |
| 非課税対象 | 非課税対象 | CALC             | Tax-exempt line amount      |
| 対象外対象 | 対象外対象 | CALC             | Outside-scope line amount   |

### Views (Closing Date Views)

| View Name                        | Type   | Filter                        |
| -------------------------------- | ------ | ----------------------------- |
| 納品書管理一覧                   | LIST   | All records                   |
| 5日締日一覧 through 末日締日一覧 | LIST   | Per closing date              |
| 随時請求一覧                     | LIST   | 随時請求                      |
| 納品書一覧(検索特化)             | CUSTOM | Smart search                  |
| Sample（納品日期間）             | LIST   | Hardcoded date range — REMOVE |
| （すべて）                       | LIST   | Default                       |

### Key Logic

```
CREATION FLOW:
  売上入力.納品書作成 is checked
  → Customine creates 納品書管理 record
  → Copies product, quantity, price from 売上入力
  → Fills in address from 取引先マスタ

ADDRESS PRIORITY:
  Final 納品先 is determined by:
  1. 任意指定 (manual) if entered
  2. Else: 送付先 setting from master
     → 親会社 address if 納品書送付先 = checked
     → 得意先 address if unchecked

TAX BREAKDOWN PER LINE:
  Each subtable row classifies as 10% / 8% / 非課税 / 対象外
  Totals aggregated at header level for legal compliance
  Required format for インボイス制度 compliant delivery note

KNOWN ISSUE:
  "Sample（納品日：2025-05-01～2025-05-20）" view
  Has hardcoded date range → will show no results after May 2025
  → Remove this view or convert to dynamic date filter

10 active plugins — PDF generation is critical plugin here
```

---

---

## 11. 請求書管理（売上）

**Category:** Sales — Invoice Management
**Purpose:** Manages sales invoices (請求書). The most legally sensitive app — invoices must comply with インボイス制度. Each record = one invoice per customer per billing period, including carry-forward balance, current charges, and total due.

### Main Fields (67 total)

| Field Code                   | Label               | Type             | Notes                                |
| ---------------------------- | ------------------- | ---------------- | ------------------------------------ |
| ステータス                   | ステータス          | STATUS           | Invoice status                       |
| 送付                         | 送付                | SINGLE_CHECK     | Sent to customer flag                |
| 請求日付                     | 請求日付            | DATE             | Invoice date                         |
| 請求書番号                   | 請求書番号          | SINGLE_LINE_TEXT | Invoice number (sequential)          |
| 得意先名                     | 得意先名            | SINGLE_LINE_TEXT | Customer name                        |
| 得意先ID                     | 得意先ID            | DECIMAL          | [dev] FK to 取引先マスタ             |
| 得意先コード                 | 得意先コード        | SINGLE_LINE_TEXT | Customer code                        |
| 担当者                       | 担当者              | USER_SELECT      | Sales person                         |
| 登録番号                     | 登録番号            | SINGLE_LINE_TEXT | Our T-number (適格請求書)            |
| 税率                         | 税率                | SINGLE_SELECT    | Default tax rate                     |
| **--- BALANCE FIELDS ---**   |                     |                  |                                      |
| 前月御請求額                 | 前月御請求額        | DECIMAL          | Previous month's invoice total       |
| ご入金額                     | ご入金額            | DECIMAL          | Payment received since last invoice  |
| 繰越金額                     | 繰越金額            | DECIMAL          | Carry-forward balance                |
| 今回御買上額*税抜*           | 今回御買上額(税抜)  | CALC             | This period purchases excl. tax      |
| 今回消費税額                 | 今回消費税額        | CALC             | This period tax                      |
| 合計御買上金額               | 合計御買上金額      | CALC             | Total purchases incl. tax            |
| 御請求額                     | 御請求額            | CALC             | Total amount due                     |
| **--- TAX BREAKDOWN ---**    |                     |                  |                                      |
| *10*対象小計                 | 10%対象小計         | CALC             | 10% taxable subtotal                 |
| *8*対象小計                  | 8%対象小計          | CALC             | 8% taxable subtotal                  |
| 非課税対象小計               | 非課税対象小計      | CALC             | Tax-exempt subtotal                  |
| *10*対象消費税               | 10%対象消費税       | CALC             | Tax on 10% items                     |
| *8*対象消費税                | 8%対象消費税        | CALC             | Tax on 8% items                      |
| 消費税合計                   | 消費税合計          | CALC             | Total tax                            |
| 対象外対象小計               | 対象外対象小計      | CALC             | Outside-scope amount                 |
| 端数区分                     | 端数区分            | SINGLE_LINE_TEXT | Rounding method                      |
| **--- BILLING PERIOD ---**   |                     |                  |                                      |
| 締日*マスタ*                 | 締日(マスタ)        | SINGLE_LINE_TEXT | Customer's closing date              |
| 今回締日                     | 今回締日            | SINGLE_LINE_TEXT | This invoice's closing date          |
| 基準日付                     | 基準日付            | DATE             | Reference date for period            |
| 基準日付*末日*               | 基準日付(末日)      | DATE             | Reference for last-day closing       |
| 基準日付*随時*               | 基準日付(随時)      | DATE             | Reference for on-demand billing      |
| 締日売掛連携キー             | 締日売掛連携キー    | SINGLE_LINE_TEXT | [dev] Key to update 売掛管理(締日別) |
| **--- PAYMENT TRACKING ---** |                     |                  |                                      |
| 前回請求未回収金額           | 前回請求未回収金額  | CALC             | Previous invoice outstanding         |
| 今回請求入金済               | 今回請求入金済      | DECIMAL          | Payment received for this invoice    |
| 今回請求未回収金額           | 今回請求未回収金額  | CALC             | Outstanding on this invoice          |
| 入金判定                     | 入金判定            | SINGLE_LINE_TEXT | Payment status flag                  |
| 請求区分                     | 請求区分            | SINGLE_CHECK     | Invoice type flag                    |
| **--- ADDRESS ---**          |                     |                  |                                      |
| 郵便番号*親会社*             | 郵便番号(親会社)    | SINGLE_LINE_TEXT | Parent company postal code           |
| 納品先*親会社*               | 納品先(親会社)      | SINGLE_LINE_TEXT | Parent company address               |
| 郵便番号*得意先*             | 郵便番号(得意先)    | SINGLE_LINE_TEXT | Customer postal code                 |
| 納品先*得意先*               | 納品先(得意先)      | SINGLE_LINE_TEXT | Customer address                     |
| 郵便番号*任意指定*           | 郵便番号(任意指定)  | SINGLE_LINE_TEXT | Manual address override              |
| 納品先*任意指定*             | 納品先(任意指定)    | SINGLE_LINE_TEXT | Manual billing address               |
| 郵便番号                     | 郵便番号            | SINGLE_LINE_TEXT | Final postal code                    |
| 請求先                       | 請求先              | SINGLE_LINE_TEXT | Final billing address                |
| **--- INTEGRATION ---**      |                     |                  |                                      |
| TIS関連レコードキー          | TIS関連レコードキー | SINGLE_LINE_TEXT | [dev] Cross-system key               |
| 回収予定区分                 | 回収予定区分        | SINGLE_LINE_TEXT | Collection type                      |
| 回収予定日                   | 回収予定日          | SINGLE_LINE_TEXT | Expected payment date                |
| 請求月度                     | 請求月度            | SINGLE_LINE_TEXT | Billing fiscal month                 |
| 請求書発行区分               | 請求書発行区分      | SINGLE_LINE_TEXT | Invoice delivery method              |
| 直近請求レコード             | 直近請求レコード    | REFERENCE_TABLE  | Previous invoice display             |
| **--- DATE BREAKDOWN ---**   |                     |                  |                                      |
| 日/年月/翌月/年/月 etc.      | Date fields         | CALC             | Period decomposition for AR sync     |

### Subtable: 請求内容詳細 (Invoice Line Items)

| Field      | Label      | Type             | Notes                 |
| ---------- | ---------- | ---------------- | --------------------- |
| 品名       | 品名       | SINGLE_LINE_TEXT | Product name          |
| 数量       | 数量       | DECIMAL          | Quantity              |
| 単位       | 単位       | SINGLE_LINE_TEXT | Unit                  |
| 単価       | 単価       | DECIMAL          | Unit price            |
| 小計       | 小計       | DECIMAL          | Line subtotal         |
| 税率\_0    | 税率       | SINGLE_SELECT    | Tax rate per line     |
| 日付       | 日付       | DATE             | Line item date        |
| 売上No     | 売上No     | SINGLE_LINE_TEXT | Source sales record   |
| 注番       | 注番       | SINGLE_LINE_TEXT | Source order number   |
| 伝票No     | 伝票No     | SINGLE_LINE_TEXT | Voucher number        |
| 月日       | 月日       | SINGLE_LINE_TEXT | MM/DD display         |
| 区分       | 区分       | SINGLE_LINE_TEXT | Line type             |
| *10*対象   | 10%対象    | CALC             | 10% classified amount |
| *8*対象    | 8%対象     | CALC             | 8% classified amount  |
| 非課税対象 | 非課税対象 | CALC             | Exempt amount         |
| 対象外対象 | 対象外対象 | CALC             | Outside-scope amount  |

### Views (Per Closing Date — with unpaid filter)

| View Name            | Type   | Filter                          |
| -------------------- | ------ | ------------------------------- |
| 請求管理一覧         | LIST   | All records                     |
| 5日締日一覧          | LIST   | 締日 = "5日" AND 送付 not sent  |
| 10日締日一覧         | LIST   | 締日 = "10日" AND 送付 not sent |
| 15日締日一覧         | LIST   | 締日 = "15日" AND 送付 not sent |
| 20日締日一覧         | LIST   | 締日 = "20日" AND 送付 not sent |
| 25日締日一覧         | LIST   | 締日 = "25日" AND 送付 not sent |
| 末日締日一覧         | LIST   | 締日 = "末日" AND 送付 not sent |
| 請求書一覧(検索特化) | CUSTOM | Smart search                    |
| （すべて）           | LIST   | Default                         |

### Key Logic

```
INVOICE AMOUNT FORMULA:
  御請求額 = 繰越金額 + 今回御買上額(税抜) + 今回消費税額
  繰越金額 = 前月御請求額 - ご入金額

  In practice:
  御請求額 = (前月残 - 入金) + 今月売上 + 今月税

インボイス制度 REQUIRED FIELDS ON PDF:
  ✓ 登録番号 (T + 13 digits) — our company's number
  ✓ Tax breakdown: 10% amount, 8% amount separately
  ✓ Tax amounts per rate
  ✓ 請求日付, 得意先名, 請求書番号

CLOSING DATE VIEWS:
  Note: filters include "AND 送付 = not checked"
  → Only shows UNSENT invoices per closing date
  → Once sent, they disappear from these views (moved to 請求管理一覧)
  → This prevents accidental re-sending

締日売掛連携キー:
  Used by Customine to update 売掛管理(締日別).請求情報更新済み
  Signals that invoice has been generated for this AR period

CARRY-FORWARD BALANCE:
  前月御請求額 and ご入金額 are manually or automatically filled
  from 売入金管理 data
  繰越金額 = remaining unpaid from previous period

10 active plugins — PDF generation is critical
```

---

---

## 12. 製袋予定管理

**Category:** Production — Bag Manufacturing Schedule
**Purpose:** Production scheduling and Gantt chart for bag manufacturing machines. Each record = one scheduled production job on one machine within a time slot.

### Overview

```
Scheduling Flow:
  受注 (Order received)
  → Production planner creates 製袋予定 record
  → Assigns machine, time slot, order number
  → Gantt chart shows all machines and schedules
  → Worker references schedule in 日報入力
  → Status updates from 日報 flow back here
```

### Main Fields

| Field Code       | Label            | Type             | Notes                              |
| ---------------- | ---------------- | ---------------- | ---------------------------------- |
| ステータス       | ステータス       | STATUS           | Job status                         |
| 開始日時         | 開始日時         | DATETIME         | Schedule start (date + time)       |
| 終了日時         | 終了日時         | DATETIME         | Schedule end (date + time)         |
| 使用状況         | 使用状況         | SINGLE_SELECT    | 使用中/空き/メンテ etc.            |
| 機械名           | 機械名           | SINGLE_LINE_TEXT | Machine name                       |
| 機械コード       | 機械コード       | SINGLE_LINE_TEXT | Machine code                       |
| 機械レコード番号 | 機械レコード番号 | DECIMAL          | [dev] FK to 機械マスタ             |
| 注番             | 注番             | SINGLE_LINE_TEXT | Order number                       |
| 品名             | 品名             | SINGLE_LINE_TEXT | Product name                       |
| 部数             | 部数             | DECIMAL          | Quantity to produce                |
| 受注先           | 受注先           | SINGLE_LINE_TEXT | Customer name                      |
| 持込日           | 持込日           | DATE             | Material bring-in date             |
| 納品日           | 納品日           | DATE             | Required delivery date             |
| 持込便           | 持込便           | SINGLE_LINE_TEXT | Transport route for materials      |
| 抜き             | 抜き             | SINGLE_LINE_TEXT | Die-cut specification              |
| 窓               | 窓               | SINGLE_LINE_TEXT | Window spec (for window bags)      |
| 口糊             | 口糊             | SINGLE_LINE_TEXT | Mouth glue specification           |
| 入力方法         | 入力方法         | SINGLE_CHECK     | Input mode: linked vs free text    |
| 注番*フリー*     | 注番(フリー)     | SINGLE_LINE_TEXT | Free-text order number (no lookup) |
| 品名*フリー*     | 品名(フリー)     | SINGLE_LINE_TEXT | Free-text product name             |
| 注番*表示用*     | 注番(表示用)     | SINGLE_LINE_TEXT | Display version for Gantt          |
| 品名*表示用*     | 品名(表示用)     | SINGLE_LINE_TEXT | Display version for Gantt          |
| 部数*表示用*     | 部数(表示用)     | SINGLE_LINE_TEXT | Display version for Gantt          |
| 注番*P*          | 注番(P)          | SINGLE_LINE_TEXT | Order number for print output      |
| 品名*P*          | 品名(P)          | SINGLE_LINE_TEXT | Product name for print output      |
| 数量             | 数量             | DECIMAL          | Quantity (secondary field)         |
| 備考             | 備考             | SINGLE_LINE_TEXT | Notes                              |

### Views (Gantt Chart System)

| View Name          | Type   | Description                       |
| ------------------ | ------ | --------------------------------- |
| 日次ガントチャート | CUSTOM | Day-level Gantt (plugin-rendered) |
| 週次ガントチャート | CUSTOM | Week-level Gantt                  |
| 月次ガントチャート | CUSTOM | Month-level Gantt                 |
| 年次ガントチャート | CUSTOM | Year-level Gantt                  |
| 帳票出力用(テスト) | LIST   | Print output test view            |
| （すべて）         | LIST   | All records                       |

### Key Logic

```
GANTT CHART:
  4 CUSTOM views rendered by Gantt chart plugin (klgmladdiiifjdghgmjjogimfnacdiaj)
  Each record = one bar on the chart
  Bar position = 開始日時 to 終了日時
  Bar grouping = by 機械名

INPUT MODES (入力方法 checkbox):
  Unchecked = Link mode: auto-fill from 受注 via 注番 lookup
  Checked = Free mode: manual entry, no lookup restriction

DISPLAY vs ACTUAL FIELDS:
  注番 (actual) ← used for logic
  注番(表示用) ← used by Gantt plugin for display label
  Both must be kept in sync when updating
  注番(P) ← used when printing schedule sheet

STATUS FEEDBACK FROM 日報:
  When worker checks ステータスの更新 in 日報入力:
  → Customine writes back new status to this record
```

### What to Watch When Modifying

- DATETIME fields are essential for Gantt — never change types
- 表示用 fields must be synced with actual fields (Customine or JS)
- 8 active plugins — Gantt plugin is the most critical
- Print view filters out certain status values via field condition

---

---

## 13. 在庫管理

**Category:** Operations — Inventory Management
**Purpose:** Tracks current stock levels of materials and products used in bag manufacturing. Each record = one material or product item. Stock levels are updated by 日報入力 (consumption) and 納品(仕入)入力 (receiving).

### Main Fields

| Field Code         | Label              | Type               | Notes                                      |
| ------------------ | ------------------ | ------------------ | ------------------------------------------ |
| ステータス         | ステータス         | STATUS             | Record status                              |
| 区分               | 区分               | SINGLE_SELECT      | Material type: ダンボール/消耗品/製品 etc. |
| 名称*管理No*       | 名称(管理No)       | SINGLE_LINE_TEXT   | Item name with management number           |
| 商品名             | 商品名             | SINGLE_LINE_TEXT   | Product/material name                      |
| 商品名レコード番号 | 商品名レコード番号 | DECIMAL            | FK to product master                       |
| 在庫数             | 在庫数             | DECIMAL            | Current stock quantity                     |
| 原価               | 原価               | DECIMAL            | Unit cost price                            |
| 用途               | 用途               | SINGLE_LINE_TEXT   | Usage description                          |
| 名称\_日報連携キー | 名称\_日報連携キー | SINGLE_LINE_TEXT   | [dev] Key for 日報 stock lookup            |
| 備考               | 備考               | MULTIPLE_LINE_TEXT | Notes                                      |

### Views

| View Name          | Type   |
| ------------------ | ------ |
| 在庫管理一覧       | LIST   |
| 在庫一覧(検索特化) | CUSTOM |
| （すべて）         | LIST   |

### Key Logic

```
STOCK LEVEL UPDATE MECHANISM:
  在庫数 is updated by Customine/JS:

  DECREASE (consumption):
    日報入力 subtable: 使用数 entered for a material
    → 名称_日報連携キー matches 在庫管理.名称_日報連携キー
    → Customine decrements 在庫数 by 使用数

  INCREASE (receiving):
    納品(仕入)入力 recorded for raw materials
    → Customine increments 在庫数

名称_日報連携キー:
  This is the critical link between 在庫管理 and 日報入力
  Format: {名称(管理No)} or exact name string
  Must match EXACTLY what workers type in 日報入力 ダンボール名称
  → Typos or formatting differences break the stock update

区分 (SINGLE_SELECT categories):
  Determines material type, likely includes:
  ダンボール (cardboard), 仕切り (partition), 消耗品 (consumables)
  原材料 (raw materials), 製品 (finished goods)

原価:
  Used in 日報入力 cost calculation:
  ダンボール原価 = 在庫管理.原価 × 使用数

STOCK ACCURACY WARNING:
  在庫数 is updated by automation — manual edits can cause
  discrepancies. Only adjust via proper receiving/consumption records.
  For physical inventory count adjustments: document clearly with 備考

6 active plugins — includes Customine for stock updates
```

---

---

## 14. 事故報告管理

**Category:** Compliance — Accident Report Management
**Purpose:** Records workplace accidents including damaged products, injuries, causes, corrective actions, and financial damage calculations.

### Overview

```
Accident Reporting Flow:
  Incident occurs on production floor
  → Reporter fills 事故報告管理
  → Links to: 機械マスタ (which machine), 従業員 (who), 得意先 (which customer)
  → 損害 subtable: itemized damage cost calculation
  → 合計損害額 auto-calculated from subtable
  → Supervisor reviews, approves corrective actions
```

### Main Fields

| Field Code             | Label                  | Type               | Notes                        |
| ---------------------- | ---------------------- | ------------------ | ---------------------------- |
| ステータス             | ステータス             | STATUS             | Report status                |
| 事故発生日             | 事故発生日             | DATE               | Date of accident             |
| 報告者氏名             | 報告者氏名             | SINGLE_LINE_TEXT   | Person filing report         |
| 注番                   | 注番                   | SINGLE_LINE_TEXT   | Order number involved        |
| 得意先名               | 得意先名               | SINGLE_LINE_TEXT   | Customer name                |
| 品名                   | 品名                   | SINGLE_LINE_TEXT   | Product involved             |
| 数量                   | 数量                   | DECIMAL            | Quantity affected            |
| 担当機械               | 担当機械               | SINGLE_LINE_TEXT   | Machine responsible          |
| 製造者1                | 製造者1                | SINGLE_LINE_TEXT   | Primary worker involved      |
| 製造者2                | 製造者2                | SINGLE_LINE_TEXT   | Secondary worker (if any)    |
| 営業関係者             | 営業関係者             | USER_SELECT        | Sales person notified        |
| 事故内容*具体的な状況* | 事故内容(具体的な状況) | MULTIPLE_LINE_TEXT | Detailed description         |
| 発生した原因           | 発生した原因           | MULTIPLE_LINE_TEXT | Root cause analysis          |
| 事故後の対処方法       | 事故後の対処方法       | MULTIPLE_LINE_TEXT | Immediate corrective actions |
| 再発防止方法           | 再発防止方法           | MULTIPLE_LINE_TEXT | Prevention measures          |
| 備考                   | 備考                   | MULTIPLE_LINE_TEXT | Additional notes             |
| 合計損害額             | 合計損害額             | CALC               | SUM of all subtable 小計     |
| 機械マスタID           | 機械マスタID           | DECIMAL            | [dev] FK to 機械マスタ       |
| 従業員ID               | 従業員ID               | DECIMAL            | [dev] FK to 従業員マスタ     |
| 得意先ID               | 得意先ID               | DECIMAL            | [dev] FK to 取引先マスタ     |

### Subtable: 損害 (Damage Line Items)

| Field Code | Label | Type          | Notes                             |
| ---------- | ----- | ------------- | --------------------------------- |
| 項目       | 項目  | SINGLE_SELECT | Damage category: 材料費/工賃/etc. |
| 枚数       | 枚数  | DECIMAL       | Number of sheets/pieces           |
| 原価       | 原価  | DECIMAL       | Cost per unit                     |
| 数量\_0    | 数量  | DECIMAL       | Quantity damaged                  |
| 小計       | 小計  | CALC          | 原価 x 数量 for this line         |

### Views

| View Name              | Type   |
| ---------------------- | ------ |
| 事故報告一覧           | LIST   |
| 事故報告一覧(検索特化) | CUSTOM |
| （すべて）             | LIST   |

### Key Logic

```
DAMAGE CALCULATION:
  各行: 小計 = 原価 x 数量
  合計損害額 = SUM(損害テーブル.小計)

LINKED DATA (auto-filled via lookup):
  得意先名 ← from 取引先マスタ via 得意先ID
  担当機械 ← from 機械マスタ via 機械マスタID

ROOT CAUSE STRUCTURE (4 text areas):
  事故内容(具体的な状況) — What happened
  発生した原因 — Why it happened
  事故後の対処方法 — What was done immediately
  再発防止方法 — How to prevent recurrence
  These follow standard Japanese QC (品質管理) report format

4 plugins — moderate automation
```

---

---

## 15. 運送請求データ取込

**Category:** Finance — Transportation Invoice Import
**Purpose:** Stores transport/delivery billing data from external logistics companies. Each record = one transport charge line item. Links to receiving records for AP processing.

### Overview

```
Import Flow:
  Transport company sends invoice (CSV or paper)
  → Data imported manually or via CSV import plugin
  → Each line = one delivery charge with surcharges
  → Linked to 納品(仕入)入力 via 納品(仕入)入力No
  → Feeds into 買掛管理 AP balance
```

### Main Fields

| Field Code       | Label            | Type             | Notes                                    |
| ---------------- | ---------------- | ---------------- | ---------------------------------------- |
| ステータス       | ステータス       | STATUS           | Record status                            |
| 日付             | 日付             | SINGLE_LINE_TEXT | Invoice date (stored as text — see note) |
| 注番             | 注番             | SINGLE_LINE_TEXT | Order number reference                   |
| 金額             | 金額             | DECIMAL          | Base transport amount                    |
| 運送会社番号     | 運送会社番号     | SINGLE_LINE_TEXT | Transport company ID code                |
| 備考             | 備考             | SINGLE_LINE_TEXT | Notes                                    |
| 単価             | 単価             | DECIMAL          | Unit price                               |
| 数量             | 数量             | DECIMAL          | Quantity or weight                       |
| 断裁金額         | 断裁金額         | DECIMAL          | Cutting/trimming surcharge               |
| 版代             | 版代             | DECIMAL          | Plate fee                                |
| 置き版代         | 置き版代         | DECIMAL          | Plate storage fee                        |
| 特色             | 特色             | DECIMAL          | Special color printing fee               |
| 納品*仕入*入力No | 納品(仕入)入力No | SINGLE_LINE_TEXT | Link key to receiving record             |

### Views

| View Name                    | Type   |
| ---------------------------- | ------ |
| 運送請求データ一覧           | LIST   |
| 運送請求データ一覧(検索特化) | CUSTOM |
| （すべて）                   | LIST   |

### Known Issues & Notes

```
BUG — 日付 field is SINGLE_LINE_TEXT not DATE:
  Data is imported as string (e.g. "2025/05/15")
  → Date-based filtering/sorting does not work properly
  → Fix: Add a DATE field, use JS to copy/parse 日付 into it

SURCHARGE FIELDS (specific to bag/print manufacturing):
  断裁金額 = Cutting fee charged by transport company
  版代 = Printing plate fee
  置き版代 = Fee for storing printing plates
  特色 = Special/spot color printing charge

LINK TO RECEIVING:
  納品(仕入)入力No links to 05.納品(仕入)入力 app
  Used to match transport charge to physical delivery

Only 2 plugins — minimal automation
Import is likely manual CSV or via a simple plugin
```

---

---

## 16. 申請管理

**Category:** HR/Workflow — Approval Request Management
**Purpose:** Employee leave and absence applications with multi-step approval workflow. Covers: leave requests, late arrival, early departure, and other HR requests.

### Overview

```
Request Workflow:
  Employee opens new record → submits 申請
  → Applicant = logged-in user (auto-fill)
  → Manager sees 未承認一覧 view
  → Manager approves/rejects via process management buttons
  → Status updates: 申請中 → 承認待 → 承認済 / 差戻し / 却下
```

### Main Fields

| Field Code                 | Label                                  | Type               | Notes                              |
| -------------------------- | -------------------------------------- | ------------------ | ---------------------------------- |
| ステータス                 | ステータス                             | STATUS             | Approval workflow status           |
| 申請区分                   | 申請区分                               | SINGLE_SELECT      | Request type (see below)           |
| 申請者                     | 申請者                                 | USER_SELECT        | Requesting employee (kintone user) |
| 申請分類                   | 申請分類                               | SINGLE_SELECT      | Sub-type of request                |
| 対象日付                   | 対象日付                               | DATE               | Date the request applies to        |
| 遅刻・早退\_合計時間       | 遅刻・早退\_合計時間（30分単位）       | TIME               | Total late/early time              |
| 遅刻・早退\_出勤・退勤時間 | 遅刻・早退\_出勤・退勤時間（30分単位） | TIME               | Actual arrival/departure time      |
| 申請理由                   | 申請理由                               | MULTIPLE_LINE_TEXT | Reason for request                 |
| 作業員名                   | 作業員名                               | SINGLE_LINE_TEXT   | Employee name text copy            |

### 申請区分 Options (Request Types)

- 休暇申請 (Leave/vacation request)
- 遅刻・早退申請 (Late or early departure)
- 欠勤申請 (Absence request)
- その他申請 (Other requests)

### Views

| View Name          | Type     | Filter / Purpose               |
| ------------------ | -------- | ------------------------------ |
| 申請一覧           | LIST     | 対象日付 >= TODAY() — upcoming |
| 申請一覧(検索特化) | CUSTOM   | Smart search                   |
| 未承認一覧         | LIST     | Pending approval items         |
| 作業者が自分       | LIST     | LOGINUSER() — my requests only |
| 休暇申請一覧       | LIST     | 申請区分 = 休暇申請            |
| 申請処理前一覧     | LIST     | Status = submitted/pending     |
| 休暇申請一覧2      | LIST     | Duplicate holiday list view    |
| カレンダーテスト   | CALENDAR | Calendar display of requests   |
| （すべて）         | LIST     | All records                    |

### Second App in Template: 従業員マスタ

This template bundle also includes the employee master app with fields:

- 従業員名, 従業員カテゴリ, ふりがな, 担当者コード
- Views: 在籍中の従業員一覧, 従業員一覧(検索特化)
- Used as lookup source for employee auto-fill in 申請管理

### Key Notes

```
APPROVAL WORKFLOW:
  Uses kintone native process management
  Approvers configured per status step in Process Management settings
  Assignees can be specific users or groups

TIME ENTRY (30-min units):
  遅刻・早退 times are in 30-minute intervals
  → May have JS validation to enforce :00 or :30 only
  → Check appjs files for this validation logic

CALENDAR VIEW:
  "カレンダーテスト" = calendar still in test phase
  対象日付 is the date field used for calendar positioning

HARDCODED FILTER in 未承認一覧:
  Filter references specific field IDs (not field codes)
  If you re-add fields, IDs change and filter breaks
  → Never delete and re-add fields in this app without updating filters

5 active plugins — includes calendar and approval plugins
```

---

---

## 17. 安全衛生チェック

**Category:** Compliance — Safety and Health Check
**Purpose:** Regular safety inspection checklists per department/machine area. Records daily or periodic safety checks for labor law compliance.

### Overview

```
Safety Check Flow:
  Inspector selects 部署 (department) and their name
  → Date recorded automatically
  → Checklist subtable filled: item by item evaluation
  → Issues flagged with 備考 notes
  → Monthly records retained for labor safety compliance (労働安全衛生法)
```

### Main Fields

| Field Code | Label      | Type             | Notes                    |
| ---------- | ---------- | ---------------- | ------------------------ |
| ステータス | ステータス | STATUS           | Record status            |
| 部署・機械 | 部署・機械 | SINGLE_LINE_TEXT | Area being inspected     |
| 名前       | 名前       | USER_SELECT      | Inspector (kintone user) |
| 日付       | 日付       | DATE             | Inspection date          |
| 従業員名   | 従業員名   | SINGLE_LINE_TEXT | Inspector name text copy |
| 部署       | 部署       | SINGLE_SELECT    | Department selection     |

### Subtable: チェックリスト (Checklist Items)

| Field Code | Label    | Type               | Notes                           |
| ---------- | -------- | ------------------ | ------------------------------- |
| No         | No       | DECIMAL            | Item sequence number            |
| 項目       | 項目     | MULTIPLE_LINE_TEXT | Check item description          |
| 評価       | 評価     | SINGLE_CHECK       | Pass checkbox (checked = OK)    |
| チェック   | チェック | MULTIPLE_CHECK     | Detailed multi-point check      |
| 備考       | 備考     | MULTIPLE_LINE_TEXT | Issues found / corrective notes |

### Views

| View Name       | Type   | Filter              |
| --------------- | ------ | ------------------- |
| 一覧            | LIST   | All records         |
| 一覧 （先月分） | LIST   | 日付 = LAST_MONTH() |
| 一覧(検索特化)  | CUSTOM | Smart search        |
| （すべて）      | LIST   | Default             |

### Key Notes

```
CHECKLIST TEMPLATE:
  項目 descriptions are pre-loaded (not dynamic)
  To change checklist items: edit the template rows in subtable field settings
  OR: use a plugin to auto-populate rows when record is created

COMPLIANCE RETENTION:
  先月分 view shows last month records
  Records must NOT be deleted (legal retention requirement)
  → Remove delete permission from non-admin users

部署 OPTIONS (SINGLE_SELECT):
  To add new departments: edit field options in field settings
  Current values not visible in template (stored separately)

6 active plugins — includes possible auto-row-fill plugin
```

---

---

## 18. アルコールチェック

**Category:** Compliance — Alcohol Check (Legal Requirement)
**Purpose:** Records mandatory pre/post-drive alcohol breath tests. Required by Japanese 道路交通法 (Road Traffic Act 2022 amendment). One record per driver per day covers both AM and PM checks.

### Overview

```
Alcohol Check Structure (1 record = 1 driver x 1 day):
  AM Check (before driving):
    検査日, 検査時刻(朝), 車両番号, 確認方法, 確認者
    酒気帯び運転の有無 = なし (expected pass)

  PM Check (after driving):
    Same fields with _0 suffix (second set of fields)

  Both AM and PM in same record
  Legal records retained minimum 1 year
```

### Main Fields

| Field Code                        | Label                   | Type               | Notes                           |
| --------------------------------- | ----------------------- | ------------------ | ------------------------------- |
| ステータス                        | ステータス              | STATUS             | Record status                   |
| 氏名                              | 氏名                    | USER_SELECT        | Driver (kintone user)           |
| 従業員名                          | 従業員名                | SINGLE_LINE_TEXT   | Driver name text copy           |
| 検査日                            | 検査日                  | DATE               | Date of check                   |
| **--- AM CHECK ---**              |                         |                    |                                 |
| 検査時刻                          | 検査時刻 (AM)           | TIME               | Morning check time              |
| 車両番号                          | 車両番号 (AM)           | SINGLE_SELECT      | Vehicle plate number            |
| 確認方法                          | 確認方法 (AM)           | SINGLE_SELECT      | 機器使用 / 目視 / 電話          |
| 酒気帯び運転の有無                | 酒気帯び運転の有無 (AM) | SINGLE_SELECT      | なし / あり                     |
| 確認者                            | 確認者 (AM)             | USER_SELECT        | Confirming supervisor           |
| 指示項目                          | 指示項目 (AM)           | SINGLE_LINE_TEXT   | Instructions if positive result |
| その他必要な項目                  | その他必要な項目 (AM)   | MULTIPLE_LINE_TEXT | Additional notes AM             |
| **--- PM CHECK (suffix \_0) ---** |                         |                    |                                 |
| 検査時刻\_0                       | 検査時刻 (PM)           | TIME               | Afternoon check time            |
| 車両番号\_0                       | 車両番号 (PM)           | SINGLE_SELECT      | Vehicle plate number PM         |
| 確認方法\_0                       | 確認方法 (PM)           | SINGLE_SELECT      | Check method PM                 |
| 酒気帯び運転の有無\_0             | 酒気帯び運転の有無 (PM) | SINGLE_SELECT      | Alcohol detected PM             |
| 確認者\_0                         | 確認者 (PM)             | USER_SELECT        | Confirming supervisor PM        |
| 指示項目\_0                       | 指示項目 (PM)           | SINGLE_LINE_TEXT   | Instructions PM                 |
| その他必要な項目\_0               | その他必要な項目 (PM)   | MULTIPLE_LINE_TEXT | Notes PM                        |

### 確認方法 Options

- 機器使用 (Breathalyzer device)
- 目視 (Visual inspection)
- 電話 (Phone-confirmed)

### 酒気帯び運転の有無 Options

- なし (None — PASS)
- あり (Detected — FAIL/FLAG)

### Views

| View Name      | Type   |
| -------------- | ------ |
| 一覧           | LIST   |
| 一覧(検索特化) | CUSTOM |
| （すべて）     | LIST   |

### Key Notes

```
LEGAL COMPLIANCE (道路交通法改正 2022):
  Records must be retained for minimum 1 year
  → Remove delete permissions from regular users
  → Consider archival process after 1 year

AM/PM DESIGN (confusing naming):
  Fields WITHOUT _0 suffix = AM (before driving)
  Fields WITH _0 suffix = PM (after driving)
  The _0 suffix is confusing — document this clearly for your team

POSITIVE RESULT ALERT:
  When 酒気帯び運転の有無 = あり:
  → Plugin/Customine should trigger manager notification
  → 指示項目 must be filled with action taken
  → Driver should not drive until cleared

VEHICLE NUMBERS:
  車両番号 = SINGLE_SELECT dropdown
  To add new vehicles: edit field options in settings

4 active plugins — likely includes notification plugin
```

---

---

## 19. 消耗品マスタ

**Category:** Master Data — Consumables Master
**Purpose:** Master list of all consumable items (office and factory supplies). Tracks item details, current stock, supplier information, and reorder points. Source data for 消耗品発注 (ordering) via lookup.

### Main Fields

| Field Code         | Label              | Type               | Notes                           |
| ------------------ | ------------------ | ------------------ | ------------------------------- |
| ステータス         | ステータス         | STATUS             | Record status                   |
| 名称               | 名称               | SINGLE_LINE_TEXT   | Consumable item name            |
| 区分               | 区分               | SINGLE_SELECT      | Category: 事務/工場/その他 etc. |
| カテゴリ           | カテゴリ           | SINGLE_SELECT      | Sub-category                    |
| 単価               | 単価               | DECIMAL            | Standard unit price             |
| 金額               | 金額               | DECIMAL            | Standard purchase amount        |
| 単位               | 単位               | SINGLE_LINE_TEXT   | Unit: 個/箱/本/袋 etc.          |
| 在庫数             | 在庫数             | DECIMAL            | Current stock quantity          |
| ロット数           | ロット数           | DECIMAL            | Standard lot/order quantity     |
| 発注点             | 発注点             | DECIMAL            | Reorder point (trigger level)   |
| 発注判定           | 発注判定           | SINGLE_LINE_TEXT   | [dev] Reorder trigger flag      |
| 仕入先名           | 仕入先名           | SINGLE_LINE_TEXT   | Supplier name (LOOKUP)          |
| 得意先レコード番号 | 得意先レコード番号 | DECIMAL            | [dev] FK to 取引先マスタ        |
| 得意先コード       | 得意先コード       | SINGLE_LINE_TEXT   | Supplier code                   |
| 仕入カテゴリ       | 仕入カテゴリ       | SINGLE_LINE_TEXT   | Purchase category               |
| 消費税区分         | 消費税区分         | SINGLE_LINE_TEXT   | Tax classification              |
| 端数区分           | 端数区分           | SINGLE_LINE_TEXT   | Rounding method                 |
| 計算区分           | 計算区分           | SINGLE_LINE_TEXT   | Calculation basis               |
| グループ区分       | グループ区分       | SINGLE_LINE_TEXT   | Group code                      |
| 名称\_日報連携キー | 名称\_日報連携キー | SINGLE_LINE_TEXT   | [dev] Link key for 日報         |
| 備考               | 備考               | MULTIPLE_LINE_TEXT | Notes                           |

### Views

| View Name            | Type   |
| -------------------- | ------ |
| 消耗品一覧(検索特化) | CUSTOM |
| 消耗品一覧           | LIST   |
| （すべて）           | LIST   |

### Key Logic

```
REORDER POINT SYSTEM:
  発注点 = minimum stock level (e.g., 5 units)
  在庫数 = current quantity
  発注判定 = [dev] auto-calculated: "要発注" if 在庫数 <= 発注点

  When 発注判定 triggers:
  → 消耗品発注 record can be auto-created
  → Or shows up in a filtered view for manual ordering

SUPPLIER LOOKUP:
  得意先レコード番号 → FK to 取引先マスタ
  Auto-fills: 仕入先名, 仕入カテゴリ, 消費税区分, 端数区分, 計算区分, グループ区分

  When creating 消耗品発注:
  → These fields are copied to the order record

名称_日報連携キー:
  Similar to 在庫管理 — links to 日報入力 for consumable tracking
  Some consumables (like glue, ink) may be tracked in daily reports

在庫数 UPDATE:
  Decremented when items are used (via 日報 or manual)
  Incremented when 消耗品発注 is received (納品日 filled in subtable)

ロット数:
  Standard order quantity — pre-fills 数量 in 消耗品発注 subtable

5 active plugins — includes Customine for reorder automation
```

---

---

## 20. 消耗品発注

**Category:** Procurement — Consumables Purchase Orders
**Purpose:** Creates purchase orders for office and factory consumable supplies. Links to supplier master, contains order line items with quantity and delivery tracking.

### Overview

```
Ordering Flow:
  Staff identifies low stock consumable
  → Creates 消耗品発注 record
  → Selects 発注先 (supplier) via lookup from 取引先マスタ
  → Adds items in 発注明細 subtable
  → Order sent to supplier (FAX/email via plugin)
  → 納品日 field filled when goods arrive
  → Can trigger 消耗品マスタ stock update on receipt
```

### Main Fields

| Field Code         | Label              | Type               | Notes                              |
| ------------------ | ------------------ | ------------------ | ---------------------------------- |
| ステータス         | ステータス         | STATUS             | Order status                       |
| 発注者             | 発注者             | USER_SELECT        | Person placing the order           |
| 発注日             | 発注日             | DATE               | Order date                         |
| 発注先             | 発注先             | SINGLE_LINE_TEXT   | Supplier name (LOOKUP from master) |
| 発注先レコード番号 | 発注先レコード番号 | DECIMAL            | [dev] FK to 取引先マスタ           |
| 発注先得意先コード | 発注先得意先コード | SINGLE_LINE_TEXT   | [dev] Supplier code                |
| 仕入カテゴリ       | 仕入カテゴリ       | SINGLE_LINE_TEXT   | Purchase category (from master)    |
| 消費税区分         | 消費税区分         | SINGLE_LINE_TEXT   | Tax classification (from master)   |
| 計算区分           | 計算区分           | SINGLE_LINE_TEXT   | Calculation method (from master)   |
| 端数区分           | 端数区分           | SINGLE_LINE_TEXT   | Rounding method (from master)      |
| グループ区分       | グループ区分       | SINGLE_LINE_TEXT   | Group code (from master)           |
| TEL                | TEL                | LINK               | Supplier phone (clickable)         |
| FAX                | FAX                | LINK               | Supplier FAX (for order sending)   |
| 備考\_0            | 備考               | MULTIPLE_LINE_TEXT | Order notes                        |

### Subtable: 発注明細 (Order Line Items)

| Field Code       | Label            | Type             | Notes                                    |
| ---------------- | ---------------- | ---------------- | ---------------------------------------- |
| 商品名           | 商品名           | SINGLE_LINE_TEXT | Item name                                |
| 単価             | 単価             | DECIMAL          | Unit price                               |
| 単位             | 単位             | SINGLE_LINE_TEXT | Unit (個/箱/本 etc.)                     |
| 数量             | 数量             | DECIMAL          | Quantity ordered                         |
| 希望納期         | 希望納期         | DATE             | Requested delivery date                  |
| 発注者名又は番号 | 発注者名又は番号 | SINGLE_LINE_TEXT | Orderer reference                        |
| 納品日           | 納品日           | DATE             | Actual delivery date (filled on receipt) |
| 備考             | 備考             | SINGLE_LINE_TEXT | Line item notes                          |

### Views

| View Name          | Type   | Filter                  |
| ------------------ | ------ | ----------------------- |
| 発注一覧           | LIST   | All orders              |
| （作業者が自分）   | LIST   | LOGINUSER() — my orders |
| 発注一覧(検索特化) | CUSTOM | Smart search            |
| （すべて）         | LIST   | Default                 |

### Key Notes

```
SUPPLIER LOOKUP CHAIN:
  When 発注先レコード番号 is set via lookup:
  Auto-fills: 発注先, TEL, FAX, 仕入カテゴリ, 消費税区分,
              計算区分, 端数区分, グループ区分

FAX FUNCTIONALITY:
  FAX field is LINK type — plugin likely enables direct FAX
  from kintone to supplier

DELIVERY TRACKING:
  納品日 in subtable row is blank until goods arrive
  Staff updates 納品日 when receiving each item
  Used to track partial delivery status

4 active plugins — includes possibly a FAX/print plugin
```

---

---

## 21. 売入金管理（売上）

**Category:** Finance — Accounts Receivable Payment Tracking
**Purpose:** Tracks incoming payments against invoices. Each record = one invoice with full payment history. Calculates payment status and syncs balances to 売掛管理.

### Overview

```
AR Payment Flow:
  Invoice issued → 売入金管理 record created (auto by Customine)
  → Customer pays → staff enters payment in 入金明細 subtable
  → CALC fields auto-determine: 入金済/入金不足/過入金
  → 売掛更新キー triggers 売掛管理 balance update
  → 締日売掛更新キー triggers 売掛管理(締日別) balance update
```

### Main Fields

| Field Code         | Label              | Type               | Notes                                   |
| ------------------ | ------------------ | ------------------ | --------------------------------------- |
| ステータス         | ステータス         | STATUS             | Record status                           |
| 請求日             | 請求日             | DATE               | Invoice date                            |
| 得意先名           | 得意先名           | SINGLE_LINE_TEXT   | Customer name                           |
| 得意先レコード番号 | 得意先レコード番号 | DECIMAL            | [dev] FK to 取引先マスタ                |
| 売上金額*税抜*     | 売上金額(税抜)     | DECIMAL            | Sales amount excl. tax                  |
| 売上金額*税込*     | 売上金額(税込)     | DECIMAL            | Sales amount incl. tax                  |
| 税区分             | 税区分             | SINGLE_LINE_TEXT   | Tax classification                      |
| 請求金額           | 請求金額           | DECIMAL            | Billed amount                           |
| 請求書番号\_0      | 請求書番号         | SINGLE_LINE_TEXT   | Invoice number reference                |
| 請求年月           | 請求年月           | SINGLE_LINE_TEXT   | Invoice YYYYMM                          |
| 担当者             | 担当者             | USER_SELECT        | Sales person in charge                  |
| 締日*マスタ*       | 締日(マスタ)       | SINGLE_LINE_TEXT   | Customer's closing date from master     |
| 今回締日           | 今回締日           | SINGLE_LINE_TEXT   | This invoice's closing date             |
| 回収予定月         | 回収予定月         | SINGLE_LINE_TEXT   | Expected collection month               |
| 回収予定日         | 回収予定日         | SINGLE_LINE_TEXT   | Expected collection date                |
| 備考               | 備考               | MULTIPLE_LINE_TEXT | Notes                                   |
| 入金済             | 入金済             | CALC               | Fully paid flag (1 or 0)                |
| 入金不足           | 入金不足           | CALC               | Underpaid amount (positive = shortfall) |
| 過入金             | 過入金             | CALC               | Overpaid amount                         |
| 入金金額判定       | 入金金額判定       | SINGLE_LINE_TEXT   | Payment status label                    |
| 更新キー           | 更新キー           | SINGLE_LINE_TEXT   | [dev] Cross-app sync key                |

### Subtable: 入金明細 (Payment Receipt Lines)

| Field Code           | Label                 | Type             | Notes                                |
| -------------------- | --------------------- | ---------------- | ------------------------------------ |
| 入金日\_0            | 入金日                | DATE             | Payment received date                |
| 入金金額             | 入金金額              | DECIMAL          | Payment amount                       |
| 手数料               | 手数料                | DECIMAL          | Bank/processing fee                  |
| 歩引き               | 歩引き                | DECIMAL          | Trade discount deducted              |
| 入金方法             | 入金方法              | SINGLE_SELECT    | 振込/手形/現金                       |
| 銀行                 | 銀行                  | SINGLE_SELECT    | Receiving bank account               |
| 入金年月             | 入金年月              | SINGLE_LINE_TEXT | Payment YYYYMM                       |
| 売掛更新キー         | 売掛更新キー          | SINGLE_LINE_TEXT | [dev] Key to update 売掛管理         |
| 締日売掛更新キー     | 締日売掛更新キー      | SINGLE_LINE_TEXT | [dev] Key to update 売掛管理(締日別) |
| 入金額小計           | 入金額小計            | CALC             | Running subtotal                     |
| 得意先レコード番号\_ | 得意先レコード番号\_  | CALC             | Customer ID copy for linking         |
| 日/年月/翌月 etc.    | Date breakdown fields | CALC             | Used for period aggregation          |

### Views

| View Name              | Type   | Filter                      |
| ---------------------- | ------ | --------------------------- |
| 入金管理一覧　未入金   | LIST   | 入金不足 >= 1 (outstanding) |
| 入金管理一覧           | LIST   | All records                 |
| 入金管理一覧(検索特化) | CUSTOM | Smart search                |
| （すべて）             | LIST   | Default                     |

### Key Logic

```
PAYMENT STATUS CALCULATION:
  入金額合計 = SUM(入金明細.入金金額) - SUM(手数料) - SUM(歩引き)
  入金済 = 1 if 入金額合計 >= 請求金額, else 0
  入金不足 = 請求金額 - 入金額合計 (when positive = shortfall)
  過入金 = 入金額合計 - 請求金額 (when negative)

CROSS-APP SYNC KEYS (CRITICAL — never rename):
  売掛更新キー format: {得意先ID}_{年月}
    → Customine uses this to find 売掛管理 record and update 当月入金額

  締日売掛更新キー format: {得意先ID}_{締日}_{年月}
    → Customine uses this to find 売掛管理(締日別) record

歩引き (Trade Discount):
  Common Japanese manufacturing practice
  Customer deducts an agreed percentage from payment
  e.g., Invoice ¥100,000, customer pays ¥99,000 (¥1,000 歩引き)
  歩引き field tracks this deduction separately

7 active plugins — most plugin-heavy app in the system
```

---

---

## 22. 過去の売上データ

**Category:** Finance / Archive — Historical Sales Data
**Purpose:** Historical archive of past sales by customer per fiscal year (May–April). One record = one customer × one fiscal year × 12 monthly figures. Used for year-over-year comparison.

### Main Fields

| Field Code          | Label        | Type             | Notes                                  |
| ------------------- | ------------ | ---------------- | -------------------------------------- |
| ステータス          | ステータス   | STATUS           | Status                                 |
| 担当者              | 担当者       | SINGLE_LINE_TEXT | Sales person                           |
| 決算年度            | 決算年度     | SINGLE_LINE_TEXT | Fiscal year label (e.g., "2024年度")   |
| \_5月 through \_4月 | 5月〜4月     | DECIMAL          | Monthly sales amounts (12 fields)      |
| 小計                | 小計         | CALC             | First half subtotal                    |
| 合計                | 年間合計     | CALC             | Full year SUM of all 12 months         |
| 決算最終月初        | 決算最終月初 | DATE             | First day of fiscal year's last month  |
| 年月日              | 年月日       | SINGLE_LINE_TEXT | Date string                            |
| 年\_日付            | 年\_日付     | CALC             | Year extracted from date               |
| 年月日\_日付        | 年月日\_日付 | CALC             | Date in YYYYMMDD format                |
| 日付\_和暦          | 日付\_和暦   | SINGLE_LINE_TEXT | Japanese era date (令和X年X月X日)      |
| 異常値フラグ        | 異常値フラグ | SINGLE_CHECK     | Flag for suspicious data               |
| レコードキー        | レコードキー | SINGLE_LINE_TEXT | [dev] Unique key: {担当者}\_{決算年度} |

### Fiscal Year Column Structure

```
Japanese fiscal year runs May to April:
  _5月 (May) → _6月 → _7月 → _8月 → _9月 → _10月
  → _11月 → _12月 → _1月 → _2月 → _3月 → _4月 (April)

  小計 = typically May–October (first half year)
  年間合計 = all 12 months SUM
```

### Views

| View Name              | Type   | Notes                      |
| ---------------------- | ------ | -------------------------- |
| 売上一覧               | LIST   | All records                |
| 過去売上一覧(検索特化) | CUSTOM | Smart search               |
| krew                   | CUSTOM | krewSheet spreadsheet view |
| （すべて）             | LIST   | Default                    |

### Key Notes

```
krewSheet (krew view):
  Spreadsheet-style editable grid view
  Allows bulk entry and editing like Excel
  Plugin: kcongfoeinpabpadfadhbkdfpfiinndh or fieanfmelmfcoggmlmkihiaehchnfebc

和暦 FIELD:
  日付_和暦 = Japanese Imperial calendar date
  Must be maintained in sync with Gregorian date
  Currently stored as text: "令和X年X月X日"

異常値フラグ:
  When checked, flags this record as having suspicious data
  Useful for filtering out bad legacy data from reports

レコードキー prevents duplicates:
  Format: {担当者}_{決算年度}
  If duplicate key exists, Customine can skip creating duplicate
```

---

---

## 22. 過去の売上データ（開発アプリ）

**Category:** Development — Developer Copy of Historical Sales App
**Purpose:** Identical schema to production 過去の売上データ. Used for safe testing of schema changes, JS customizations, and Customine rule updates before deploying to production.

### Comparison Table

| Aspect    | Production (22.)     | Dev Version (22.-)    |
| --------- | -------------------- | --------------------- |
| Schema    | Production schema    | Identical schema      |
| Data      | Real historical data | Test/dummy data       |
| Access    | All users            | Developers only       |
| Stability | Should be stable     | Can be changed freely |
| Plugins   | Same set             | Same set              |

### Developer Usage Guide

```
BEST PRACTICES:
  1. All JS customization changes: test here first
  2. All Customine rule changes: test here first
  3. Import test data, verify all CALC formulas work
  4. After validation → deploy same change to production

HOW TO IDENTIFY IN JS CODE:
  kintone.app.getId() returns different app ID for each
  Store app IDs as constants:
  const SALES_HISTORY_APP = 22;   // production
  const SALES_HISTORY_DEV = 221;  // developer (check actual ID)
```

---

---

## 23-2. 売掛管理（締日別）

**Category:** Finance — Accounts Receivable by Closing Date
**Purpose:** Tracks AR balances per customer per month, grouped by 締日 (closing date). Each record = one customer × one month × one closing date. Provides separate filtered views per closing date group.

### Overview

```
AR by Closing Date Flow:
  Sales recorded in 売上入力 with 締日 from 取引先マスタ
  → 売掛管理(締日別) record updated:
      前月売掛残 + 売上額 - 当月入金額 = 当月売掛残
  → At closing date → generate invoice for that 締日 group
  → Separate views show: 5日締/10日締/15日締/20日締/25日締/末日締
```

### Main Fields

| Field Code         | Label              | Type             | Notes                                 |
| ------------------ | ------------------ | ---------------- | ------------------------------------- |
| ステータス         | ステータス         | STATUS           | Record status                         |
| 得意先ID           | 得意先ID           | DECIMAL          | FK to 取引先マスタ                    |
| 得意先名           | 得意先名           | SINGLE_LINE_TEXT | Customer name                         |
| 年月               | 年月               | SINGLE_LINE_TEXT | YYYYMM period string                  |
| 年月日             | 年月日             | DATE             | First day of period                   |
| 前月年月日         | 前月年月日         | DATE             | First day of previous period          |
| 前月年月           | 前月年月           | SINGLE_LINE_TEXT | Previous period YYYYMM                |
| 締日               | 締日               | SINGLE_LINE_TEXT | 5日/10日/15日/20日/25日/末日/随時請求 |
| 請求締日           | 請求締日           | SINGLE_LINE_TEXT | Invoice closing date                  |
| 前月売掛残         | 前月売掛残         | DECIMAL          | Previous month AR balance             |
| 当月入金額         | 当月入金額         | DECIMAL          | Payments received this month          |
| 差引残高           | 差引残高           | CALC             | 前月売掛残 - 当月入金額               |
| 売上額             | 売上額             | DECIMAL          | Sales this month                      |
| 当月合計金額       | 当月合計金額       | CALC             | 差引残高 + 売上額 + 税                |
| 当月売掛残         | 当月売掛残         | CALC             | Closing AR balance this month         |
| 売掛更新キー       | 売掛更新キー       | SINGLE_LINE_TEXT | [dev] Cross-app sync key              |
| 消費税端数調整     | 消費税端数調整     | DECIMAL          | Tax rounding adjustment               |
| 端数区分           | 端数区分           | SINGLE_LINE_TEXT | Rounding method                       |
| 消費税区分         | 消費税区分         | SINGLE_LINE_TEXT | Tax classification                    |
| 計算区分           | 計算区分           | SINGLE_LINE_TEXT | Calculation method                    |
| *10*対象売上額     | 10%対象売上額      | DECIMAL          | Sales at 10% tax rate                 |
| *8*対象売上額      | 8%対象売上額       | DECIMAL          | Sales at 8% tax rate                  |
| 非課税対象売上額   | 非課税対象売上額   | DECIMAL          | Tax-exempt sales                      |
| 対象外対象売上額   | 対象外対象売上額   | DECIMAL          | Outside-scope sales                   |
| *10*対象消費税額   | 10%対象消費税額    | CALC             | Tax on 10% items                      |
| *8*対象消費税額    | 8%対象消費税額     | CALC             | Tax on 8% items                       |
| 非課税対象消費税額 | 非課税対象消費税額 | CALC             | Tax on exempt items (=0)              |
| 消費税額合計       | 消費税額合計       | CALC             | Total consumption tax                 |
| 消費税額           | 消費税額           | CALC             | Tax amount (for invoicing)            |
| 請求書発行区分     | 請求書発行区分     | SINGLE_LINE_TEXT | Invoice issue flag                    |
| 納品書発行区分     | 納品書発行区分     | SINGLE_LINE_TEXT | Delivery note issue flag              |
| 回収予定区分       | 回収予定区分       | SINGLE_LINE_TEXT | Collection type                       |
| 回収予定日         | 回収予定日         | SINGLE_LINE_TEXT | Expected collection date              |
| 請求情報更新済み   | 請求情報更新済み   | DECIMAL          | [dev] Invoice update done flag        |
| 次月分判定         | 次月分判定         | SINGLE_LINE_TEXT | [dev] Next month rollover flag        |
| 前月キー           | 前月キー           | SINGLE_LINE_TEXT | [dev] Link to previous month record   |
| 売上情報詳細       | 売上情報詳細       | REFERENCE_TABLE  | Linked sales records display          |
| 直近の売掛レコード | 直近の売掛レコード | REFERENCE_TABLE  | Latest AR record for customer         |
| 過去売掛           | 過去売掛           | REFERENCE_TABLE  | Historical AR records display         |
| 改修中 group       | 改修中             | GROUP            | Fields currently being revised        |

### Views (One Per Closing Date)

| View Name           | Type   | Filter            |
| ------------------- | ------ | ----------------- |
| 売掛一覧            | LIST   | All records       |
| 売掛一覧 - 5日締    | LIST   | 締日 = "5日"      |
| 売掛一覧 - 10日締   | LIST   | 締日 = "10日"     |
| 売掛一覧 - 15日締   | LIST   | 締日 = "15日"     |
| 売掛一覧 - 20日締   | LIST   | 締日 = "20日"     |
| 売掛一覧 - 25日締   | LIST   | 締日 = "25日"     |
| 売掛一覧 - 末日締   | LIST   | 締日 = "末日"     |
| 売掛一覧 - 随時請求 | LIST   | 締日 = "随時請求" |
| 売掛一覧 - 締日空欄 | LIST   | 締日 = ""         |
| 売掛一覧(検索特化)  | CUSTOM | Smart search      |
| （すべて）          | LIST   | Default           |

### Key Logic — The AR Balance Chain

```
MONTHLY ROLLOVER (automated by Customine at month start):
  1. 当月売掛残 from last month → becomes 前月売掛残 this month
  2. 当月入金額 reset to 0
  3. 売上額 reset to 0
  4. 前月キー = last month's record ID

BALANCE FORMULA:
  差引残高 = 前月売掛残 - 当月入金額
  当月合計金額 = 差引残高 + 売上額
  当月売掛残 = 当月合計金額 + 消費税額 (after rounding adjustment)

インボイス制度 TAX BREAKDOWN:
  10%対象消費税額 = FLOOR(10%対象売上額 x 0.10)
  8%対象消費税額  = FLOOR(8%対象売上額 x 0.08)
  消費税額合計 = SUM of both + rounding adjustment
  These must appear separately on legally compliant invoices

SYNC KEY FORMAT (CRITICAL):
  売掛更新キー: {得意先ID}_{年月}
  Used by 売入金管理 to update 当月入金額 when payment received

改修中 GROUP:
  Contains fields currently under revision
  Do not rely on values in this group — they may change
  Consult with team before modifying these fields

2 active plugins (minimal) — most logic via Customine
```

---

---

## 23. 売掛管理

**Category:** Finance — Accounts Receivable (Monthly Standard)
**Purpose:** Standard AR tracking by customer by calendar month. Very similar to 23-2 but without closing date grouping. Used as the primary month-end AR ledger.

### Key Differences vs 売掛管理(締日別)

| Aspect      | 売掛管理 (23)     | 売掛管理(締日別) (23-2) |
| ----------- | ----------------- | ----------------------- |
| Grouping    | By calendar month | By closing date         |
| 締日 field  | Not present       | Present                 |
| Views       | This/last month   | Per closing date        |
| Primary use | Monthly total AR  | Per-closing billing     |

### Additional Fields (unique to this app)

| Field Code       | Label            | Type            | Notes                                       |
| ---------------- | ---------------- | --------------- | ------------------------------------------- |
| 年               | 年               | SINGLE_SELECT   | Year filter dropdown                        |
| 月               | 月               | SINGLE_SELECT   | Month filter dropdown                       |
| 当月売掛残*旧*   | 当月売掛残(旧)   | DECIMAL         | Legacy balance field (before system change) |
| 関連レコード一覧 | 関連レコード一覧 | REFERENCE_TABLE | Related sales records                       |

All other fields are identical to 売掛管理(締日別).

### Views

| View Name          | Type   | Filter                          |
| ------------------ | ------ | ------------------------------- |
| 当月売掛一覧       | LIST   | 年月日 = THIS_MONTH()           |
| 先月売掛一覧       | LIST   | 年月日 = LAST_MONTH()           |
| 先々月売掛一覧     | LIST   | HARDCODED to "2025年06月" — BUG |
| 売掛一覧           | LIST   | All records                     |
| 売掛一覧(検索特化) | CUSTOM | Smart search                    |
| （すべて）         | LIST   | Default                         |

### Known Bug

```
BUG: 先々月売掛一覧 has HARDCODED filter: f8409935 = "2025年06月"
This view will ONLY show June 2025 data and never update.

FIX OPTIONS:
  Option 1: Edit view filter to use a dynamic expression
            (kintone does not natively support THIS_MONTH()-2)
  Option 2: Use JavaScript to dynamically modify the query
  Option 3: Update the hardcoded value monthly (temporary workaround)
  Option 4: Remove this view and create a date picker in the CUSTOM view
```

---

---

## 23. 買掛管理

**Category:** Finance — Accounts Payable
**Purpose:** Tracks payable balances per supplier per month. Each record = one supplier × one month. Balance calculated from purchases, payments, and detailed cost category breakdowns.

### Overview

```
AP Balance Flow:
  仕入入力 → increases 仕入額 + cost category fields in 買掛管理
  支払入力 → increases 当月支払額 in 買掛管理

  当月買掛残 = 前月買掛残 + 仕入額 - 当月支払額
```

### Main Fields

| Field Code       | Label            | Type             | Notes                            |
| ---------------- | ---------------- | ---------------- | -------------------------------- |
| ステータス       | ステータス       | STATUS           | Record status                    |
| 得意先ID         | 得意先ID         | DECIMAL          | FK to 取引先マスタ (supplier)    |
| 得意先名         | 得意先名         | SINGLE_LINE_TEXT | Supplier name                    |
| 年月             | 年月             | SINGLE_LINE_TEXT | YYYYMM period                    |
| 年月日           | 年月日           | DATE             | Period first day                 |
| 前月年月日       | 前月年月日       | DATE             | Previous period first day        |
| 前月年月         | 前月年月         | SINGLE_LINE_TEXT | Previous YYYYMM                  |
| 前月買掛残       | 前月買掛残       | DECIMAL          | Previous month AP balance        |
| 当月支払額       | 当月支払額       | DECIMAL          | Payments made this month         |
| 差引残高         | 差引残高         | CALC             | 前月買掛残 - 当月支払額          |
| 仕入額           | 仕入額           | DECIMAL          | Total purchase amount this month |
| 当月合計金額     | 当月合計金額     | CALC             | Balance + purchases              |
| 当月買掛残       | 当月買掛残       | CALC             | Closing AP balance               |
| 消費税額         | 消費税額         | CALC             | Consumption tax                  |
| 消費税区分       | 消費税区分       | SINGLE_LINE_TEXT | Tax classification               |
| 端数区分         | 端数区分         | SINGLE_LINE_TEXT | Rounding method                  |
| 計算区分         | 計算区分         | SINGLE_LINE_TEXT | Calculation method               |
| 消費税端数調整   | 消費税端数調整   | DECIMAL          | Tax rounding adjustment          |
| 仕入カテゴリ     | 仕入カテゴリ     | SINGLE_LINE_TEXT | Purchase category                |
| 買掛連携キー     | 買掛連携キー     | SINGLE_LINE_TEXT | [dev] Key for cross-app update   |
| 前月買掛連携キー | 前月買掛連携キー | SINGLE_LINE_TEXT | [dev] Previous month link key    |

### Cost Category Fields (Detailed AP Breakdown)

| Field               | Label                  | Purpose                     |
| ------------------- | ---------------------- | --------------------------- |
| 材料仕入            | 材料仕入               | Raw material purchases      |
| 商品仕入            | 商品仕入               | Finished goods purchases    |
| 外注                | 外注                   | Outsourcing fees            |
| 原消耗品            | 原消耗品               | Production consumables      |
| 原修繕費            | 原修繕費               | Production repair costs     |
| 原配送              | 原配送                 | Production delivery costs   |
| 原雑費              | 原雑費                 | Production miscellaneous    |
| 原包装費            | 原包装費               | Production packaging        |
| 消耗品              | 消耗品                 | General consumables         |
| 修繕費              | 修繕費                 | Repair/maintenance          |
| 配送                | 配送                   | Delivery costs              |
| 雑費                | 雑費                   | Miscellaneous expenses      |
| 包装費              | 包装費                 | Packaging costs             |
| 事務消耗品          | 事務消耗品             | Office supplies             |
| 経費                | 経費                   | General expenses            |
| 断裁金額            | 断裁金額               | Cutting charges             |
| 版代・木型代        | 版代・木型代           | Plate/die fees              |
| 置き版代            | 置き版代               | Plate storage fees          |
| 特色・色替・その他  | 特色・色替・その他     | Special color/misc          |
| 材料\_商品仕入      | 材料+商品仕入          | CALC: SUM of material+goods |
| Various 雑\* fields | Miscellaneous variants | Each category's misc        |

### Reference Tables

| Field            | Purpose                       |
| ---------------- | ----------------------------- |
| 仕入情報詳細     | Shows linked purchase records |
| 過去買掛レコード | Shows historical AP records   |

### Views

| View Name              | Type   | Filter                             |
| ---------------------- | ------ | ---------------------------------- |
| 当月買掛一覧           | LIST   | THIS_MONTH()                       |
| 先月買掛一覧           | LIST   | LAST_MONTH()                       |
| 先々月買掛一覧         | LIST   | HARDCODED — BUG (same as 売掛管理) |
| 買掛一覧               | LIST   | All records                        |
| 買掛一覧(すべての項目) | LIST   | All fields visible                 |
| 買掛一覧(検索特化)     | CUSTOM | Smart search                       |
| （すべて）             | LIST   | Default                            |

### Key Logic

```
AP UPDATE TRIGGER (via Customine):
  When 支払入力 saved:
    買掛更新キー in subtable = {仕入先ID}_{支払年月}
    → Matches 買掛管理.買掛連携キー
    → Updates 当月支払額

  When 仕入入力 saved:
    Similar key-based trigger
    → Updates 仕入額 and the specific cost category field

COST CATEGORY PURPOSE:
  20+ breakdown fields allow management accounting:
  原* = Factory/production overhead costs
  雑* = Miscellaneous variants (irregular costs)
  This level of detail feeds into management P&L reports

BUG: 先々月買掛一覧 hardcoded filter
  Same issue as 売掛管理 — fix similarly

3 active plugins — moderate automation
```

---

---

## 25. 販売先別売上計画

**Category:** Planning — Sales Plan by Customer
**Purpose:** Annual sales targets vs actual tracking per customer per fiscal year (May–April). One record = one customer × one fiscal year. Shows 12 months of actual sales alongside 12 months of planned targets with achievement rate.

### Overview

```
Sales Plan Structure:
  One record = One customer x One fiscal year
  Two parallel sets of monthly columns:
    _05月 to _04月       = ACTUAL monthly sales
    _05月_計画 to _04月_計画 = PLANNED monthly targets

  年間合計 = SUM of actual 12 months
  計画比進捗率 = 年間合計 / 計画値 x 100%
```

### Main Fields

| Field Code     | Label          | Type             | Notes                          |
| -------------- | -------------- | ---------------- | ------------------------------ |
| ステータス     | ステータス     | STATUS           | Status                         |
| 得意先ID       | 得意先ID       | DECIMAL          | FK to 取引先マスタ             |
| 得意先名       | 得意先名       | SINGLE_LINE_TEXT | Customer name                  |
| 得意先コード   | 得意先コード   | SINGLE_LINE_TEXT | Customer code                  |
| 旧得意先コード | 旧得意先コード | SINGLE_LINE_TEXT | Legacy customer code           |
| グループ名     | グループ名     | SINGLE_LINE_TEXT | Customer group                 |
| 分類           | 分類           | SINGLE_LINE_TEXT | Customer classification        |
| 中分類         | 中分類         | SINGLE_LINE_TEXT | Sub-classification             |
| 日付           | 日付           | DATE             | Reference date for fiscal year |
| 年             | 年             | SINGLE_LINE_TEXT | Fiscal year label              |
| 計画値         | 計画値         | DECIMAL          | Annual target (total)          |
| 計画比進捗率   | 計画比進捗率   | CALC             | 年間合計 / 計画値 x 100        |
| 年間合計       | 年間合計       | CALC             | SUM of actual 12 months        |
| 備考           | 備考           | SINGLE_LINE_TEXT | Notes                          |

### Actual Sales (Monthly) — 12 Fields

\_05月, \_06月, \_07月, \_08月, \_09月, \_10月, \_11月, \_12月, \_01月, \_02月, \_03月, \_04月

### Planned Targets (Monthly) — 12 Fields

*05月*計画, *06月*計画, *07月*計画, *08月*計画, *09月*計画, *10月*計画,
*11月*計画, *12月*計画, *01月*計画, *02月*計画, *03月*計画, *04月*計画

### Views

| View Name                  | Type   |
| -------------------------- | ------ |
| 販売先別売上計画           | LIST   |
| 販売先別売上計画(検索特化) | CUSTOM |
| （すべて）                 | LIST   |

### Key Logic

```
PLAN VS ACTUAL:
  Each month has two fields: actual and plan
  Enables column-by-column comparison
  計画比進捗率 = (年間合計 / 計画値) x 100
  年間合計 = SUM of actual fields only

HOW ACTUALS ARE UPDATED:
  Option A: Sales staff manually update each month
  Option B: Customine auto-aggregates from 売上入力 by customer x month
  Check Customine rules to determine which method is active

PLAN ENTRY:
  _05月_計画 etc. entered by sales manager at fiscal year start
  可能なアクション: Edit record, update 12 plan columns

旧得意先コード:
  When customer codes are renumbered, old code preserved here
  Needed to match historical data from before the code change

2 active plugins — lightweight, likely just krewSheet for
spreadsheet-style viewing and bulk editing
```

---

---

## CROSS-APP UPDATE KEY REFERENCE

| Key Field                    | Format                   | Connects           | Direction               |
| ---------------------------- | ------------------------ | ------------------ | ----------------------- |
| 買掛更新キー (in 支払入力)   | {仕入先ID}\_{支払年月}   | → 買掛管理         | Updates 当月支払額      |
| 売掛更新キー (in 売入金管理) | {得意先ID}\_{年月}       | → 売掛管理         | Updates 当月入金額      |
| 締日売掛更新キー             | {得意先ID}_{締日}_{年月} | → 売掛管理(締日別) | Updates 当月入金額      |
| 買掛連携キー (in 買掛管理)   | {仕入先ID}\_{年月}       | ← 支払入力         | Receives payment update |
| 前月キー                     | Previous record ID       | 売掛管理 same app  | Month rollover link     |

> **WARNING**: Never rename any field with キー in its name without updating ALL Customine rules that reference it. These keys are the backbone of cross-app automation.

---

---

## COMPLETE APP INTERCONNECTION MAP

```
┌─────────────────────────────────────────────────────────────────┐
│              COMPLETE SYSTEM WORKFLOW                            │
│                                                                 │
│  MASTER DATA (lookup sources):                                  │
│  取引先マスタ ◄── All transactional apps                        │
│  従業員マスタ ◄── 日報, アルコール, 申請                        │
│  機械マスタ   ◄── 日報, 製袋予定                               │
│  在庫管理     ◄── 日報(読取) / ←更新← 日報(書込)              │
│  消耗品マスタ ◄── 消耗品発注                                   │
│                                                                 │
│  SALES CYCLE (left to right):                                   │
│  見積書管理                                                     │
│      ↓ (order placed)                                           │
│  受注入力 ──────────────────────────────────────────┐         │
│      ↓ (schedule production)         (update qty)  │         │
│  製袋予定管理 ◄──► 日報入力 ──────────────────────►│         │
│                        ↓ (material use)             │         │
│                    在庫管理                          │         │
│      ↓                                              │         │
│  売上入力 ◄─────────────────────────────────────────┘         │
│      │                                                          │
│      ├──► 納品書管理 (delivery note PDF)                        │
│      └──► 請求書管理 (invoice PDF)                             │
│                ↓                                                │
│          売入金管理 (payment tracking)                          │
│                ↓                                                │
│          売掛管理 / 売掛管理(締日別) (AR ledger)                │
│                                                                 │
│  PURCHASE CYCLE:                                                │
│  納品(仕入)入力 ──► 買掛管理 ◄── 支払入力                     │
│       ↑                                                         │
│  運送請求データ取込 (transport costs)                           │
│                                                                 │
│  REPORTING:                                                     │
│  過去の売上データ | 販売先別売上計画                            │
│                                                                 │
│  COMPLIANCE:                                                    │
│  申請管理 | アルコールチェック | 安全衛生 | 事故報告            │
│                                                                 │
│  PROCUREMENT:                                                   │
│  消耗品マスタ → 消耗品発注 → (外部サプライヤー) → 受取         │
└─────────────────────────────────────────────────────────────────┘
```

---

---

## APP-TO-APP LOOKUP MAP

```
LOOKUPS INTO 取引先マスタ (01):
  受注入力 → 受注先の得意先ID → fills: 得意先名, 締日, 住所, etc.
  売上入力 → 売上先の得意先ID → fills: 得意先名, 締日, 税区分, etc.
  見積書管理 → 得意先ID       → fills: 得意先名, 略名
  納品書管理 → 得意先ID       → fills: 得意先名, 住所, 登録番号
  請求書管理 → 得意先ID       → fills: 得意先名, 住所, 登録番号, 締日
  消耗品発注 → 発注先レコード番号 → fills: 仕入先名, TEL, FAX, 税区分
  消耗品マスタ → 得意先レコード番号 → fills: 仕入先名, 仕入カテゴリ
  事故報告  → 得意先ID       → fills: 得意先名
  売入金管理 → 得意先レコード番号 → fills: 得意先名, 締日

LOOKUPS INTO 従業員マスタ (02):
  日報入力 → 従業員ID → fills: 作業者名, 作業員コード, 作業単価

LOOKUPS INTO 機械マスタ (03):
  日報入力 → 機械コード → fills: 加工単価, 型替単価, 機械単価, etc.
  製袋予定 → 機械コード → fills: 機械名

LOOKUPS INTO 受注入力 (04):
  売上入力 → 注番 → fills: 品名, 数量, 売上金額, 見積原価合計
  納品仕入 → 受注No → fills: 品名 (via 注番基本情報 reference table)

LOOKUPS INTO 在庫管理 (13):
  日報入力 → 名称_日報連携キー → fills: 在庫数, 原価 (in subtable)
```

---

---

## FIELD TYPE QUICK REFERENCE

```
Field Type        → What It Means in This System
─────────────────────────────────────────────────
SINGLE_LINE_TEXT  → Names, codes, keys, short text
MULTIPLE_LINE_TEXT→ Notes, memos, long descriptions
DECIMAL           → Amounts, quantities, IDs, rates
CALC              → Auto-computed — do not manually edit
DATE              → Calendar date (YYYY-MM-DD)
DATETIME          → Date + time (for scheduling)
TIME              → Time only (HH:MM)
SINGLE_SELECT     → One choice from dropdown
MULTIPLE_CHECK    → Multiple checkbox selections
SINGLE_CHECK      → Boolean yes/no checkbox
USER_SELECT       → Must be kintone system user
FILE              → Attached files (PDF, images)
LINK              → URL/phone/email as clickable link
GROUP             → Visual section divider
REFERENCE_TABLE   → Read-only view of linked records
STATUS            → Kintone workflow status
```

---

---

## COMMON PATTERNS ACROSS ALL APPS

### 1. Developer Field Group

```
Most apps have GROUP: 開発者用フィールド
Contains:
  - ID fields linking to other apps (FK relationships)
  - Update keys for cross-app sync
  - Internal calculation/helper fields

These should NEVER be visible to regular users.
Hide via: Field settings → Show/Hide per group settings
Or via JS: kintone.app.record.setFieldShown(fieldCode, false)
```

### 2. Dual Field Naming (表示用 / P / \_0 suffix)

```
Many fields come in pairs or triplets:
  注番        = actual data field (used in logic)
  注番(表示用) = formatted for Gantt chart display
  注番(P)     = formatted for print output
  注番_0      = second occurrence (AM/PM, or second record)

Always update ALL related fields when changing one.
```

### 3. Custom Search Views (検索特化)

```
Every app has: [appname](検索特化) — CUSTOM type view
These render: <div id='ribbit-smart-view-root'></div>
Plugin: likely Ribbit Smart View or equivalent
Provides: dropdown filters, date ranges, advanced search

If search is broken: check if the plugin is active and licensed
Do NOT modify the HTML in these views without plugin docs
```

### 4. CALC Field Dependencies

```
CALC fields can depend on other CALC fields:
  差引残高 (CALC) → 当月合計金額 (CALC) → 当月売掛残 (CALC)

Kintone evaluates in dependency order.
If CALC shows error: check if a dependency field has an issue.
If CALC shows wrong value: trace the chain from innermost CALC.
```

### 5. Plugin ID Reference

```
Plugin ID (first 8 chars)   → Likely Function
mkmpkkpebhgn                → Customine (automation engine)
fdeplpmkengk                → krewSheet (spreadsheet view)
mfbmhikklpgp                → Smart search/view plugin
jmopjjcibejd                → Lookup copy plugin
ffnppebjcckh                → Calendar view plugin
kdocighgmpgh                → Print/PDF plugin
ibgmgodgkjkc                → Barcode/QR or stock plugin
klgmladdiijf                → Gantt chart plugin (製袋予定専用)
amabcmdaaifoh               → Aggregate/rollup plugin
kcongfoeinpa                → krewSheet variant
fieanfmelmfc                → krewSheet variant
```

---

---

## JAVASCRIPT CUSTOMIZATION REFERENCE

### Getting/Setting Field Values

```javascript
// Get current record
const record = kintone.app.record.get().record;

// Read a field value
const supplierId = record.得意先ID.value;
const workDate = record.作業日.value;

// Set a field value
kintone.app.record.set({
  record: {
    得意先名: { value: "株式会社サンプル" },
    請求金額: { value: 10000 },
  },
});
```

### Subtable Operations

```javascript
// Read subtable rows
const rows = record.支払内容詳細.value;
rows.forEach((row) => {
  const amount = row.value.支払額.value;
  const supplier = row.value.仕入先.value;
  console.log(supplier, amount);
});

// Calculate subtable sum
const total = rows.reduce((sum, row) => {
  return sum + Number(row.value.支払額.value || 0);
}, 0);

// Add a new subtable row
record.発注明細.value.push({
  id: null,
  value: {
    商品名: { value: "テスト商品", type: "SINGLE_LINE_TEXT" },
    数量: { value: 5, type: "DECIMAL" },
    単価: { value: 1000, type: "DECIMAL" },
  },
});
```

### Common Event Triggers

```javascript
// On record open (edit mode)
kintone.events.on('app.record.edit.show', (event) => { ... });

// On record create
kintone.events.on('app.record.create.show', (event) => { ... });

// On field change
kintone.events.on('app.record.edit.change.得意先ID', (event) => { ... });

// On subtable row add
kintone.events.on('app.record.edit.change.支払内容詳細', (event) => { ... });

// Before save
kintone.events.on('app.record.edit.submit', (event) => {
  // Validation here
  // Return event to allow save
  // Set event.error to prevent save
  return event;
});
```

### Cross-App API Calls

```javascript
// Get record from another app
kintone
  .api("/k/v1/record", "GET", {
    app: SUPPLIER_APP_ID,
    id: record.得意先ID.value,
  })
  .then((resp) => {
    const supplierData = resp.record;
    // Use supplierData to fill fields
  });

// Search records in another app
kintone
  .api("/k/v1/records", "GET", {
    app: AR_APP_ID,
    query: `得意先ID = "${customerId}" and 年月 = "${yearMonth}"`,
    fields: ["当月売掛残", "売掛更新キー"],
  })
  .then((resp) => {
    const records = resp.records;
  });

// Update a record in another app
kintone.api("/k/v1/record", "PUT", {
  app: AR_APP_ID,
  id: targetRecordId,
  record: {
    当月入金額: { value: newPaymentAmount },
  },
});
```

---

---

## KNOWN ISSUES & RECOMMENDED FIXES — ALL 27 APPS

| #   | App          | Issue                                                    | Severity | Action                               |
| --- | ------------ | -------------------------------------------------------- | -------- | ------------------------------------ |
| 1   | 売掛管理     | 先々月一覧 hardcoded to 2025年06月                       | Medium   | Fix with JS or update monthly        |
| 2   | 買掛管理     | Same hardcoded filter bug                                | Medium   | Same fix                             |
| 3   | 納品書管理   | "Sample" view hardcoded May 2025 dates                   | Low      | Remove or convert to dynamic         |
| 4   | 運送請求     | 日付 is TEXT not DATE                                    | High     | Add DATE field + migration           |
| 5   | 申請管理     | カレンダーテスト view unlabeled as test                  | Low      | Rename or remove                     |
| 6   | 日報入力     | 48 subtable fields — navigation very difficult           | Medium   | Add JS section grouping              |
| 7   | 受注入力     | 139 fields + 4 subtables — extremely complex             | High     | Add JS tabs/sections for navigation  |
| 8   | All apps     | 開発者用フィールド must be hidden from users             | High     | Audit and verify visibility settings |
| 9   | 売掛(締日別) | 改修中 GROUP contains unstable fields                    | Medium   | Document and monitor                 |
| 10  | 在庫管理     | Manual edits to 在庫数 cause automation conflicts        | High     | Add warning/lock via JS              |
| 11  | アルコール   | AM/PM field naming (\_0 suffix) confusing                | Low      | Add field labels or hover help       |
| 12  | 請求書管理   | 締日別一覧 filters include 送付 condition — easy to miss | Medium   | Document for accounting staff        |
| 13  | 受注入力     | PDF保存 fields store URLs — links may expire             | Medium   | Verify PDF storage plugin behavior   |
| 14  | 全アプリ     | Plugin IDs not human-readable in template                | Low      | Map all plugin IDs to names          |

---

_Documentation COMPLETE — All 27 Kintone Apps Documented_
_Apps: 01-07, 08(新), 09-23(売掛/買掛), 23-2, 25_
_Total fields documented: 800+_
_Total subtable fields documented: 150+_
_Last updated: May 2026_

---

_Documentation covers all 27 kintone apps · Last updated: June 2026_
