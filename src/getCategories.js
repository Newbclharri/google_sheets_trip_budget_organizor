/**
 * Returns the list of categories from the specifed sheet
 * @returns {Object} categoriesObj
 */
function getCategories() {
  //1. Put categories into a 2D array

  let ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("Categories");
  let range = sh.getDataRange();
  let categoriesArry = range.getValues(); //2D array of source sheet

  /*2. Build an object with key value pairs as follows
  * category: let sum = 0;
  */

  let categoriesObj = {};

  for (category of categoriesArry){
    categoriesObj[category[0]] = {};
    categoriesObj[category[0]].sum = 0;
  
  }
  // for(key in categoriesObj){
  //   console.log(key,":", categoriesObj[key].sum)
  // }
  // console.log(JSON.stringify(categoriesObj))
  return categoriesObj;
}
