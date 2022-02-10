//query selector variables go here 👇
var displaySolution = document.querySelector('#solution');
var inputTilesRow1 = document.querySelector('#inputTilesRow1');
var inputTilesRow2 = document.querySelector('#inputTilesRow2');
var inputTilesRow3 = document.querySelector('#inputTilesRow3');
var inputTilesRow4 = document.querySelector('#inputTilesRow4');
var inputTilesRow5 = document.querySelector('#inputTilesRow5');
var inputTilesRow6 = document.querySelector('#inputTilesRow6');

function loadTasks() {
  createSolution();
  createTiles();
  document.getElementById('id0').focus();
}

function formatSolution() {
  // console.log(displaySolution)
  // displaySolution.innerText = solution;
  for (let i = 0; i < solution.length; i++) {
    displaySolution.innerText += solution[i];
  }
}

function createTiles() {
  for (let i = 0; i < 5; i++) {
    inputTilesRow1.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`id${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 5; i < 10; i++) {
    inputTilesRow2.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`id${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 10; i < 15; i++) {
    inputTilesRow3.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`id${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 15; i < 20; i++) {
    inputTilesRow4.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`id${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 20; i < 25; i++) {
    inputTilesRow5.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`id${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 25; i < 30; i++) {
    inputTilesRow6.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`id${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  
}

//global variables go here 👇
var word = "";
var currentInput = [];
var allInput = [];
var solution = [];

//event listeners go here 👇
window.addEventListener('load', loadTasks);
document.addEventListener('keydown', createWord);
document.addEventListener('keydown', inputText);
document.addEventListener('keydown', function(event) { //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code https://dev.to/taufik_nurrohman/bringing-keyboardevent-key-and-keyboardevent-keycode-altogether-for-the-best-keyboard-interaction-experience-jlf
  // console.log(event.keyCode, event.code)
  let key = event.key,
  keyCode = event.keyCode;

  if ((key && 'Enter' === key || keyCode && 13 === keyCode) && (currentInput.length === 5)) {
  // if (key && 'Enter' === key || keyCode && 13 === keyCode) {
    evaluateString();
  }
  if (key && 'Backspace' === key || keyCode && 8 === keyCode || key && 'ArrowLeft' === key || keyCode && 37 === keyCode) {
  // if (key && 'Backspace' === key || keyCode && 8 === keyCode) {
    deleteCharacter();
  }
  if (keyCode <65 || keyCode >90) {
    event.preventDefault();
  }
}, false);

//functions and event handlers go here 👇

function createWord(event) {
  if (event.keyCode >=65 && event.keyCode <=90) {
    word += event.key.toUpperCase();
    console.log(word);  
    }
}

function inputText() {
  let key = event.key;
  keyCode = event.keyCode;

  if ((keyCode >=65 && keyCode <=90) && currentInput.length != 5) { //&& (!event.ctrlKey && event.keyCode != 82)
  let currentPosition = event.target.id.charAt(event.target.id.length - 1)
  // console.log(currentPosition);
  // console.log(allInput.length);

  document.getElementById('id' + allInput.length).focus()
  document.getElementById('id' + allInput.length).value = key;

  // const idValue = currentInput.length;
  // createInputString(idValue);
  createInputString();
  }
}

function deleteCharacter() {
  var currentLength = allInput.length;
  console.log('alllength=', allInput.length)
  if (document.getElementById('id' + (currentLength - 1)).disabled === false) {
    document.getElementById('id' + (currentLength - 1)).setAttribute("data-status", ""); //remove color
    document.getElementById('id' + (currentLength - 1)).disabled = false; //remove disabled
    document.getElementById('id' + (currentLength - 1)).value = "";
    document.getElementById('id' + (currentLength - 1)).focus();
    currentInput.pop();
    allInput.pop();
  }
}

// function createInputString(idValue) {
function createInputString() {
  // currentInput.push(document.getElementById('id' + idValue).value.toUpperCase());
  // allInput.push(document.getElementById('id' + idValue).value.toUpperCase());
  currentInput.push(event.key.toUpperCase());
  allInput.push(event.key.toUpperCase());
  console.log(currentInput);
  // if (currentInput.length === 5) {
  //   console.log('length=', currentInput.length)
  //   evaluateString(currentInput)
  // }
}

function createSolution() {
  var randomNumber = Math.floor(Math.floor(Math.random()*wordList.length));
  console.log('random=', randomNumber);
  solution = Array.from(wordList[randomNumber].toUpperCase());
  console.log(solution);
  console.log(wordList.length);
  formatSolution();
}

function evaluateString() {

  let currentPosition = 0;
  if (event.target.id.length > 3) {
    currentPosition = event.target.id.charAt(event.target.id.length - 2) + event.target.id.charAt(event.target.id.length - 1);
  } else {
    currentPosition = event.target.id.charAt(event.target.id.length - 1);
  }

  // var randomNumber = Math.floor(Math.floor(Math.random()*wordList.length));
  // console.log('random=', randomNumber);
  // var solution = Array.from(wordList[randomNumber].toUpperCase());

  // console.log('solution2=', solution2)
  // var solution = ['P','L','A','C','E']

  startPosition = currentPosition * 1 - 4
  endPosition = currentPosition * 1
  
  // for (let x = startPosition; x < endPosition + 1; x++) {
  
  for (let x = 0; x < 5; x++) {

    document.getElementById('id' + (allInput.length - x - 1)).disabled = 'disabled'

    console.log('match=', x, startPosition, endPosition, currentInput[x], solution[x])
    if (solution.includes(currentInput[x])) {
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'yellow'
      document.getElementById('id' + (startPosition + x)).setAttribute("data-status", "match")
    } else {
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'grey'
      document.getElementById('id' + (startPosition + x)).setAttribute("data-status", "nomatch")
    }
  }

  // for (let x = startPosition; x < endPosition + 1; x++) {
  for (let x = 0; x < 5; x++) {
    if (currentInput[x] === solution[x]) {
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'green'
      // document.getElementById('id' + (x)).setAttribute("data-status", "exact_match")
      document.getElementById('id' + (startPosition + x)).setAttribute("data-status", "exact_match")
    }
    console.log('exact_match=', x, startPosition, endPosition, currentInput[x], solution[x])
  }

  document.getElementById('id' + (currentPosition * 1 + 1)).focus();
  currentInput = [];
}

function flipGradientPink() {
  bodyBackground.classList.remove('green-gradient');
  bodyBackground.classList.add('pink-gradient');
}

function flipGradientGreen() {
  bodyBackground.classList.remove('pink-gradient');
  bodyBackground.classList.add('green-gradient');
}