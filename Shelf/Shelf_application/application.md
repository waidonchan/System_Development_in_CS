# 施設運営「棚」申込書作成システム

---

## 目次
1. [概要](#概要)  
2. [目的](#目的)  
3. [主な機能](#主な機能)  
4. [設定](#設定)  
5. [主な関数](#主な関数)  
6. [ファイル構成](#ファイル構成)  


---

## 概要
このGoogle Apps Scriptは、Googleフォームを通じて送信されたデータをもとに、棚利用申込書を自動生成し、Googleドライブに保存、PDF形式に変換して関係者にメール送信するためのシステムである。さらに、Googleカレンダーに予定を登録することで、効率的なイベント管理を支援する。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 目的
- 棚利用申込書作成の効率化とデジタル化を実現する。
- 申請データに基づく自動的なファイル生成、保存、送信を行う。
- 予定管理を簡素化し、関係者間のスムーズな連携を可能にする。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 主な機能
1. **ドキュメント生成**  
   - テンプレートドキュメントを基に、申請データを反映した棚利用申込書を作成。  

2. **Googleドライブ連携**  
   - 生成されたドキュメントとPDFを専用フォルダに自動保存。  

3. **Googleカレンダー連携**  
   - カレンダーに利用予定を登録し、利用場所を含めた説明を記載。

4. **通知メール送信**  
   - 作成されたPDFを添付し、関係者にメール送信。

5. **スプレッドシート更新**  
   - スプレッドシートに申請内容を記録し、リマインドデータを追加。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 設定
### 必要な環境
1. Googleフォーム: 申請データの収集。  
2. Googleドキュメント: テンプレートとして棚利用申込書を設定。  
3. Googleドライブ: 生成されたドキュメントとPDFを保存。  
4. Googleカレンダー: イベント情報を記録。  

### 設定箇所
- **テンプレートドキュメントID**
  ```javascript
  const templateDocId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  ```
  ここに[テンプレートドキュメント](applivation_docs.pdf)の内容を反映させたドキュメントIDを挿入

- **親フォルダID**
  ```javascript
  const parentFolderId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  ```
- **スプレッドシートID**
  ```javascript
  const spreadsheetId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  ```
  ここに[リマインド](application_form.xlsx)の内容を反映させたスプレッドシートIDを挿入

- **送信先メールアドレス**
  ```javascript
  to: 'school@example';
  ```

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 主な関数

### 1. `onFormSubmit(e)`
- **目的**: フォーム送信時に呼び出され、以下の一連の処理を実行。  
  1. フォームの回答データを取得し、変数に格納。  
  2. テンプレートドキュメントをコピーして申請内容を反映。  
  3. Googleドライブに保存し、PDFに変換。  
  4. Googleカレンダーに予定を登録。  
  5. 関係者にメール送信し、スプレッドシートを更新。

### 2. `createFolderInParent(parentFolderId, newFolderName)`
- **目的**: 新しいフォルダを指定の親フォルダ内に作成し、そのフォルダIDを返す。  

### 3. `formatDate(date)`
- **目的**: 日付を`yyyy-mm-dd`形式の文字列に変換する。

### 4. `MailApp.sendEmail(options)`
- **目的**: 関係者に通知メールを送信する。  
- **処理**: PDFを添付し、申請内容の概要を記載したメールを送信。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## ファイル構成

.

├── application_README.md                              # 本ファイル

├── [application.js](application.js)     # コード

├── [application_docs.pdf](application_docs.pdf)   # テンプレートドキュメント

└── [application_form.xlsx](application_form.xlsx)  # フォームの内容を反映させたスプレッドシート(出力の関係でExcelファイルになっている。本来はスプレッドシートのデータ)

<p align="right">(<a href="#top">トップへ</a>)</p>
