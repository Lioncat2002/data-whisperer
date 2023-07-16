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

function changeDate(fmt){
  let ss=SpreadsheetApp.getActive();
  let sheet = ss.getActiveSheet();
  const range = sheet.getActiveRange();
  let values = range.getValues();
  //for (var i = 0; i < values.length; i++) {
  //  for (var j = 0; j < values[0].length; j++) {
  //      values[i][j]=new Date(values[i][j])  
  //  }
  //}
  //Sheets.Spreadsheets.Values.batchUpdate({registration_date:values},ss.getId())
  sheet.getActiveRange().setValues(values).setNumberFormat(fmt)
}

function findAllnReplace(data,newdata) {
  var sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  var values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[0].length; j++) {
      if (values[i][j] == data) {
        values[i][j]=newdata;
        //sheet.getActiveRange().getCell(i+1,j+1).setValue(newdata);
        sheet.getActiveRange().getCell(i+1,j+1).setBackground("red");
      }
    }
  }
  sheet.getActiveRange().setValues(values);
  //sheet.getActiveRange().setBackgrounds()
}


function importCSVFromGoogleDrive(data) {
  //var file = DriveApp.getFilesByName(filename).next();
  
  var csvData = Utilities.parseCsv(data);
  var ss=SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  //append data
  //using spread sheets api for zuper fast appending
  Sheets.Spreadsheets.Values.append({values:csvData},ss.getId(),sheet.getSheetName(),{valueInputOption: "USER_ENTERED"});
  
  return true;
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