# 施設運営「キッチンカー」仮申請システム

## 目次

1. [概要](#概要)
2. [目的](#目的)
3. [主な機能](#主な機能)
4. [設定](#設定)
5. [スクリプトの主な関数](#スクリプトの主な機能)
6. [ファイル構成](#ファイル構成)
7. [イメージ](#イメージ)

---

## 概要
 
本スクリプトはサークルが運営している施設「キッチンカー」の仮申請自動化システムに関して記したものである。

キッチンカーを利用するには、利用者へ施設の貸し出しが可能かを確認する「仮申請」と学校側へ提出する資料などを作成する「本申請」の二段階の申請が必要である。ここでは一段階目の「仮申請」に関して記載する。(本申請に関しては[こちら](/Kitchen_Car/Kitchen_Car_application/application_README.md))

さらに仮申請では、プログラムによって施設利用が可能かを判断する「一次審査」と、サークルメンバーが手作業で判断する「二次審査」を行う。このシステムでは「一次審査」と「二次審査」のための資料作りを行うコードが組み込まれている。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 目的

1. **選考処理の効率化**  
   - 利用基準に満たない人を選別することで、二次選考の負担を軽減する

2. **合格者ドキュメントの自動生成**  
   - 二次審査のさらなる負担の軽減のために一次選考合格者情報をまとめたドキュメントを自動生成する

3. **通知**  
   - Slackと連携させ、一次選考合格者の情報を即座にサークルメンバーに通知


<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 主な機能

### 1. フォーム送信時の自動処理

Googleフォームの回答が送信された際に、以下の条件で処理を行う。

| **条件**                             | **アクション**                                                                                   |
|--------------------------------------|-------------------------------------------------------------------------------------------------|
| 33点満点 & 食品衛生責任者がいますか「はい」& クイズ空欄 | 合格通知: ドキュメント生成・Slack通知                                                    |
| 33点満点 & 食品衛生責任者がいますか「はい」& クイズ回答 | 不合格通知: 行をグレーにし、メールで不合格通知                                                    |
| 33点満点 & 食品衛生責任者がいますか「いいえ」          | 不合格通知: 行をグレーにし、メールで不合格通知                                                    |
| 33点未満 & 食品衛生責任者がいますか「はい」            | 不合格通知: 行をグレーにし、メールで不合格通知                                                    |
| 33点未満 & 食品衛生責任者がいますか「いいえ」          | 不合格通知: 行をグレーにし、メールで不合格通知                                                    |

### 2. 一次選考合格者の情報をまとめたドキュメントの生成

- **ドキュメント内容のカスタマイズ**  
   フォームの回答をドキュメントのテンプレート(テンプレートの例は[こちら](/Kitchen_Car/Kitchen_Car_provisional_application/provisional_application_docs.pdf))に埋め込み、Googleドライブに保存

- **販売物の写真挿入**  
   フォームからアップロードされた販売物の写真をドキュメントに自動挿入します。

- **Slack通知**  
   生成されたドキュメントのリンクをSlackで通知

### 3. 不合格通知のメール送信

条件に応じて適切な内容のメールを自動で送信します：

- クイズ未回答
- 責任者資格なし
- 点数不足 など


<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 設定

1. **Googleフォーム**  
   - Googleスプレッドシートにリンクさせ、解答を集計できるような状態にしておく(今回のスクリプトに適用させたスプレッドシートの例は[こちら](/Kitchen_Car/Kitchen_Car_provisional_application/provisional_application_form.xlsx))

2. **Google Apps Script**  
   - フォーム送信時にこのスクリプトが実行されるよう、`トリガー`を設定。今回は`onFormSubmit(e)`がフォームの送信時に発火するように設定

3. **Slack Webhook URL**  
   - `postMessageToSlack`関数内の `slackWebhookUrl` に、SlackのIncoming Webhook URLを格納

4. **テンプレートドキュメント**  
   - 合格者通知のためのGoogleドキュメントテンプレートを作成し、そのIDを設定

5. **Googleドライブフォルダ**  
   - 生成されるドキュメントを格納するフォルダIDを指定

6. **外部ライブラリの追加**
    今回は以下のライブラリをimport追加した
   - ImgApp : `1T03nYHRho6XMWYcaumClcWr6ble65mAT8OLJqRFJ5lukPVogAN2NDl-y`
    - SlackApp : `1on93YOYfSmV92R5q59NpKmsyWIQD8qnoLYk-gkQBI92C58SPyA2x1-bq`


<p align="right">(<a href="#top">トップへ</a>)</p>

---

## スクリプトの主な関数

- `onFormSubmit(e)`  
  フォーム送信時にデータを取得し、条件に応じた処理を実行

- `executeOriginalProcess(values)`  
  合格者向けドキュメントを生成し、Slackに通知

- `sendMail(to, subject, body)`  
  指定したメールアドレスへメールを送信

- `generateRejectionMessage(caseType, club_name)`  
  不合格通知の内容を条件に応じて生成

- `postMessageToSlack(message)`  
  SlackのIncoming Webhookを利用してメッセージを送信


<p align="right">(<a href="#top">トップへ</a>)</p>

---
## ファイル構成

.

├── provisional_application_README.md                              # 本ファイル

├── [provisional_application.jp](provisional_application.jp)     # コード

├── [provisional_application_docs.pdf](provisional_application_docs.pdf)   # テンプレートドキュメント

└── [provisional_application_form.xlsx](provisional_application_form.xlsx)  # フォームの内容を反映させたスプレッドシート(出力の関係でExcelファイルになっている。本来はスプレッドシートのデータ)

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## イメージ

- **Slack通知イメージ**: 準備中
- **デモ動画**: 準備中

---

<p align="right">(<a href="#top">トップへ</a>)</p>