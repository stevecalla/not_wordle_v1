//query selector variables go here 👇
var displaySolution = document.querySelector('#solution');
var inputTilesRow1 = document.querySelector('#inputTilesRow1');
var inputTilesRow2 = document.querySelector('#inputTilesRow2');
var inputTilesRow3 = document.querySelector('#inputTilesRow3');
var inputTilesRow4 = document.querySelector('#inputTilesRow4');
var inputTilesRow5 = document.querySelector('#inputTilesRow5');
var inputTilesRow6 = document.querySelector('#inputTilesRow6');

//global variables go here 👇
var word = "";
var currentInput = [];
var currentTile = 0;
var allInput = [];
var solution = [];
var currentEmojiBoard = "";
var currentEmojiBoard2 = "";

//event listeners go here 👇
window.addEventListener('load', loadTasks);
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
    console.log('backspace')
    deleteCharacter();
  }
  if (keyCode <65 || keyCode >90) {
    event.preventDefault();
  }
}, false);

//functions and event handlers go here 👇
// SECTION LOAD TASKS
function loadTasks() {
  createSolution();
  createGameInstruction();
  createTiles();
  document.getElementById('instructionWrapper').focus();
}

// SECTION INPUT TEXT

function inputText() {
  // let key = event.key;
  // keyCode = event.keyCode;
  console.log('length=', allInput.length)

  // console.log('event=', event.value) //for button
  // console.log('letter=', letter) //for button
  // let letter = event.value; // for button

  if ((event.keyCode >=65 && event.keyCode <=90) && currentInput.length != 5 && !document.getElementById('id' + allInput.length).disabled) { //&& (!event.ctrlKey && event.keyCode != 82)
  // if ((letter || (event.keyCode >=65 && event.keyCode <=90)) && currentInput.length != 5 && !document.getElementById('id' + allInput.length).disabled) { //for button
  // let currentPosition = event.target.id.charAt(event.target.id.length - 1)
  // console.log(currentPosition);
  // console.log(allInput.length);

    document.getElementById('id' + allInput.length).focus();
    document.getElementById('id' + allInput.length).value = event.key;

    // if (event.key) {document.getElementById('id' + allInput.length).value = event.key};
    // if (event.value) {document.getElementById('id' + allInput.length).value = event.value}; // for button

  // const idValue = currentInput.length;
  // createInputString(idValue);

  createInputString();
  // createInputString(letter);//for button

  // document.getElementById('id' + (allInput.length * 1 + 1)).focus()
  }
}

// SECTION DELETE INPUT TEXT 
function deleteCharacter() {
  var currentLength = allInput.length;
  console.log('alllength=', allInput.length);
  console.log(document.getElementById('id' + (currentLength - 1)))
  console.log(document.getElementById('id' + (currentLength - 1)).dataset.status)
  // if (document.getElementById('id' + (currentLength - 1)).disabled === false) {
  // if (document.getElementById('id' + (currentLength - 1)).data-status) {
  // if (document.getElementById('id' + (currentLength - 1)).hasAttribute('data-status')) {
  // if (!document.getElementById('id' + (currentLength - 1)).dataset.status) {

  let status = document.getElementById('id' + (currentLength -1)).dataset.status;
  console.log('status=', status);

  if (status !== 'noMatch' && status !== 'match' && status !== 'exactMatch') {

    // document.getElementById('id' + (currentLength - 1)).disabled = false; //remove disabled

    document.getElementById('id' + (currentLength - 1)).setAttribute("data-status", ""); //remove color
    document.getElementById('id' + (currentLength - 1)).removeAttribute('disabled'); //remove disabled
    document.getElementById('id' + (currentLength - 1)).value = "";
    document.getElementById('id' + (currentLength - 1)).focus();
    currentInput.pop();
    allInput.pop();
    currentTile = allInput.length;
  }
}

// SECTION POPULATE CURRENT GUESS AND ALL GUESSES ARRAYS
function createInputString() {
  currentInput.push(event.key.toUpperCase());
  allInput.push(event.key.toUpperCase());
  currentTile = allInput.length;
  console.log(currentInput);
}

