/**
 * User input triggers the calculation of expenses
 * and displays the category totals into target cell
 * @param event object
 */
function sumExpenses(e) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let shExp = ss.getSheetByName('Expense');
  let rowsHeader = ss.getRangeByName("Header").getLastRow();
  let lastRow = shExp.getLastRow() - rowsHeader;
  let colCategory = ss.getRangeByName('Category')
    .getColumn();
  let colAmount = ss.getRangeByName('Amount')
    .getColumn();  
  Logger.log(colCategory);
  Logger.log(colAmount);
  let rangeCtgrs = shExp.getRange(rowsHeader + 1,colCategory,lastRow);
  let rangeAmnts = shExp.getRange(rowsHeader + 1,colAmount,lastRow);
  let valuesCtgrs = rangeCtgrs.getValues();
  let valuesAmnts = rangeAmnts.getValues();
  let categoriesObj = getCategories();
  
  
  if((SpreadsheetApp.getActive().getSheetName() === "Expense")){
    console.log('Expense Sheet');
    let ctgryCol = ss.getRangeByName('Category')
      .getColumn();
    let amntCol = ss.getRangeByName('Amount')
      .getColumn();
    let targetCell = shExp.getRange(10,1)
   

    //user edits target columns to trigger the event of summing the categories
    if(e.range.rowStart > rowsHeader && (e.range.columnStart === amntCol || e.range.columnStart === ctgryCol)){
      // Logger.log(JSON.stringify(getCategories()));
      //**May need to find the difference of namedRange positions instead of hardcoding row and col positions
      const KEYS = ss.getSheetByName("Categories")
        .getDataRange().getValues();
      
      // Logger.log(KEYS);
      for(key of KEYS){
        for(let i = 0; i < valuesAmnts.length; i++){
          if(valuesCtgrs[i][0] === key[0]){
            //if cell content is blank/undefined or isn't a number then add 0 to running sum
            if(!(valuesAmnts[i][0]) || isNaN(valuesAmnts[i][0])) {
              categoriesObj[key].sum += 0;
              }
            else{
                categoriesObj[key].sum += valuesAmnts[i][0];
              }           
          }
        }
      }
      //Put categories with sum > 0 in an array to be alphabetized:

      //1. Build category list
      let alphaArray = [];
      for(category in categoriesObj){
        // Logger.log(category)
        if(categoriesObj[category].sum > 0) alphaArray.push(category);
      }

      //2. Alphabetize category list
      alphaArray = alphaArray.sort();

      //create string to display in target cell
      let string = "";
      let total = 0;
      
      //3. Build category list string to paste into target cell
      for(i = 0; i< alphaArray.length; i++){
        //allow only two decimals places
        total = categoriesObj[alphaArray[i]].sum;
        total = total.toFixed(2);
        //build string
        string += `${alphaArray[i]}: $${total}\n`;
      }
      //set string of categories and corresponding totals into cell
      targetCell.setValue(string);
    }
  }else{
    console.log(SpreadsheetApp.getActive().getSheetName());
  }

}