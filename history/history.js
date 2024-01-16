const ss = SpreadsheetApp.getActiveSpreadsheet();

const ladderSpreadsheet = SpreadsheetApp.openById("19coe2c8jZs9nRZ1NaLvKx_xSRGWnDs8zgK2q-M7JwKE");
const ladderSheet = ladderSpreadsheet.getSheetByName("Ladder");

function getTodayDateString() {
  const [month, day, year] = new Date().toLocaleDateString("en-US", { timeZone: "MST" }).split("/");
  const today = [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  return today;
}

function executeTodayJob() {
  const today = getTodayDateString();
  const todaySheet = ss.getSheetByName(today);
  if (todaySheet) ss.deleteSheet(todaySheet);

  const sheet = ladderSheet.copyTo(ss);
  sheet.setName(today);
}