// SECTION BUTTONS
function getKeyboard() {
  console.log('a');
  console.log(currentTile);
  document.getElementById('id' + currentTile).focus();
}

function refresh() {
  console.log('reset in progress')
  location.reload(true);
  document.getElementById('id' + currentTile).focus();
}

function toggleContrast() {
  toggleContrastModeButton();
  document.getElementById('id' + currentTile).focus();
} 

function definition() {
  console.log('definition in progress');
  getWebsterDictionaryAPI();
  document.getElementById('id' + currentTile).focus();
} 

function copyGameBoard() { // SECTION CLIPBOARD CODE
  console.log('click')
  let currentRow = Math.floor(allInput.length / 5);
  if (currentRow != 0) {
    try {
      const regex = /(<br>)+/g;
      console.log(regex)

      // let shareText = document.getElementById("inputTilesRow1").innerHTML.replace(regex, "\n");
      // let shareText = currentRow + currentMiniBoard;
      // let shareText = `${currentRow}/6\n${currentEmojiBoard}`;

      let shareText = document.querySelector('.contrast-toggle').classList.contains('contrast-toggle--blueorange') ? `${currentRow}/6\n${currentEmojiBoard2}` : `${currentRow}/6\n${currentEmojiBoard}`;

      // navigator.clipboard.writeText(shareText).then(()=>{alert(`"Copied to clipboard!" ${shareText}`)});
      navigator.clipboard.writeText(shareText).then(()=>{alert(`${shareText}`)});

      console.log("Data was shared successfully\n", shareText);

    } catch (err) {
      console.error("Share failed:", err.message);
    }
  }
  document.getElementById('id' + currentTile).focus();
}

// SECTION CREATE GAME TILES
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
                disabled="disabled"
                data-status="start"
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
                disabled="disabled"
                data-status="start"
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
                disabled="disabled"
                data-status="start"
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
                disabled="disabled"
                data-status="start"
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
                disabled="disabled"
                data-status="start"
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
                disabled="disabled"
                data-status="start"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  // for (let i = 30; i < 35; i++) {
  //   instructionTile1.innerHTML +=
  //   `   
  //     <div>
  //       <input type="text" 
  //               id=${`tile${i}`}
  //               maxlength="1"
  //               name="selection" 
  //               value=""
  //               size="1"
  //               style="text-transform:uppercase" >
  //     </div>
  //   `;
  // }
  // for (let i = 35; i < 40; i++) {
  //   instructionTile2.innerHTML +=
  //   `   
  //     <div>
  //       <input type="text" 
  //               id=${`tile${i}`}
  //               maxlength="1"
  //               name="selection" 
  //               value=""
  //               size="1"
  //               style="text-transform:uppercase" >
  //     </div>
  //   `;
  // }
  // for (let i = 40; i < 45; i++) {
  //   instructionTile3.innerHTML +=
  //   `   
  //     <div>
  //       <input type="text" 
  //               id=${`tile${i}`}
  //               maxlength="1"
  //               name="selection" 
  //               value=""
  //               size="1"
  //               style="text-transform:uppercase" >
  //     </div>
  //   `;
  // }
}

// SECTION CREATE SOLUTION
function createSolution() {
  var randomNumber = Math.floor(Math.floor(Math.random()*wordList.length));
  console.log('random=', randomNumber);
  solution = Array.from(wordList[randomNumber].toUpperCase());
  console.log(solution);
  console.log(wordList.length);
  // formatSolution();
}

function formatSolution() {
  // displaySolution.innerText = solution.join('');

  // console.log(displaySolution)
  // displaySolution.innerText = solution;
  // getWebsterDictionaryAPI();

  // for (let i = 0; i < solution.length; i++) {
  //   displaySolution.innerText += solution[i];
  // }

  // document.getElementById('solution').classList.remove('cloak');
}

// SECTION INSTRUCTIONS FUNCTIONS
function createGameInstruction() {
  injectInstructionText();
  createIntructionTiles();
  populateInstructionTiles();
}

