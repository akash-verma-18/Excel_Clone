let topRow = document.querySelector(".top-row");
// shrtcut to appendChild
let str = "";
for(let i=0; i<26; i++){
    str += `<div class = 'col-head'>${String.fromCharCode(65+i)}</div>`;// first adding ASCII code of 'A'(65) and then converting it to a string.
}  
topRow.innerHTML = str;
let leftCol = document.querySelector(".left-col");
str = "";
for(let i=0; i<100; i++){
        str += `<div class = 'left-col-box'>${i+1}</div>`;
}
leftCol.innerHTML = str;
// 2-D Array
let grid = document.querySelector(".grid");
str = "";
for(let i=0; i<100; i++){
        str += `<div class = 'row'>`;
        for(let j=0; j<26; j++){
            str += `<div class = 'col' rid=${i} cid=${j} contenteditable="true"></div>`;
        }
        str += "</div>";
}
grid.innerHTML = str;

// initial load

 workSheetDB = []; // a database which will store the values entered in an entire sheet
 function initCurrentSheetDb(){
    let sheetDB = []; // a database which will store default properties of each cell
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cell = { // properties of a cell
                bold: false,
                italic: "false",
                underline: "false",
                fontFamily: "Arial",
                fontSize: "10",
                halign: "left",
                value:"" // this will store all the data entered in a sheet
            }
            row.push(cell);
        }
        sheetDB.push(row);
    }
    workSheetDB.push(sheetDB);
 }
 initCurrentSheetDb();
//  2 d Array-> styling prop
//  cell set 
