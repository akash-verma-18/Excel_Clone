let addbtnContainer = document.querySelector(".add-sheet-container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
firstSheet.addEventListener("click", handleActiveSheet);
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let allAlignBtns = document.querySelectorAll(".alignment-container>*")
let sheetDB = workSheetDB[0]; // it will store the database of first sheet

addbtnContainer.addEventListener("click", function(){
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx  = Number(idx); // to convert it to a number as it is a string.
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", idx+1);
    newSheet.innerText = `Sheet ${idx + 1}`;
    // page add
    sheetList.appendChild(newSheet);
    // set active sheet
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    sheetsArr = document.querySelectorAll(".sheet"); // we have to call it again as now new sheets are added to the array.
    // when we add new sheet, a new shhet is formed which is stored at the last index of the array.
    sheetsArr[sheetsArr.length - 1].classList.add("active-sheet"); // we did "-1" as it's an array and we have started sheets no. from 1.
    // 2 d array 
    initCurrentSheetDb(); // it will store an entire sheet into workSheetDB
    // /current change
    sheetDB = workSheetDB[idx]; // the current sheet is now stored in sheetDB
    // cell empty 
    // new page element value empty
    initUI(); // 
    // change sheet
    newSheet.addEventListener("click", handleActiveSheet);

});
function handleActiveSheet(e){ // to display which sheet is active and open.
    let mySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet){
        sheet.classList.remove("active-sheet");
    })
    if(!mySheet.classList[1]){
        mySheet.classList.add("active-sheet");
    }
    //  index
    let sheetIdx = mySheet.getAttribute("sheetIdx")
        ;
    sheetDB = workSheetDB[sheetIdx - 1];
    // get data from that and set ui
    setUI(sheetDB);
}
// *****************************************************
//  address set on click of a cell 

for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("click", function handleCell(){
        let rid = Number(allCells[i].getAttribute("rid"));
        console.log(rid);
        let cid = Number(allCells[i].getAttribute("cid"));
        console.log(cid);
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65); // to first convert column to character ASCII code and then convert it to string.
        let address = colAdd + rowAdd;
        addressBar.value = address;
        // styling-> set 
        // object styling set 
        // UI 
        // cell
        // saving the properties of a cell, when it is clicked again
        let cellObject = sheetDB[rid][cid];
        // boldness
        if (cellObject.bold == true) {
            boldElem.classList.add("active-btn")
        } else {
            boldElem.classList.remove("active-btn");
        }
        // italic
        if (cellObject.italic == true) {
            italicElem.classList.add("active-btn")
        } else {
            italicElem.classList.remove("active-btn");
        }
        // underline
        if (cellObject.underline == true) {
            underlineElem.classList.add("active-btn")
        } else {
            underlineElem.classList.remove("active-btn");
        }
        // alignment
        for (let i = 0; i < allAlignBtns.length; i++) { // if there is already an active align button, it will be removed.
            allAlignBtns[i].classList.remove("active-btn");
        }
        if (cellObject.halign == "left") {
            // left active
            leftBtn.classList.add("active-btn")
        } else if (cellObject.halign == "right") {
            rightBtn.classList.add("active-btn")
            // right active
        } else if (cellObject.halign == "center") {
            centerBtn.classList.add("active-btn")
        }
    });
}
// initial cell click emulate
allCells[0].click(); // By default first cell will be clicked.

// ************Formatting****************
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`); // it will select the class we created in init.js file.
    cell.style.textAlign = "left";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    // db update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";
})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    // db update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "center";
})
fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize+"px";
})
fontFamily.addEventListener("change", function(){
    let cFont = fontFamily.value; // current font
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = cFont;
})
boldElem.addEventListener("click", function(){
    let isActive = boldElem.classList.contains("active-btn"); // it will store true/false
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid]; // assigning properties of a cell from sheet datbase to cellObject. 
    if (isActive == false) {
        // cell text bold
        cell.style.fontWeight = "bold"; // making changes in html. 
        boldElem.classList.add("active-btn");
        cellObject.bold = true; // making changes in sheet database also.
    } else {
        // cell text normal
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active-btn");
        cellObject.bold = false
    }
    // console.log(sheetDB)
})
italicElem.addEventListener("click", function(){
    let isActive = italicElem.classList.contains("active-btn"); 
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text italic
        cell.style.fontStyle = "italic";
        italicElem.classList.add("active-btn");
        cellObject.italic = true;
    } else {
        // cell text normal
        cell.style.fontStyle = "normal";
        italic.classList.remove("active-btn");
        cellObject.italic = false;
    }
})
underlineElem.addEventListener("click", function(){
    let isActive = underlineElem.classList.contains("active-btn"); 
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
        cellObject.underline = true;
    } else {
        // cell text none
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
        cellObject.bold = false;
    }
})
// ****************************************************************


// Helper functions
function getRIdCIdfromAddress(adress) { // This function will return rowid and columnid of the cell.
    // A1
    let cellColAdr = adress.charCodeAt(0); // it will give us ASCII code of character.
    // console.log(cellColAdr);
    let cellrowAdr = adress.slice(1); // slice also works on string. 
    let cid = cellColAdr - 65; // 65 is the ASCII code of 'A'.
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid }; // returning object
}
function initUI() { // it will set the default values to new sheet.
    for (let i = 0; i < allCells.length; i++) {
        // boldness
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "10";
        allCells[i].style.textAlign = "left";
        allCells[i].innerText = "";
    }
}
for(let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value = cell.innerText;
    });
}
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
        }
    }
}

