function onFormSubmit(e) {
    var values = e.values; // フォームの回答を取得
    var stamp = values[0]; // タイムスタンプを取得
    var mail = values[1]; // メールアドレスを取得
    var representative_name = values[2]; // 代表者氏名を取得
    var contact_mail = values[3]; // 連絡用メールアドレスを取得
    var application_date = values[4]; // 申請日を取得
    var club_name = values[5]; // クラブサークル名を取得
    var start_date = values[6]; // 開始日を取得
    var start_time = values[7]; // 開始時刻を取得
    var end_date = values[8]; // 終了日を取得
    var end_time = values[9]; // 終了時刻を取得
    var participants_number = values[10]; // 参加人数を取得
    var participants = values[11]; // 参加者を取得
    var purpose = values[12]; // 利用目的を取得
    var place = values[13]; // 利用希望場所を取得
    var information = values[14]; // 利用の概要を取得
    var sale_image = values[15]; // 販売物の写真1を取得
    var sale_image2 = values[16]; // 販売物の写真2を取得
    var sale_image3 = values[17]; // 販売物の写真3を取得
    var memo = values[18]; // 備考を取得
  
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
  
    // カレンダーの設定とイベント作成
    let calendar = CalendarApp.getDefaultCalendar();
    let startDate = new Date(start_date + " " + start_time);
    let endDate = new Date(end_date + " " + end_time);
  
    // placeの情報を含むdescriptionを作成
    let description = information + '\n場所: ' + place;
  
    if (start_time === '' || end_time === '') {
      endDate.setDate(endDate.getDate() + 1);  
      event = calendar.createAllDayEvent('棚利用('+ place + ') - ' + club_name, startDate, endDate, {description: description});
    } else {
      event = calendar.createEvent('棚利用('+ place + ') - ' + club_name, startDate, endDate, {description: description});
    }
  
    // イベントの色を黄色に設定
    event.setColor('5');
  
    // フォルダ名をclub_name + start_dateにして、それをfolder_informationに格納
    var folder_information = club_name + '_' + start_date;
  
    // 新しいフォルダを作成する関数
    function createFolderInParent(parentFolderId, newFolderName) {
      var parentFolder = DriveApp.getFolderById(parentFolderId);
      var newFolder = parentFolder.createFolder(newFolderName);
      return newFolder.getId(); // フォルダIDを返す
    }
  
    // 親フォルダのIDを指定
    const parentFolderId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // ★親フォルダのIDを指定
    const newFolderId = createFolderInParent(parentFolderId, folder_information);
    const newFolder = DriveApp.getFolderById(newFolderId); // 新しいフォルダを取得
  
    // テンプレートドキュメントのIDを指定
    const templateDocId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // ★テンプレートドキュメントのIDを指定
    const templateDoc = DriveApp.getFileById(templateDocId);
    const newDoc = templateDoc.makeCopy('棚利用申込書(団体用) - ' + club_name, newFolder);
    const newDocId = newDoc.getId();
    const doc = DocumentApp.openById(newDocId);
    const body = doc.getBody();
  
    // ドキュメントの内容を置換
    body.replaceText('{{申請日}}', application_date);
    body.replaceText('{{クラブサークル名}}', club_name);
    body.replaceText('{{利用目的}}', purpose);
    body.replaceText('{{開始年月日}}', start_date);
    body.replaceText('{{開始時刻}}', start_time);
    body.replaceText('{{終了年月日}}', end_date);
    body.replaceText('{{終了時刻}}', end_time);
    body.replaceText('{{参加人数}}', participants_number);
    body.replaceText('{{参加者}}', participants);
    body.replaceText('{{利用の概要}}', information);
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
  
    // 新しく作成したドキュメントのURLを取得
    const newDocUrl = 'https://docs.google.com/document/d/' + newDocId;
  
    newDoc.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  
  
    // スプレッドシートのID
    const spreadsheetId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // ★ スプレッドシートのIDを指定
    
    // スプレッドシートにアクセス
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getActiveSheet();
    
    // 日付を操作するために、start_dateをDateオブジェクトに変換
    let startDay = new Date(start_date);
    let oneDaysBefore = new Date(startDay);
    let oneWeekBefore = new Date(startDay);
    
    // 一日前と一週間前の日付を計算
    oneDaysBefore.setDate(startDay.getDate() - 1);
    oneWeekBefore.setDate(startDay.getDate() - 7);
    
    // 日付を文字列にフォーマット (例: yyyy-mm-dd)
    function formatDate(date) {
      return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    
    let formattedStartDay = formatDate(startDay);
    let formattedOneDaysBefore = formatDate(oneDaysBefore);
    let formattedOneWeekBefore = formatDate(oneWeekBefore);
    
    // 新しい行にデータを書き込む
    sheet.appendRow([
      club_name,                    // 一列目：club_name
      formattedStartDay,            // 二列目：start_day
      start_time,                   // 三列目：start_time
      formattedOneDaysBefore,       // 四列目：start_dayの二日前の日付
      formattedOneWeekBefore,       // 五列目：start_dayの一週間前の日付
      newDocUrl,                    // 六列目：ドキュメントのURL
      contact_mail,                 // 七列目：contact_mail
      end_date,                     // 八列目：end_date
      representative_name           // 九列目：representative_name
    ]);
  
  
    // 一時的にスクリプトを停止
    Utilities.sleep(10000);
  
    // 作成したドキュメントをPDFに変換し、フォルダに格納
    const pdfBlob = DriveApp.getFileById(newDocId).getAs('application/pdf');
    const pdfFileName = '棚利用申込書(団体用) - ' + club_name + '.pdf';
    const pdfFile = newFolder.createFile(pdfBlob).setName(pdfFileName);
  
    // メール本文を生成
    const subject = '売店横の棚の利用に関して： ' + club_name;
    const emailBody = `【学校の担当の課の名前】
    ご担当者様 (cc: ${club_name} ${representative_name}さん)
  
    お世話になっております。福井県立大学 CSサークルです。
    
    この度、売店横に設置してあります、棚の利用申請をさせていただきたく、ご連絡いたしました。
  
    今回、利用を希望している団体は${club_name}です。（代表者: ${representative_name}さん）
  
    詳細につきましては、添付の資料をご確認いただけますと幸いです。
  
    また、ご不明点やご質問がございましたら、このメールへの返信にてお知らせください。CSサークルおよび${club_name}の代表である${representative_name}さんが対応させていただきます。
  
    よろしくお願いいたします。
  
    CSサークル`;
  
    MailApp.sendEmail({
      to: 'school@example', // 学校側のメールアドレスに変更
      cc: contact_mail,
      subject: subject,
      body: emailBody,
      attachments: [pdfFile] // ここでPDFファイルを添付
    });
  }