function injectInstructionText() {
  document.getElementById('instructionWrapper').innerHTML = `
    <div class='instx-title'>
      <p class='cloak'>x</p>
      <p class='title'>HOW TO PLAY</p>
      <p class='click-to-hide-x'>X</p>
    </div>
    <p>Guess the WORD in six tries.</p>
    <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
    <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
    <div class='example-border'>
      <p>Examples</p>
      <div class='input-wrapper' id='instructionTile1'></div>
      <p>The letter W is in the word and in the correct spot.</p>
      <div class='input-wrapper' id='instructionTile2'></div>
      <p>The letter I is in the word but in the wrong spot.</p>
      <div class='input-wrapper' id='instructionTile3'></div>
      <p>The letter U is not in the word in any spot.</p>
    </div>
    <p>LET'S PLAY!!</p>
  `
}

function createIntructionTiles() {
  for (let i = 30; i < 35; i++) {
    instructionTile1.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`tile${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 35; i < 40; i++) {
    instructionTile2.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`tile${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
  for (let i = 40; i < 45; i++) {
    instructionTile3.innerHTML +=
    `   
      <div>
        <input type="text" 
                id=${`tile${i}`}
                maxlength="1"
                name="selection" 
                value=""
                size="1"
                style="text-transform:uppercase" >
      </div>
    `;
  }
}

function populateInstructionTiles() {
  const letters = ['W','A','C','K','Y','F','I','L','E','S','V','A','G','U','E']
  for (let i = 0; i < 5; i++) {
    document.getElementById('tile' + (i + 30)).value = letters[i];
    document.getElementById('tile' + (i + 35)).value = letters[i + 5];
    document.getElementById('tile' + (i + 40)).value = letters[i + 10];

    document.getElementById('tile' + (i + 30)).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + (i + 35)).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + (i + 40)).setAttribute('disabled', 'disabled');
  }
  document.getElementById('tile30').classList.add('contrast-toggle--green');
  document.getElementById('tile36').classList.add('contrast-toggle--yellow');
  document.getElementById('tile42').classList.add('contrast-toggle--grey');
}

function deleteInstructions() {
  document.getElementById('instructionWrapper').innerHTML = ``;
  document.getElementById('instructionWrapper').classList.add('hidden');
  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }
  document.getElementById('id' + currentTile).focus();
}

