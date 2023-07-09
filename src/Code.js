function findAll(data) {
  var sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[0].length; j++) {
      if (values[i][j] == data) {
        sheet.getActiveRange().getCell(i+1,j+1).setBackground("red");
      }
    }
  }
}

function changeDate(){
  var sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();
  var data = {
    "data":JSON.stringify(values),
    "query":"honk"
  };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var r=UrlFetchApp.fetch("https://datawhisperer.fly.dev/query",options)
  return r.getContentText()
}

function findAllnReplace(data,newdata) {
  var sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[0].length; j++) {
      if (values[i][j] == data) {
        sheet.getActiveRange().getCell(i+1,j+1).setValue(newdata);
        sheet.getActiveRange().getCell(i+1,j+1).setBackground("red");
      }
    }
  }
}


function importCSVFromGoogleDrive(filename) {
  var file = DriveApp.getFilesByName(filename).next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var ss=SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  //append data
  //using spread sheets api for zuper fast appending
  Sheets.Spreadsheets.Values.append({values:csvData},ss.getId(),sheet.getSheetName(),{valueInputOption: "USER_ENTERED"});
 
}

function importCSVFromWeb(url) {
  // Provide the full URL of the CSV file.
  var csvUrl = 'https://files.catbox.moe/loqd7d.csv';
  var csvContent = UrlFetchApp.fetch(url).getContentText();
  var data = Utilities.parseCsv(csvContent);

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.insertRowsAfter(sheet.getLastRow(), data.length)
  sheet.getRange(1, 1, data.slice(0, 10).length, data[0].length).setValues(data.slice(0, 10))
}

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('Whisper')
    .addItem('Open Whisperer 🚀', 'showImportSidebar')
    .addToUi();
}

function showImportSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('src/template/Page')
    .setTitle('Data Whisperer');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}