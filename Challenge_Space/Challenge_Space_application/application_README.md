# 施設運営「チャレンジスペース」申込書作成システム

## 目次

1. [概要](#概要)  
2. [目的](#目的)  
3. [主な機能](#主な機能)  
4. [設定](#設定)  
5. [主な関数](#主な関数)  
6. [ファイル構成](#ファイル構成)

---

## 概要

このスクリプトは、Googleフォームから送信された回答を基に、学生会館利用の申請プロセスを自動化するシステムである。ドキュメント作成、カレンダー登録、通知メールの送信などを効率的に行うことができる。

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 目的

1. 学生会館利用の申請業務を効率化し、作業時間を短縮する。  
2. 学生会館管理者およびサークル代表者への適切な情報共有を実現する。  
3. イベント準備や利用記録の透明性を高める。  

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 主な機能

1. **申請書の自動生成**  
   - Googleフォームの回答を基にテンプレートを編集し、申請書を自動生成する。  
   - 必要な項目（開始日、終了日、目的、参加人数など）を自動的に埋め込む。

2. **Googleカレンダーへのイベント登録**  
   - イベントの日時や概要をGoogleカレンダーに登録。  
   - イベントカラーを「緑」に設定し、視覚的に区別しやすくする。

3. **Googleドライブでのファイル管理**  
   - 生成されたドキュメントとPDFを新規フォルダに整理。  
   - フォルダ名は「サークル名_開始日」の形式で作成される。

4. **PDF変換とメール送信**  
   - 申請書をPDFに変換し、学生会館管理者およびサークル代表者に送信。  
   - 添付ファイルとしてPDFを含む。

5. **スプレッドシートへのデータ記録**  
   - 申請情報（サークル名、日程、代表者名、連絡先、リンクなど）を記録し、進捗を管理可能。  

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 設定

### 必要な環境

1. **Googleフォーム**  
   - 申請データを収集するためのフォーム。

2. **Googleドキュメントテンプレート**  
   - 申請書のテンプレートとして使用する。

3. **Googleカレンダー**  
   - イベントの日程と内容を登録する。

4. **Googleドライブ**  
   - 申請書やPDFを保存するフォルダを管理。  

### 設定箇所

1. **テンプレートドキュメントのID**
   ```javascript
   const templateDocId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   ```
   ここに[テンプレートドキュメント](applivation_docs.pdf)の内容を反映させたドキュメントIDを挿入


2. **親フォルダのID**
   ```javascript
   const parentFolderId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   ```

3. **送信先メールアドレス**
   ```javascript
   to: 'school@example';
   ```

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 主な関数

### 1. `onFormSubmit(e)`
- **目的**: Googleフォームの送信をトリガーとして、申請書作成と通知を行う。  
- **処理概要**:  
  1. フォーム回答データを取得し、各項目を変数に格納。  
  2. テンプレートドキュメントを編集し、ドキュメントを生成。  
  3. 編集後のドキュメントをPDFに変換し、Googleドライブに保存。  
  4. スプレッドシートに申請データを記録。  
  5. メールで申請書を送信。

---

### 2. `MailApp.sendEmail(options)`
- **目的**: メール通知を送信する。  
- **処理概要**:  
  1. 件名、本文、添付ファイルを指定。  
  2. 学生会館管理者とサークル代表者を含むメールを送信。

---

### 3. `createFolderInParent(parentFolderId, newFolderName)`
- **目的**: 指定された親フォルダ内に新しいフォルダを作成する。  
- **処理概要**:  
  - 親フォルダ内に「サークル名_開始日」という名前のフォルダを作成し、フォルダIDを返す。

---

### 4. `formatDate(date)`
- **目的**: 日付を指定されたフォーマット（`yyyy-MM-dd`）に変換する。  
- **処理概要**:  
  - `Utilities.formatDate` を利用して日付をフォーマット。

---

### 5. `Utilities.sleep(milliseconds)`
- **目的**: 処理間に一時停止を挟む。  
- **処理概要**:  
  - ファイルの保存や生成が完了するまでの待機時間を確保する。

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## ファイル構成

.

├── application_README.md                              # 本ファイル

├── [application.js](application.js)     # コード

├── [application_docs.pdf](application_docs.pdf)   # テンプレートドキュメント

└── [application_form.xlsx](application_form.xlsx)  # フォームの内容を反映させたスプレッドシート(出力の関係でExcelファイルになっている。本来はスプレッドシートのデータ)

---

<p align="right">(<a href="#top">トップへ</a>)</p>