// SECTION DETERMINE EACH ROW / WINN
function evaluateString() {

  let currentPosition = 0;
  if (event.target.id.length > 3) {
    currentPosition = event.target.id.charAt(event.target.id.length - 2) + event.target.id.charAt(event.target.id.length - 1);
  } else {
    currentPosition = event.target.id.charAt(event.target.id.length - 1);
  }
  let startPosition = currentPosition * 1 - 4;
  let endPosition = currentPosition * 1;
  let dataStatus = [];
  let tileEmoji = "";
  let tileEmoji2 = '';
  
  // for (let x = startPosition; x < endPosition + 1; x++) {
  
  if (endPosition * 1 + 1 < 30 || document.getElementById('id' + (endPosition * 1)).dataset.status !== 'gameOver') {
    for (let x = 0; x < 5; x++) {

      
  // document.getElementById('tile30').classList.add('contrast-toggle--green');
  // document.getElementById('tile36').classList.add('contrast-toggle--yellow');
  // document.getElementById('tile42').classList.add('contrast-toggle--grey');

      if (currentInput[x] === solution[x]) {
        document.getElementById('id' + (startPosition + x)).setAttribute('data-status', 'exactMatch');

        if(document.querySelector(".contrast-toggle").classList.contains('contrast-toggle--blueorange')) {
          document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--green');
          document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--blue');
        } else {
          document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--green');
        }

        // document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--green');

        dataStatus.push('exactMatch');
        // miniBoard.push('🟩');
        tileEmoji += '🟩';
        tileEmoji2 += '🟦'
      } else if (solution.includes(currentInput[x])) {
        // document.getElementById('id' + (x+1)).style.backgroundColor = 'yellow'
        document.getElementById('id' + (startPosition + x)).setAttribute('data-status', 'match');

        if(document.querySelector(".contrast-toggle").classList.contains('contrast-toggle--blueorange')) {
          document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--yellow');
          document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--orange');
        } else {
          document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--yellow');
        }

        // document.getElementById('id' + (startPosition + x)).classList.add('contrast-toggle--yellow');

        dataStatus.push('match');
        // miniBoard.push('🟨');
        tileEmoji += '🟨';
        tileEmoji2 += '🟧'
      } else {
        document.getElementById('id' + (startPosition + x)).setAttribute('data-status', 'noMatch')
        dataStatus.push('noMatch');
        // miniBoard.push('⬛');
        tileEmoji += '⬛';
        tileEmoji2 += '⬛';
      }
    console.log('status=', x, startPosition, endPosition, currentInput[x], solution[x], document.getElementById('id' + (startPosition + x)).dataset.status)
    }
    createWord(endPosition);
  }

  if (document.getElementById('id' + (currentPosition * 1 + 1)) && (currentPosition * 1 + 1 < 30) && (document.getElementById('id' + (endPosition * 1 + 1)).dataset.status !== 'gameOver')) {
    console.log(document.getElementById('id' + (currentPosition * 1 + 1 < 30)));
    document.getElementById('id' + (currentPosition * 1 + 1)).focus();
  }


  currentInput = [];
  console.log(dataStatus);
  
  var winCount = 0;
  for (let i = 0; i < 5; i++) {
    if (dataStatus[i] === 'exactMatch') {
      winCount = winCount + 1
    }
    console.log('count', winCount)
  }

  if (winCount === 5) {
    console.log('winner');
    createConfetti();
    // getWebsterDictionaryAPI();
      document.getElementById('id29').blur();
      for (let i = endPosition + 1; i < 30; i++) {
        // console.log(i);
        document.getElementById('id' + (i)).setAttribute('data-status', "gameOver");
        document.getElementById('id' + (i)).value = ' ';
        document.getElementById('id' + (i)).setAttribute('disabled', 'disabled');
        document.getElementById('id' + (i)).blur();
        // console.log(event.keyCode);
      }
      // for (let i = 0; i < 30; i++) {
      //   // console.log(i);
      //   // document.getElementById('id' + (i)).setAttribute('data-status', "gameOver");
      //   document.getElementById('id' + (i)).setAttribute('disabled', 'disabled');
      //   document.getElementById('id' + (i)).blur();
      //   // console.log(event.keyCode);
      // }
    } else if (endPosition === 29) {
        console.log('end of game');
        console.log(solution, solution.join(''))
        // document.getElementById('solution').classList.remove('cloak');
        // displaySolution.innerText = '';
        // displaySolution.innerText = solution.join('');
        // getWebsterDictionaryAPI();
        document.getElementById('id29').blur();

    } else {
        console.log('keep playing')
    }
  // document.querySelector('h1').blur();
  dataStatus = [];
  word = '';

  console.log('miniBoard=', tileEmoji);
  createEmojiBoard(tileEmoji);
  createEmojiBoard2(tileEmoji2);
}

// SECTION CREATE WORD - COMBINE INPUT INTO WORD NOT ARRAY
function createWord(endPosition) {
  console.log('endPosition=', endPosition * 1 + 1);
  console.log('noway=', document.getElementById('id6').value)
  for (let i = 0; i < 5; i++) {
    if (document.getElementById('id5').dataset.status !== 'gameOver') {
      word += currentInput[i];
    }
  }
  console.log(word);
}

// SECTION EMOJI BOARD
function createEmojiBoard(tileEmoji) {
  currentEmojiBoard += tileEmoji + '\n';
  console.log('currentMiniBoard=', currentEmojiBoard);
}

function createEmojiBoard2(tileEmoji2) {
  currentEmojiBoard2 += tileEmoji2 + '\n';
  console.log('currentMiniBoard2=', currentEmojiBoard2);
}


