# 施設運営「チャレンジスペース」報告書作成システム

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
このGoogle Apps Scriptは、学生会館横の棚利用に関する予定や報告のリマインダーシステムを提供する。利用予定日が近づいた際にSlackやメールで通知を行い、イベント終了後には報告用フォームの記入依頼を自動送信する。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 目的
- 利用者と管理者間のスムーズなコミュニケーションを支援する。
- リマインダー通知の自動化により、忘れやミスを減少させる。
- イベント終了後の報告業務を効率化し、確実なフォローアップを実現する。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 主な機能
1. **利用予定日のリマインダー通知**  
   - 棚利用予定日の1日前および1週間前にSlackとメールでリマインダー通知を送信する。  

2. **イベント終了後のフォーム記入依頼**  
   - 利用終了日に報告用フォームの記入依頼メールを自動送信する。  

3. **Slackへのタスク通知**  
   - リマインダー内容をSlackに投稿し、関係者全員で共有できるようにする。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 設定
### 必要な環境
1. **Googleスプレッドシート**  
   - 申請データやリマインダー情報を管理する。  
2. **Slack Webhook URL**  
   - リマインダー通知を投稿するために必要。  

### 設定箇所
- **Slack Webhook URL**
  ```javascript
  var slackWebhookUrl = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; 
  ```
- **フォームリンク**
  ```javascript
  var body = `
  フォームリンク：https://forms.gle/xxxxxxxxxxxxxxxxxxxxxxxx
  `;
  ```

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 主な関数

### 1. `postToSlack()`
- **目的**: Slackにリマインダー通知を投稿する。  
- **機能**:
  - スプレッドシートから予定データを取得。
  - 利用予定日の1日前と1週間前に該当するデータを抽出。
  - Slackとメールに通知を送信。

### 2. `endEmail()`
- **目的**: 利用終了日に報告用フォームの記入依頼メールを送信する。  
- **機能**:
  - スプレッドシートから終了日データを取得。
  - 本日が終了日に該当する場合、メールを送信。

### 3. `sendFormEmail(email, clubName, representativeName)`
- **目的**: 利用終了後に報告フォームの記入依頼メールを送信する。  
- **引数**:
  - `email`: 送信先メールアドレス。
  - `clubName`: クラブサークル名。
  - `representativeName`: 代表者の氏名。

### 4. `areDatesEqual(date1, date2)`
- **目的**: 2つの日付が一致しているかを確認する。  
- **戻り値**: `true` または `false`。

### 5. `postMessageToSlack(message)`
- **目的**: 指定されたメッセージをSlackに投稿する。  
- **引数**:
  - `message`: 投稿する内容。

### 6. `sendReminderEmail(email, subject, message, doc, representativeName, clubName)`
- **目的**: 利用予定日前のリマインダーをメールで送信する。  
- **引数**:
  - `email`: 送信先メールアドレス。
  - `subject`: メールの件名。
  - `message`: メールの本文。
  - `doc`: 申請書類のリンク。
  - `representativeName`: 代表者の氏名。
  - `clubName`: クラブサークル名。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## ファイル構成

.

├── reminder_README.md                              # 本ファイル

├── [reminder.js](reminder.js)     # コード

└── [reminder_form.xlsx](reminder_form.xlsx)  # フォームの内容を反映させたスプレッドシート(出力の関係でExcelファイルになっている。本来はスプレッドシートのデータ)

<p align="right">(<a href="#top">トップへ</a>)</p>
