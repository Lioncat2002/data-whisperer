function findAll(data) {
  var sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[0].length; j++) {
      if (values[i][j] == data) {
        //sheet.getActiveRange().getCell(i+1,j+1).setValue(newdata);
        sheet.getActiveRange().getCell(i+1,j+1).setBackground("red");
        //sheet.getRange(i+1,j+1).setValue(newdata);
        //sheet.getRange(i + 1, j + 1).setBackground("red");
      }
    }
  }
}

function changeDate(){
  var sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[0].length; j++) {
      
        sheet.getActiveRange().setBackground("red")
      
    }
  }
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
        //sheet.getRange(i+1,j+1).setValue(newdata);
        //sheet.getRange(i + 1, j + 1).setBackground("red");
      }
    }
  }
}


function importCSVFromGoogleDrive(filename) {
  var file = DriveApp.getFilesByName(filename).next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = sheet.getDataRange().getValues();
  //some blek magic to get the length since length in google sheets start from 1
  //needed for appending data
  var length = startRow.length > 1 ? startRow.length + 1 : 1;
  //append data
  sheet.getRange(length, 1, csvData.length, csvData[0].length).setValues(csvData);
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