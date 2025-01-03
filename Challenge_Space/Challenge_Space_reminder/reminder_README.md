# 施設運営「チャレンジスペース」リマインドシステム

## 目次

1. [概要](#概要)  
2. [目的](#目的)  
3. [主な機能](#主な機能)  
4. [設定](#設定)  
5. [主な関数](#主な関数)  
6. [ファイル構成](#ファイル構成)

---

## 概要

このスクリプトは、Googleスプレッドシートのデータを基に、Slackでのリマインド通知やメール送信を自動化するシステムである。イベントの日程に基づき、1日前・1週間前のタイミングで通知を送るとともに、イベント終了時にはフォーム記入依頼を行う。

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 目的

1. イベントの準備や進捗確認を効率化する。  
2. 関係者へのリマインド通知を自動化し、人的ミスを防ぐ。  
3. イベント終了後に必要な報告書作成の依頼を迅速かつ確実に行う。  

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 主な機能

1. **リマインド通知の自動送信**  
   - イベント予定日の1日前と1週間前にSlack通知を送信。  
   - メールを通じて関係者にリマインドを促す。

2. **Slackへの一括通知**  
   - スプレッドシートのデータを基にSlackに通知を一括送信する。  
   - 各イベントのリンクや代表者情報を含むメッセージを作成。

3. **フォーム記入依頼通知**  
   - イベント終了日当日に、結果報告フォームの記入を依頼するメールを自動送信。  

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 設定

### 必要な環境

1. **Googleスプレッドシート**  
   - イベント情報（サークル名、日程、担当者情報など）を記録する。  

2. **Slack Webhook**  
   - Slack通知の送信先を設定するためのWebhook URLを準備する。  

3. **Googleフォーム**  
   - イベント終了後の報告書記入用フォームを用意する。  

### 設定箇所

1. **Slack Webhook URL**
   ```javascript
   var slackWebhookUrl = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   ```

2. **フォームリンク**
   ```javascript
   フォームリンク：https://forms.gle/xxxxxxxxxxxxxxxxxxxxx
   ```

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## 主な関数

### 1. `postToSlack()`
- **目的**: イベントのリマインド通知をSlackで送信する。  
- **処理概要**:  
  1. スプレッドシートからイベント情報を取得。  
  2. イベント予定日の1日前と1週間前を比較し、該当するイベントに対して通知を送信。  
  3. Slackに通知メッセージを一括投稿。


### 2. `endEmail()`
- **目的**: イベント終了日にフォーム記入依頼のメールを送信する。  
- **処理概要**:  
  1. スプレッドシートから終了日情報を取得。  
  2. 終了日が今日の場合、該当の代表者にフォーム記入依頼をメールで送信。


### 3. `sendReminderEmail(email, subject, message, doc, representativeName, clubName)`
- **目的**: イベント準備に関するリマインドメールを送信する。  
- **処理概要**:  
  1. メール本文にイベント情報、準備状況確認リンクを含める。  
  2. 指定されたメールアドレスに通知を送信。


### 4. `sendFormEmail(email, clubName, representativeName)`
- **目的**: 結果報告フォームの記入を依頼するメールを送信する。  
- **処理概要**:  
  - イベント終了後に代表者へフォーム記入依頼メールを送信。


### 5. `postMessageToSlack(message)`
- **目的**: Slackに通知を投稿する。  
- **処理概要**:  
  - Webhook URLを通じてSlackにリマインドメッセージを送信。


### 6. `areDatesEqual(date1, date2)`
- **目的**: 2つの日付が同じかどうかを判定する。  
- **処理概要**:  
  - `toDateString` を用いて日付の一致を比較。

<p align="right">(<a href="#top">トップへ</a>)</p>
---

## ファイル構成

.

├── reminder_README.md                              # 本ファイル

├── [reminder.js](reminder.js)     # コード

└── [reminder_form.xlsx](reminder_form.xlsx)  # フォームの内容を反映させたスプレッドシート(出力の関係でExcelファイルになっている。本来はスプレッドシートのデータ)

---

<p align="right">(<a href="#top">トップへ</a>)</p>