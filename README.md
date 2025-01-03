# ポートフォリオ: キッチンカー利用申請・報告書自動化システム

## 目次

1. [概要](#概要)
2. [プロジェクトの背景](#プロジェクトの背景)
3. [実装した機能](#実装した機能)
4. [使用技術](#使用技術)
5. [ファイル構成](#ファイル構成)
6. [成果](#成果)
7. [プロジェクトにおける私の役割](#プロジェクトにおける私の役割)
8. [開発者情報](#開発者情報)

---

## 概要

本ポートフォリオは、サークルで貸し出している施設利用申し込み・受付のDX化を行った際のものである。従来の申込みの方法を見直し、Google Apps Scriptを用いて申込み受付を自動化した。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## プロジェクトの背景

私のサークルでは、大学が所有する設備や施設の利用申込み受付と、大学への申請・交渉を活動の一環としている。
このサークルは以下のような課題を抱えていた。

1. 申込み方法が分かりにくい
2. 申込みの受付や大学への施設利用申請のための書類作成に膨大な手間と時間がかかる

このシステムを構築したことで、サークルメンバーおよび施設利用者の負担軽減や学生と学校間でスムーズな情報共有が可能となり、申請から報告までの一連のプロセスの効率化に寄与した。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 実装した機能

### 1. **マニュアルの理解度テスト**
- 施設管理者と作成した施設利用に関するガイドラインの理解度チェックを実施
- 一定の点数かつガイドラインに沿った条件をクリアしている際に合格とし、二次審査用の資料を作成する

### 2. **申請プロセス自動化**
- Googleフォームの回答を基に、必要な情報を抽出。
- テンプレートドキュメントにフォームの任意の内容を置換。
- ドキュメントをPDF化
- PDFと文面を任意のメールアドレスに送信。

### 3. **通知機能**
- イベント開始前の任意の日付にリマインドメッセージを送信 (Slack・メール)
- イベント終了後に報告書作成用フォームを添付したメールを送信。

### 4. **報告書提出の効率化**
- 1と同様の処理を実行

### 4. **資料格納**
- 任意のドライブに利用者ごとの新しいファイルを作成し、その中に上記で作成した資料を格納

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 使用技術

- **Google Apps Script**
  - フォーム回答処理、ドキュメント生成、メール送信をスクリプトで自動化。
- **Slack API**
  - チームメンバーへの通知をスムーズに行う仕組みを構築。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## ファイル構成

.

├── README.md                              # 本ファイル

├── [Challenge_Space](Challenge_Space)     # 運営施設「チャレンジスペース」のシステム

├── [Kitchen_Car](Kitchen_Car)   # 運営施設「キッチンカー」のシステム

└── [Shelf](Shelf)  # 運営施設「棚」のシステム

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 成果

オンライン上で申込みを完結させ、申込み受付や施設利用にかかる申請書類の作成を自動化することで、利用者の利便性の向上とサークルメンバーの負担軽減に貢献した。具体的には、受付メールの自動送信、受付のリマインダー機能、申請書類の自動生成などだ。手作業で7工程必要だったものを1工程に縮めた。

また、開発の中で2つの工夫点がある。

1つ目はメンバーの情報リテラシー向上も併せて行うようにしたことだ。情報系に詳しくない学生が多かったため、彼らがシステムを問題なく運用できるよう講座を開いた。基本的なPCの機能説明をはじめ、利用しているソフトウェアの使い方やシステムの内容を説明した。これによりはじめはPC作業に抵抗があったメンバーも、システムの全容を理解し利用できるまでに至った。

2つ目は後輩への引継ぎも考えて作業したことだ。私の卒業後も後輩がシステムを利用できるよう、修正が不要なプログラムを書き、引継ぎの円滑化のため説明動画も作成した。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## プロジェクトにおける私の役割

- システム設計から実装までを一貫して担当。
- サークルメンバーや後輩が運用することを考え、運用サポートまで対応。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 開発者情報

- **名前**: 高﨑仁美
- **大学**: 福井県立大学
- **スキル**:
  - プログラミング：Python, Google Apps Script
  - イラスト
  - デザイン
  - 動画編集
- **実績**:
  - アクアスターイラストコンテスト受賞
  - 100program(東京大学が主催する開発コンペ) 優秀VR・AR賞受賞 
  - GCI (東京大学が主催するpythonデータサイエンス講座) 修了  
  - 大規模言語モデル講座(東京大学松尾研究室が主催するpythonLLM講座) 修了

---

<p align="right">(<a href="#top">トップへ</a>)</p>