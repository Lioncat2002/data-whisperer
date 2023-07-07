function importCSVFromGoogleDrive(filename) {
    var file = DriveApp.getFilesByName(filename).next();
    var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
  }

function importCSVFromWeb() {
    // Provide the full URL of the CSV file.
    var csvUrl = 'https://files.catbox.moe/loqd7d.csv';
    var csvContent = UrlFetchApp.fetch(csvUrl).getContentText();
    var data = Utilities.parseCsv(csvContent);
  
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.insertRowsAfter(sheet.getLastRow(),data.length)
    sheet.getRange(1,1,data.slice(0,10).length,data[0].length).setValues(data.slice(0,10))
  }

  function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Whisper')
        .addItem('Open', 'showImportSidebar')
        .addToUi();
  }
  
  function showImportSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('src/template/Page')
        .setTitle('Data Whisperer');
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .showSidebar(html);
  }