// SECTION API CODE
let elementaryDefinition = 'Placeholder';
let collegeDefinition = 'Placeholder';
let displayDefinition = 'Sorry, I could not find the definition';
getWebsterDictionaryAPI = () => {
  console.log('a')
  let currentRow = Math.floor(allInput.length / 5);
  if (elementaryDefinition === 'Placeholder' || collegeDefinition === 'Placeholder') {
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${solution}?key=8a8c06ea-289c-450d-90f1-cf98924da140`) //elementary dictionary
        .then((response) => response.json())
        .then(function (definition) {
          elementaryDefinition = definition[0].shortdef[0];
          console.log('api run 1');
          })
        .catch(err => {
          console.error("API #1 failed:", err.message);
        })  
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${solution}?key=d6ad76fd-5324-4925-834b-17a06efafce6`) //college dictionary
        .then((response) => response.json())
        .then(function (definition) {
          collegeDefinition = definition[0].shortdef[0];
          // console.log(definition[0].hwi.prs[0].sound.audio);
          console.log('api run 2');
          })
        .catch(err => {
          console.error("API #2 failed:", err.message);
        }) 
  }
  setTimeout(() => { 
    displayDefintion(elementaryDefinition, collegeDefinition)
  }, 1000);
}

function displayDefintion(elementaryDefinition, collegeDefinition) {
  console.log('a=', elementaryDefinition) 
  console.log('b=', collegeDefinition) 
  if (elementaryDefinition !== 'Placeholder') {
    displayDefinition = elementaryDefinition;
  } else if (collegeDefinition !== 'Placeholder') {
    displayDefinition = collegeDefinition;
  } else {
    displayDefinition = 'Sorry, I could not find the definition';
  }
  document.querySelector('#definition').innerText = `Definition: ${displayDefinition}`;
  displaySolution.innerText = solution.join('');
  document.getElementById('solution').classList.toggle('cloak');
  document.getElementById('definition').classList.toggle('cloak');
  console.log('innerText=', document.querySelector('#definition').innerText)

  // console.log(document.querySelector('#audio').innerHTML)
  // console.log('elementary=', definition[0].hwi.prs[0].sound.audio);
  // console.log(`https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3`);
  // console.log(`https://media.merriam-webster.com/audio/prons/en/us/mp3/p/${definition[0].hwi.prs[0].sound.audio}.mp3`);
}

// SECTION DARK & CONTRAST MODE
function toggleDarkModeButton() {
  const darkModeButton = document.querySelector(".darkmode-toggle");
  const darkModeCSS = document.querySelector("#darkMode-link");
  const darkModeIconList = document.querySelectorAll('.header-icon-svg');
  darkModeCSS.getAttribute("href") === "light-theme.css" ? darkModeCSS.href = "dark-theme.css" : darkModeCSS.href = "light-theme.css";
  darkModeButton.classList.toggle('darkmode-toggle--white');
  for (let i = 0; i < 4; i++) {
    darkModeIconList[i].classList.toggle('darkmode-svg-toggle--white');
  }
  document.getElementById('id' + currentTile).focus();
}

function toggleContrastModeButton() {
  const contrastModeButton = document.querySelector(".contrast-toggle");
  contrastModeButton.classList.toggle('contrast-toggle--blueorange');
  const gameTiles = document.querySelectorAll("input[id^='id']");
  for (let i = 0; i < 30; i++) {
    // console.log(i)
    if (gameTiles[i].dataset.status === 'exactMatch') {
      gameTiles[i].classList.toggle('contrast-toggle--blue');
    } else if (gameTiles[i].dataset.status === 'match') {
      gameTiles[i].classList.toggle('contrast-toggle--orange');
    }
  }
  if (!document.getElementById('instructionWrapper').classList.contains('hidden')) {
    document.getElementById('tile30').classList.toggle('contrast-toggle--blue');
    document.getElementById('tile36').classList.toggle('contrast-toggle--orange');
  }
  document.getElementById('id' + currentTile).focus();
}
