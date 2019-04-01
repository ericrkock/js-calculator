/* JavaScript Calculator */

// A FreeCodeCamp Project Challenge
// Prsesented by Eric R. Kock - Feb. 2019

// Still to do
// - Buzz on error

var resultDisplay = "0";
var chainDisplay = "0";

var previousKeyUsed = "";
var tempChainDisplay;
var tempCalculationChain;
var tempResultDisplay;


var canDecimal = true;
var canOperator = false;
var canBackSpace = false;


function padClicked(obj) {
   var keyID = obj.id;
   var keyValue = obj.value;

   if (keyValue == "digit") tempDisplayDigit(keyID);
   if (keyValue == "decimal") displayDecimal();
   if (keyValue =="operator") tempDisplayOperator(keyID);
}

function tempDisplayDigit(x) {
   if (x == "zero") displayDigit("0");
   if (x == "one") displayDigit("1");
   if (x == "two") displayDigit("2");
   if (x == "three") displayDigit("3");
   if (x == "four") displayDigit("4");
   if (x == "five") displayDigit("5");
   if (x == "six") displayDigit("6");
   if (x == "seven") displayDigit("7");
   if (x == "eight") displayDigit("8");
   if (x == "nine") displayDigit("9");
}

function tempDisplayOperator(x) {
   if (x == "clear") resetDisplay();
   if (x == "backspace") backspaceDisplay();
   if (x == "equals") finalResult();

   if (x == "add") displayOperator("+");
   if (x == "subtract") displayOperator("-");
   if (x == "multiply") displayOperator("x");
   if (x == "divide") displayOperator("/");
}

function displayDigit(x) {

   if (resultDisplay == "0") {
      resultDisplay = x;
      chainDisplay = x;
   } else {
      if (previousKeyUsed == "operator") {
         chainDisplay = tempChainDisplay;
         resultDisplay = "";
      }
      resultDisplay = resultDisplay + x;
      chainDisplay = chainDisplay + x;
   } 
   updateHTML(chainDisplay, resultDisplay);
   previousKeyUsed = "digit";
}

function displayDecimal() {
   var decimalUsed = resultDisplay.indexOf(".");
   if (decimalUsed == -1) {
      if (previousKeyUsed != "operator") {
         if (resultDisplay == 0) {
            if (chainDisplay == 0) {
               chainDisplay = "0.";
            } else {
               chainDisplay = chainDisplay + ".";
            }
            resultDisplay = "0.";
         } else {
            chainDisplay = chainDisplay + ".";
            resultDisplay = resultDisplay + ".";
         }
         canBackSpace= true;
         previousKeyUsed ="decimal";
      } else {
         chainDisplay = chainDisplay + resultDisplay + "0.";
         resultDisplay = resultDisplay.slice(0, resultDisplay.length-1) + "0.";
      }
      updateHTML(chainDisplay, resultDisplay);
   }
}

function displayOperator(x) {
   if (previousKeyUsed != "decimal") {
      tempChainDisplay = chainDisplay + x;
      resultDisplay = x;
      tempResultDisplay = x;
      updateHTML(tempChainDisplay, resultDisplay);
      previousKeyUsed = "operator";
   }
}

function backspaceDisplay() {
   if (canBackSpace) {
      if (chainDisplay != "0") {
         var removeLastCharChain = chainDisplay.slice(0, chainDisplay.length-1);
         chainDisplay = removeLastCharChain;
      }
      if (resultDisplay != "0") {
         var removeLastCharResult = resultDisplay.slice(0, resultDisplay.length-1);
         resultDisplay = removeLastCharResult;
      }
         if (chainDisplay.length == 0) chainDisplay ="0";
         if (resultDisplay.length == 0) resultDisplay = "0";
         updateHTML(chainDisplay, resultDisplay);
         if (resultDisplay == 0) resultDisplay = "";
         if (chainDisplay == 0) chainDisplay ="";
   }
}

function finalResult() {
   if (previousKeyUsed != "decimal" && previousKeyUsed != "operator") {
      var replaceChar = chainDisplay.replace(/x/g, "*");
      eval(replaceChar);
      endChainDisplay = chainDisplay + "=" + eval(replaceChar);
      num = eval(replaceChar);
      chainDisplay = num.toString();
      resultDisplay = chainDisplay;
      canBackSpace = false;
   }
   updateHTML(endChainDisplay,eval(replaceChar));
}

function updateHTML(chain, result) {
   document.querySelector("#chain").textContent = chain;
   document.querySelector("#display").textContent = result;
}

function resetDisplay() {
   chainDisplay = "";
   resultDisplay = "";
   previousKeyUsed = "";
   canOperator = false;
   canBackSpace = false;
   document.querySelector("#chain").textContent = "0";
   document.querySelector("#display").textContent = "0";
}
