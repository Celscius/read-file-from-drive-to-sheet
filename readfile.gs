/*
  https://developers.google.com/apps-script/reference/drive/file
  api
  - getId()
  - getName()
  - getOwner()
  - getDateCreated()
  - getLastUpdated()
  - getThumbnail()
  - getUrl()
  - getDownloadUrl()
  - getEditors()
  - getDescription()

  why error on using custom function permission?
  https://support.google.com/docs/thread/179629253/i-don-t-have-the-permission-to-run-my-custom-function-in-spreadsheets?hl=en
*/
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('files')
    .addItem('Files', 'myfile')
    .addToUi();
}

function myfile() {
  const type = "application/vnd.google-apps.spreadsheet"
  const folderid = "1H9juuPtM5ulJV__DQ38H1cpqBi39N-ZN"
  const sheet = SpreadsheetApp.getActive().getSheetByName('Sheet1')

  const folder = DriveApp.getFolderById(folderid);
  const files = folder.getFiles();
  const data = [];

  while (files.hasNext()) {
    const file = files.next();
    const email = Session.getActiveUser().getEmail();
    //file.getOwner() ? '' : file.setOwner(email);
    file.getDescription() ? '' : file.setDescription("myapp");
    if(type == file.getMimeType()){
      data.push([
        file.getId(),
        file.getName(),
        file.getOwner().getName(),
        file.getDateCreated(),
        file.getLastUpdated(),
        file.getMimeType(),
        file.getDescription(),
        file.getUrl()
      ])
    } 
  }
  sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
}
