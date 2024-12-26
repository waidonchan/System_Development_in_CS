function onFormSubmit(e) {
    var values = e.values;
    var score = parseInt(values[2]); // 点数を取得
    var responsible = values[7]; // 食品衛生責任者を取得
    var quiz = values[49]; // ひっかけクイズを取得
    var mail = values[1]; // メールアドレスを取得
    var club_name = values[48]; // サークル名を取得
    var row = e.range.getRow(); // 行番号を取得
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
    // 条件分岐の処理
    if (score === 33 && responsible === "はい" && quiz === "") {
      // ★ 33点満点、responsibleが「はい」、quizが空欄の場合：元の処理を実行
      executeOriginalProcess(values);
  
    } else if (score === 33 && responsible === "はい" && quiz === "読みました。") {
      // ★ 33点満点、responsibleが「はい」、quizが「読みました。」の場合：行の色をグレーにし、不合格通知をメールで送信
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground('gray');
      sendMail(mail, "不合格通知", generateRejectionMessage("quiz_failed", club_name));
  
    } else if (score === 33 && responsible === "いいえ") {
      // ★ 33点満点、responsibleが「いいえ」の場合：行の色をグレーにし、不合格通知をメールで送信
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground('gray');
      sendMail(mail, "不合格通知", generateRejectionMessage("no_responsible", club_name));
  
    } else if (score < 33 && responsible === "はい") {
      // ★ 33点未満、responsibleが「はい」の場合：行の色をグレーにし、不合格通知をメールで送信
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground('gray');
      sendMail(mail, "不合格通知", generateRejectionMessage("low_score", club_name));
  
    } else if (score < 33 && responsible === "いいえ") {
      // ★ 33点未満、responsibleが「いいえ」の場合：行の色をグレーにし、不合格通知をメールで送信
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground('gray');
      sendMail(mail, "不合格通知", generateRejectionMessage("low_score_no_responsible", club_name));
    }
  }
  
  // 元の処理を実行する関数
  function executeOriginalProcess(values) {
    var stamp = values[0]; // タイムスタンプを取得
    var mail = values[1]; // メールアドレスを取得
    var score = values[2]; // 点数を取得
    var faculty = values[3]; // 学部を取得
    var department = values[4]; // 学科を取得
    var grade = values[5]; // 学年を取得
    var name = values[6]; // 名前を取得
    var responsible = values[7]; // 食品衛生責任者を取得
    var purpose = values[8]; // 目的を取得
    var hygiene = values[9]; // 衛生管理を取得
    var start_day = values[10]; // 出店日を取得
    var befor_preparation = values[11]; // 前日準備を取得
    var sale_image = values[12]; // 販売物の写真を取得
    var information = values[13]; // 販売物の情報を取得
    var memo = values[47]; // 備考を取得
    var club_name = values[48]; // サークル名を取得
    var quiz = values[49]; // ひっかけクイズを取得
    var sale_image2 = values[50]; // 販売物の写真2を取得
    var sale_image3 = values[51]; // 販売物の写真3を取得
    
  
    // 写真を挿入
    sale_image = sale_image.replace('https://drive.google.com/open?id=', '');
    let attachImg = DriveApp.getFileById(sale_image).getBlob();
  
    if (sale_image2) {
      sale_image2 = sale_image2.replace('https://drive.google.com/open?id=', '');
      var attachImg2 = DriveApp.getFileById(sale_image2).getBlob();
    }
  
    if (sale_image3) {
      sale_image3 = sale_image3.replace('https://drive.google.com/open?id=', '');
      var attachImg3 = DriveApp.getFileById(sale_image3).getBlob();
    }
  
    // テンプレートドキュメントのIDを指定
    const templateDocId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';  // ★テンプレートドキュメントのIDを記載
    const templateDoc = DriveApp.getFileById(templateDocId);
    const newDoc = templateDoc.makeCopy('一次選考合格者 - ' + club_name);
    const newDocId = newDoc.getId();
    const doc = DocumentApp.openById(newDocId);
    const body = doc.getBody();
  
    // ドキュメントの内容を置換
    body.replaceText('{{点数}}', score);
    body.replaceText('{{クラブサークル名}}', club_name);
    body.replaceText('{{学部}}', faculty);
    body.replaceText('{{学科}}', department);
    body.replaceText('{{学年}}', grade);
    body.replaceText('{{名前}}', name);
    body.replaceText('{{メールアドレス}}', mail);
    body.replaceText('{{食品衛生責任者}}', responsible);
    body.replaceText('{{目的}}', purpose);
    body.replaceText('{{衛生管理}}', hygiene);
    body.replaceText('{{出店日}}', start_day);
    body.replaceText('{{前日準備}}', befor_preparation);
    body.replaceText('{{販売物情報}}', information);
    body.replaceText('{{備考}}', memo);
  
    // 画像の縦横比を取得
    let res = ImgApp.getSize(attachImg);
    let width = res.width;
    let height = res.height;
    // 画像を横300pxでアスペクト比を揃えて大きさを編集し最終行へ挿入
    body.appendImage(attachImg).setWidth(300).setHeight(300 * height / width);
  
    // 2枚目の画像が存在する場合、挿入
    if (attachImg2) {
      let res2 = ImgApp.getSize(attachImg2);
      let width2 = res2.width;
      let height2 = res2.height;
      body.appendImage(attachImg2).setWidth(300).setHeight(300 * height2 / width2);
    }
  
    // 3枚目の画像が存在する場合、挿入
    if (attachImg3) {
      let res3 = ImgApp.getSize(attachImg3);
      let width3 = res3.width;
      let height3 = res3.height;
      body.appendImage(attachImg3).setWidth(300).setHeight(300 * height3 / width3);
    }
  
    // ドキュメントを保存して閉じる
    doc.saveAndClose();
  
    // 生成されたドキュメントを指定フォルダに移動
    const destinationFolderId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // ★ドライブのフォルダIDを記載
    const destinationFolder = DriveApp.getFolderById(destinationFolderId);
    DriveApp.getFileById(newDocId).moveTo(destinationFolder);
  
    // 新しく作成したドキュメントのURLを取得
    const newDocUrl = 'https://docs.google.com/document/d/' + newDocId;
  
    // ドキュメントの共有設定
    DriveApp.getFileById(newDocId).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  
    // Slack通知メッセージの作成
    var message = "ニュース：" + club_name + "さんがキッチンカーの一次選考に合格しました！以下のURLから情報を確認し、合格通知または不合格通知を出しましょう！\n詳細はこちら：" + newDocUrl;
  
    // Slackに通知を送信
    postMessageToSlack(message);
  
    // 一時的にスクリプトを停止
    Utilities.sleep(10000);
  }
  
  // メール送信を行う関数
  function sendMail(to, subject, body) {
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: body
    });
  }
  
  // 条件に応じたメールの本文を生成
  function generateRejectionMessage(caseType, club_name) {
    var greeting = club_name + "様\n\n";
    
    switch (caseType) {
      case "quiz_failed":
        return greeting + "この度は仮申請に記入いただき、誠にありがとうございます。\n\n" +
               "残念ながら、選考の結果不合格となりました。\n" +
               "再挑戦を希望される場合は、問題文をよくお読みのうえ、再度ご応募いただけますと幸いです。\n\n" +
               "どうぞよろしくお願いいたします\n\n" +
               "CSサークル";
  
      case "no_responsible":
        return greeting + "この度は仮申請に記入いただき、誠にありがとうございます。\n\n" +
               "残念ながら、食品衛生責任者の資格をお持ちでないため、選考の結果不合格となりました。\n" +
               "資格を取得された後、再度ご応募いただけますと幸いです。\n\n" +
               "どうぞよろしくお願いいたします\n\n" +
               "CSサークル";
  
      case "low_score":
        return greeting + "この度は仮申請に記入いただき、誠にありがとうございます。\n\n" +
               "残念ながら、得点が基準に達していないため、選考の結果不合格となりました。\n" +
               "再挑戦を希望される場合は、マニュアルなどを参考にし、再度ご応募いただけますと幸いです。\n\n" +
               "どうぞよろしくお願いいたします\n\n" +
               "CSサークル";
  
      case "low_score_no_responsible":
        return greeting + "この度は仮申請に記入いただき、誠にありがとうございます。\n\n" +
               "食品衛生責任者の資格をお持ちでないこと、また得点が基準に達していないことを考慮した結果、残念ながら不合格となりました。\n" +
               "資格を取得し、マニュアルなどをよくお読みの上、再挑戦していただけますと幸いです。\n\n" +
               "どうぞよろしくお願いいたします\n\n" +
               "CSサークル";
  
      default:
        return "";
    }
  }
  
  // Slack通知を送る関数
  function postMessageToSlack(message) {
    var slackWebhookUrl = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // ★SlackのWebhook URL
  
    var payload = {
      "text": message,
      'icon_emoji' : ':memo:',
      "username" : "一次選考合格者発表bot"
    };
  
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };
    
    UrlFetchApp.fetch(slackWebhookUrl, options);
  }
  