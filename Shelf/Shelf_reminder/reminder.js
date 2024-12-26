function postToSlack() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1"); 
    var today = new Date(); 
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues(); 
    var messages = [];
  
    data.forEach(function (row) {
      var clubName = row[0];           // 一列目：club_name
      var startDayStr = row[1];        // 二列目：start_day (文字列)
      var startTime = row[2];          // 三列目：start_time
      var oneDaysBeforeStr = row[3];   // 四列目：start_dayの一日前の日付 (文字列)
      var oneWeekBeforeStr = row[4];   // 五列目：start_dayの一週間前の日付 (文字列)
      var doc = row[5];                // 六列目：ドキュメント
      var email = row[6];              // 七列目：メールアドレス
      var representativeName = row[8]; // 九列目：代表者の氏名
  
      // 文字列をDateオブジェクトに変換
      var startDay = new Date(startDayStr);
      var oneDaysBefore = new Date(oneDaysBeforeStr);
      var oneWeekBefore = new Date(oneWeekBeforeStr);
  
      // 一日前の通知
      if (areDatesEqual(oneDaysBefore, today)) {
        var message = "リマインド：" + clubName + "の棚の利用予定日まであと一日です！！日程を再確認しましょう！\n詳細はこちら：" + doc;
        messages.push(message);
        sendReminderEmail(email, "リマインド：学生会館横 棚利用予定日（1日前）", message, doc, representativeName, clubName);
      }
  
      // 一週間前の通知
      if (areDatesEqual(oneWeekBefore, today)) {
        var message = "リマインド：" + clubName + "の棚の利用予定日まであと一週間です！日程を確認しましょう！\n詳細はこちら：" + doc;
        messages.push(message);
        sendReminderEmail(email, "リマインド：学生会館横 棚利用予定日（一週間前）", message, doc, representativeName, clubName);
      }
  
    });
  
    if (messages.length > 0) {
      var slackMessage = "以下のタスクの通知があります。\n" + messages.join("\n");  
      postMessageToSlack(slackMessage);
    }
  }
  
  function endEmail() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1"); 
    var today = new Date(); 
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues(); 
  
    data.forEach(function (row) {
      var clubName = row[0];           // 一列目：club_name
      var email = row[6];              // 七列目：メールアドレス
      var endDay = row[7];          // 八列目：end_day (文字列)
      var representativeName = row[8]; // 九列目：代表者の氏名
  
      // endDayの通知
      if (areDatesEqual(endDay, today)) {
        sendFormEmail(email, clubName, representativeName);  // フォーム記入依頼のメールを送信
      }
    });
  }
  
  function sendFormEmail(email, clubName, representativeName) {
    var body = `
  ${clubName}
  ${representativeName}さん
  
  こんにちは、CSサークルです。
  
  イベントお疲れさまでした。
  
  今回のイベントの結果を学校側に報告するため、以下のフォームへの記入をお願いします。
  
  フォームリンク：https://forms.gle/xxxxxxxxxxxxxxxxxxxxxx
  
  このフォームに記載すると、自動的にドキュメントが生成され、書類が提出されます。
  
  ご質問や不明点がございましたら、いつでもご連絡ください。
  
  よろしくお願いいたします。
  
  CSサークル
    `;
  
    MailApp.sendEmail({
      to: email,
      subject: "【重要】提出書類作成用フォームへの記入のお願い",
      body: body
    });
  }
  
  function areDatesEqual(date1, date2) {
    return (
      date1.toDateString() === date2.toDateString()
    );
  }
  
  function postMessageToSlack(message) {
    var slackWebhookUrl = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // ★SlackのWebhook URLを設定
  
    var payload = {
      "text": message,
      'icon_emoji' : ':star2:',
      "username" : "通知bot"
    };
  
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };
    
    UrlFetchApp.fetch(slackWebhookUrl, options);
  }
  
  function sendReminderEmail(email, subject, message, doc, representativeName, clubName) {
    var body = `
  ${clubName}
  ${representativeName}さん
  
  こんにちは、CSサークルです。
  
  ${clubName}の学生会館横の棚の利用予定日が近づいております。あと少しで当日となりますね。 準備や確認事項がありましたら、ぜひこの機会にご確認ください。
  
  こちらのリンクから、学校に提出された書類を確認することができます： ${doc}
  
  ご質問がある場合は、お気軽にお尋ねください。
  
  当日が楽しいイベントとなりますことを願っております。
  
  何卒よろしくお願い申し上げます。
  
  CSサークル
    `;
  
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
  }
  