//query selector variables go here 👇
var displaySolution = document.querySelector('#solution');
var inputTilesRow1 = document.querySelector('#inputTilesRow1');
var inputTilesRow2 = document.querySelector('#inputTilesRow2');
var inputTilesRow3 = document.querySelector('#inputTilesRow3');
var inputTilesRow4 = document.querySelector('#inputTilesRow4');
var inputTilesRow5 = document.querySelector('#inputTilesRow5');
var inputTilesRow6 = document.querySelector('#inputTilesRow6');

//global variables go here 👇
var currentInput = [];
// var currentTile = 0;
var allInput = [];
var solution = [];
var currentEmojiBoard = "";
var currentEmojiBoard2 = "";
let elementaryDefinition = 'Placeholder';
let collegeDefinition = 'Placeholder';
let displayDefinition = 'Sorry, I could not find the definition';

//event listeners go here 👇
window.addEventListener('load', loadTasks);
document.addEventListener('keydown', inputText);

//functions and event handlers go here 👇
// SECTION LOAD TASKS
function loadTasks() {
  createGameInstruction();
  createGameSolution();
  createGameTiles();
  createOnscreenKeyboard();
}

// SECTION  CREATE INSTRUCTIONS
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
      <div class='instrx-wrapper'></div>
      <p>The letter W is in the word and in the correct spot.</p>
      <div class='instrx-wrapper'></div>
      <p>The letter I is in the word but in the wrong spot.</p>
      <div class='instrx-wrapper'></div>
      <p>The letter U is not in the word in any spot.</p>
    </div>
    <p>LET'S PLAY!!</p>
  `
}

function createIntructionTiles() {
  for (let x = 0; x < 3; x++)
    for (let i = 0; i < 5; i++) {
      document.querySelectorAll('.instrx-wrapper')[x].innerHTML += 
      `   
        <div>
          <input type="text" 
                  id=${`tile${x}${i}`}
                  maxlength="1"
                  name="selection" 
                  value=""
                  size="1"
                  style="text-transform:uppercase">
        </div>
      `;
  }
}

function populateInstructionTiles() {
  const letters = ['W','A','C','K','Y','F','I','L','E','S','V','A','G','U','E'];
  for (let i = 0; i < 5; i++) {
    document.getElementById('tile' + 0 + i).value = letters[i];
    document.getElementById('tile' + 1 + i).value = letters[i + 5];
    document.getElementById('tile' + 2 + i).value = letters[i + 10];

    document.getElementById('tile' + 0 + i).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + 1 + i).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + 2 + i).setAttribute('disabled', 'disabled');
  }
  document.getElementById('tile00').classList.add('contrast-toggle--green');
  document.getElementById('tile11').classList.add('contrast-toggle--yellow');
  document.getElementById('tile23').classList.add('contrast-toggle--grey');
}

function hideInstructions() {
  document.getElementById('instructionWrapper').innerHTML = ``;
  document.getElementById('instructionWrapper').classList.add('hidden');
  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }
  document.querySelector('.input-wrapper').classList.remove('hidden');
  document.querySelector('.keyboard-wrapper').classList.remove('hidden');
  // document.getElementById('id0').focus();
  // focusCurrentTile();
}

// SECTION CREATE SOLUTION
function createGameSolution() {
  var randomNumber = Math.floor(Math.floor(Math.random()*wordList.length));
  console.log('random=', randomNumber);
  solution = Array.from(wordList[randomNumber].toUpperCase());
  console.log(solution);
  console.log(wordList.length);
  // formatSolution();
}

// SECTION CREATE GAME TILES
function createGameTiles() {
  for (let i = 0; i < 30; i++) {
    inputTilesRow1.innerHTML +=
    `   
      <div>
        <input type='text' 
                id=${`id${i}`}
                maxlength='1'
                name='selection' 
                onclick()
                value=''
                size='1'
                disabled='disabled'
                data-status='start'
                style='text-transform:uppercase' >
      </div>
    `;
  }
}

// SECTION CREATE ONSCREEN KEYBOARD
function createOnscreenKeyboard() {
  const alphabetKeys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','ENTER','U','V','W','X','Y','Z','⌫'];
  const qwertyKeys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','⌫'];
  document.getElementById('keyboardWrapper').innerHTML = '';
  for (let i = 0; i < 28; i++) {
    document.getElementById('keyboardWrapper').innerHTML += `
      <button 
        class='keyboard-button' 
        id='keyboard${[i]}' 
        type='button' 
        value=${qwertyKeys[i]} 
        onClick=inputText(this)>
        ${qwertyKeys[i]}
      </button>
    `
  }

  document.getElementById('keyboard10').style.marginLeft = '0.5rem';
  document.getElementById('keyboard19').classList.add('enter-button');
  document.getElementById('keyboard27').classList.add('back-button');

  document.getElementById('keyboard19').value = 13;
  document.getElementById('keyboard19').setAttribute('onclick', 'eventKeyBoardButton()');
  document.getElementById('keyboard27').setAttribute('onclick', 'deleteInputText()');

  // let exactMatchInput = [];
  // let matchInput = [];
  // //todo color contrast
  // //todo simplify

  // for (let i = 0; i < allInput.length; i++) {
  //   console.log('solution=', solution, 'allInput[i]=', allInput[i])
  //   if (solution.includes(allInput[i]) && document.getElementById('id' + i).dataset.status === 'exactMatch') {
  //     exactMatchInput.push(allInput[i]);
  //     console.log('matchInput=', exactMatchInput);
  //     console.log(document.getElementById('id' + i))
  //   } else if (solution.includes(allInput[i]) && document.getElementById('id' + i).dataset.status === 'match') {
  //       matchInput.push(allInput[i]);
  //       console.log('matchInput=', matchInput);
  //       console.log(document.getElementById('id' + i));
  //   }
  // }

  // for (let i = 0; i < 28; i++) {
  //   console.log('whatever2')
  //   allInput.includes(qwertyKeys[i]) ? document.getElementById('keyboard' + i).style.backgroundColor = '#787C7E' : null;
  // }

  // for (let i = 0; i < 28; i++) {
  //   console.log('whatever2')
  //   matchInput.includes(qwertyKeys[i]) ? document.getElementById('keyboard' + i).style.backgroundColor = '#c9b458' : null;
  //   exactMatchInput.includes(qwertyKeys[i]) ? document.getElementById('keyboard' + i).style.backgroundColor = '#6aaa64' : null;
  // }
}

function eventKeyBoardButton() {
  console.log('enter key pressed');
  event.key = '13';
  inputText(event.key);
}

// SECTION GET INPUT CHARACTERS
function inputText(event) {
  console.log(event);
  // console.log(a)
  let key = event.key? event.key : event.value ? event.value : event;
  keyCode = event.keyCode;
  console.log(key);
  if ((event.keyCode >=65 && event.keyCode <=90 || event.value) && currentInput.length !== 5 && allInput.length < 30 && !document.getElementById('id' + allInput.length).disabled) {
    document.getElementById('id' + allInput.length).focus();
    document.getElementById('id' + allInput.length).value = key;
    createInputString(key);
  } else if (key && 'Backspace' === key || keyCode && 8 === keyCode || key && 'ArrowLeft' === key || keyCode && 37 === keyCode) {
    // if (key && 'Backspace' === key || keyCode && 8 === keyCode) {
        console.log('backspace')
        deleteInputText();
  } else if (currentInput.length === 5) {
    evaluateCurrentInput(event);
  } else if (event.keyCode <65 || event.keyCode >90) {
    event.preventDefault();
  } 
}

function createInputString(key) {
  currentInput.push(key.toUpperCase());
  allInput.push(key.toUpperCase());
  // determineCurrentTile(allInput);
}

function evaluateCurrentInput(event) {
  let key = event.key,
  keyCode = event.keyCode;
  let currentGuess = currentInput.join('').toLowerCase();
  if ((key && 'Enter' === key || keyCode && 13 === keyCode || event) && (currentInput.length === 5) && ((wordListv1.includes(currentGuess) || wordList.includes(currentGuess)))) {
    // if (key && 'Enter' === key || keyCode && 13 === keyCode) {
      evaluateString();
      createEmojiRow();
      setColorContrast();
  } else {
    console.log('Not a word');
    document.getElementById('message').classList.remove('hidden');
    document.getElementById('message').innerText = 'NOT IN WORD LIST';
    setTimeout(() => {  
      document.getElementById('message').classList.add('hidden');
    }, 3000);
  }
}

function deleteInputText() {
  let status = '';
  let deleteTile = '';
  if (allInput.length !== 0) {
    status = document.getElementById('id' + (allInput.length - 1)).dataset.status;
    deleteTile = document.getElementById('id' + (allInput.length - 1));
  };
  if ((status !== 'noMatch' && status !== 'match' && status !== 'exactMatch') && allInput.length !== 0) {
    deleteTile.setAttribute('data-status', 'start'); //remove color
    deleteTile.removeAttribute('disabled'); //remove disabled
    deleteTile.value = '';
    deleteTile.focus();
    currentInput.pop();
    allInput.pop();
    // determineCurrentTile(allInput);
  }
}

// SECTION DETERMINE EACH ROW / WIN
function evaluateString(event) {
  determineCurrentRow();
}

function determineCurrentRow() {
  let startRowTile = (allInput.length - 1) * 1 - 4;
  let endRowTile = startRowTile + 4; //FIX delete endrow variable
  if ((startRowTile + 5) < 29) {
    document.getElementById('id' + (startRowTile + 5)).focus();
  }
  assignMatchStatus(startRowTile, endRowTile);
}

function assignMatchStatus(startRowTile, endRowTile) {
  let dataStatus = [];
  for (let i = 0; i < 5; i++) {
    if (allInput[startRowTile + i] === solution[i]) {
      document.getElementById('id' + (startRowTile + i)).setAttribute('data-status', 'exactMatch');
      dataStatus.push('exactMatch');
    } else if (solution.includes(allInput[startRowTile + i])) {
      document.getElementById('id' + (startRowTile + i)).setAttribute('data-status', 'match');
      dataStatus.push('match');
    } else {
      document.getElementById('id' + (startRowTile + i)).setAttribute('data-status', 'noMatch');
      dataStatus.push('noMatch');
    }
    console.log('status=', i, startRowTile, startRowTile + 5, currentInput[i], solution[i], document.getElementById('id' + (startRowTile + i)).dataset.status)
  }
  updateOnscreenKeyboard();
  determineWinStatus(startRowTile, endRowTile, dataStatus);
}

function updateOnscreenKeyboard() {
  const alphabetKeys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','ENTER','U','V','W','X','Y','Z','⌫'];
  const qwertyKeys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','ENTER','X','C','V','B','N','M','⌫'];
  let exactMatchInput = [];
  let matchInput = [];
  for (let i = 0; i < allInput.length; i++) {
    console.log('solution=', solution, 'allInput[i]=', allInput[i])
    if (solution.includes(allInput[i]) && document.getElementById('id' + i).dataset.status === 'exactMatch') {
      exactMatchInput.push(allInput[i]);
      console.log('matchInput=', exactMatchInput);
      console.log(document.getElementById('id' + i))
    } else if (solution.includes(allInput[i]) && document.getElementById('id' + i).dataset.status === 'match') {
        matchInput.push(allInput[i]);
        console.log('matchInput=', matchInput);
        console.log(document.getElementById('id' + i));
    }
  }

  for (let i = 0; i < 28; i++) {
    console.log('whatever2')
    if (exactMatchInput.includes(qwertyKeys[i])) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle--green')
    } else if (matchInput.includes(qwertyKeys[i])) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle--yellow')
    } else if (allInput.includes(qwertyKeys[i])) {
     document.getElementById('keyboard' + i).classList.add('contrast-toggle--grey');
    }
  }
}

function determineWinStatus(startRowTile, endRowTile, dataStatus) {
  let winningCondition = !dataStatus.includes('match') && !dataStatus.includes('noMatch');
  let gameOverCondition = startRowTile + 4 === 29;
  if (winningCondition) {
    createConfetti();
    //TODO POPUP BOX WITH WINNER AND INFO... GAME BOARD
    document.getElementById('id29').blur();
      // for (let i = endRowTile + 1; i < 30; i++) {
      for (let i = startRowTile + 5; i < 30; i++) {
        // console.log(i);
        document.getElementById('id' + (i)).setAttribute('data-status', 'gameOver');
        // document.getElementById('id' + (i)).value = ' ';
        document.getElementById('id' + (i)).setAttribute('disabled', 'disabled');
        document.getElementById('id' + (i)).blur();
        // console.log(event.keyCode);
        // getWebsterDictionaryAPI();
      }
    // } else if (startRowTile + 4 === 29) {
    } else if (gameOverCondition) {
        //TODO POPUP BOX WITH PLAY AGAIN, WINNING WORD, DEFINITION... GAME BOARD
        document.getElementById('id29').blur();
        getWebsterDictionaryAPI();
    } else {
        //TODO KEEP PLAYING ANIMATION
        console.log('keep playing')
    }
  resetCurrentInput();
}

function resetCurrentInput() {
  currentInput = [];
}

// SECTION EMOJI BOARD
function createEmojiRow() {
  let startRowTile = (allInput.length - 1) * 1 - 4;
  let tileEmoji = '';
  let tileEmoji2 = '';
  for (let i = 0; i < 5; i++) {
    if (allInput[startRowTile + i] === solution[i]) {
      tileEmoji += '🟩';
      tileEmoji2 += '🟦';
    } else if (solution.includes(allInput[startRowTile + i])) {
      tileEmoji += '🟨';
      tileEmoji2 += '🟧';
    } else {
      tileEmoji += '⬛';
      tileEmoji2 += '⬛';
    }
  }
  createEmojiBoard(tileEmoji, tileEmoji2);
}

function createEmojiBoard(tileEmoji, tileEmoji2) {
  currentEmojiBoard += tileEmoji + '\n';
  currentEmojiBoard2 += tileEmoji2 + '\n';

  console.log('currentMiniBoard=\n', currentEmojiBoard);
  console.log('currentMiniBoard2=\n', currentEmojiBoard2);
}

// SECTION API CODE
getWebsterDictionaryAPI = () => {
  //FIX HIDE API KEYS!!
  console.log('api#1=', elementaryDefinition === 'Placeholder', 'api#2', collegeDefinition === 'Placeholder')
  if (elementaryDefinition === 'Placeholder' && collegeDefinition === 'Placeholder') {
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${solution}?key=8a8c06ea-289c-450d-90f1-cf98924da140`) //elementary dictionary
        .then((response) => response.json())
        .then(function (definition) {
          elementaryDefinition = definition[0].shortdef[0];
          console.log('api run 1');
          })
        .catch(err => {
          console.error('API #2 failed:', 'message:', err.message, 'stack:', err.stack);
        })  
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${solution}?key=d6ad76fd-5324-4925-834b-17a06efafce6`) //college dictionary
        .then((response) => response.json())
        .then(function (definition) {
          collegeDefinition = definition[0].shortdef[0];
          // console.log(definition[0].hwi.prs[0].sound.audio);
          console.log('api run 2');
          })
        .catch(err => {
          console.error('API #2 failed:', 'message:', err.message, 'stack:', err.stack);
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
  console.log('innerText=', document.querySelector('#definition').innerText);


  let currentRow = Math.floor(allInput.length / 5);
  let greenYellowBoard = `${currentRow}/6\n${currentEmojiBoard}`;
  let blueOrangeBoard = `${currentRow}/6\n${currentEmojiBoard2}`;
  let contrastState = document.querySelector('.contrast-toggle');
  let shareText = '';
  if (currentRow != 0) {
    try {
      shareText = contrastState.classList.contains('contrast-toggle--blueorange') ? blueOrangeBoard : greenYellowBoard;
      // navigator.clipboard.writeText(shareText).then(()=>{alert(`'Copied to clipboard!'\n${shareText}`)});
    } catch (err) {
      console.error('Share failed:', err.message);
    }
  }

  // document.getElementById('instructionWrapper').innerHTML = `
  //   <div class='instx-title'>
  //     <p class='cloak'>x</p>
  //     <p class='title'>GAME SUMMARY</p>
  //     <p class='click-to-hide-x'>X</p>
  //   </div>
  //   <p class=''>Winner in X Guesses/Try again</p>
  //   <p class=''>Solution: ${solution.join('')}</p>
  //   <p class=''>Definition: ${displayDefinition}</p>
  //   <div class='example-border'>
  //     <p>Game Statistics</p>
  //     <div class='instrx-wrapper'>Board Review</div>
  //     <p>${currentEmojiBoard}</p>
  //     <div class='instrx-wrapper'></div>
  //     <p>The letter I is in the word but in the wrong spot.</p>
  //     <div class='instrx-wrapper'></div>
  //     <p>The letter U is not in the word in any spot.</p>
  //   </div>
  //   <button>Play again</button>
  //   <button>Copy Game Summary</button>
  //   `;
  // document.getElementById('instructionWrapper').classList.remove('hidden');

  // Solution: ${solution.join('')};
  // Definition: ${displayDefinition};

  // console.log(document.querySelector('#audio').innerHTML)
  // console.log('elementary=', definition[0].hwi.prs[0].sound.audio);
  // console.log(`https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3`);
  // console.log(`https://media.merriam-webster.com/audio/prons/en/us/mp3/p/${definition[0].hwi.prs[0].sound.audio}.mp3`);
}

// SECTION BUTTONS
function getKeyboardButton() {
  // createOnscreenKeyboard();
  // document.querySelector('.keyboard-wrapper').classList.toggle('hidden');
  // focusCurrentTile();
}

function refreshButton() {
  location.reload(true);
  // focusCurrentTile();
}

function toggleDarkModeButton() {
  toggleDarkMode();
  // focusCurrentTile();
  event.preventDefault;
} 

function toggleContrastModeButton() {
  toggleContrastMode();
  // focusCurrentTile();
  event.preventDefault;
} 

function definitionButton() {
  getWebsterDictionaryAPI();
  // focusCurrentTile();
} 

function copyGameBoardButton() {
  let currentRow = Math.floor(allInput.length / 5);
  let greenYellowBoard = `${currentRow}/6\n${currentEmojiBoard}`;
  let blueOrangeBoard = `${currentRow}/6\n${currentEmojiBoard2}`;
  let contrastState = document.querySelector('.contrast-toggle');
  if (currentRow != 0) {
    try {
      let shareText = contrastState.classList.contains('contrast-toggle--blueorange') ? blueOrangeBoard : greenYellowBoard;
      navigator.clipboard.writeText(shareText).then(()=>{alert(`"Copied to clipboard!"\n${shareText}`)});
    } catch (err) {
      console.error("Share failed:", err.message);
    }
  }
  // focusCurrentTile();
}

// SECTION DARK & CONTRAST MODE
function toggleDarkMode() {
  const darkModeButton = document.querySelector(".darkmode-toggle");
  const darkModeCSS = document.querySelector("#darkMode-link");
  const darkModeIconList = document.querySelectorAll('.header-icon-svg');
  darkModeCSS.getAttribute("href") === "light-theme.css" ? darkModeCSS.href = "dark-theme.css" : darkModeCSS.href = "light-theme.css";
  darkModeButton.classList.toggle('darkmode-toggle--white');
  for (let i = 0; i < 4; i++) {
    darkModeIconList[i].classList.toggle('darkmode-svg-toggle--white');
  }
  // focusCurrentTile();;
}

function setColorContrast() {
  let startRowTile = (allInput.length - 1) * 1 - 4;
  // let endRowTile = startRowTile + 4; 
  for (let i = 0; i < 5; i++) {
    if (allInput[startRowTile + i] === solution[i]) {
      if(document.querySelector(".contrast-toggle").classList.contains('contrast-toggle--blueorange')) {
        document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--green');
        document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--blue');
      } else {
        document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--green');
      }
    } else if (solution.includes(allInput[startRowTile + i])) {
      if(document.querySelector(".contrast-toggle").classList.contains('contrast-toggle--blueorange')) {
        document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--yellow');
        document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--orange');
      } else {
        document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--yellow');
      }
    }
  }
}

function toggleContrastMode() {
  const contrastModeButton = document.querySelector(".contrast-toggle");
  const gameTiles = document.querySelectorAll("input[id^='id']");
  contrastModeButton.classList.toggle('contrast-toggle--blueorange');
  for (let i = 0; i < 30; i++) {
    if (gameTiles[i].classList.contains('contrast-toggle--green')) {
      gameTiles[i].classList.toggle('contrast-toggle--blue');
    } else if (gameTiles[i].classList.contains('contrast-toggle--yellow')) {
      gameTiles[i].classList.toggle('contrast-toggle--orange');
    }
  }
  for (let i = 0; i < 28; i++) {
    if (document.getElementById('keyboard' + i).classList.contains('contrast-toggle--green')) {
      document.getElementById('keyboard' + i).classList.toggle('contrast-toggle--blue')
    } else if (document.getElementById('keyboard' + i).classList.contains('contrast-toggle--yellow')) {
      document.getElementById('keyboard' + i).classList.toggle('contrast-toggle--orange')
    }
  }
  if (!document.getElementById('instructionWrapper').classList.contains('hidden')) {
    document.getElementById('tile00').classList.toggle('contrast-toggle--blue');
    document.getElementById('tile11').classList.toggle('contrast-toggle--orange');
  }
  // focusCurrentTile();
}

//SECTION FOCUS TILE
function focusCurrentTile() {
  let status = '';
  let checkLengthNotZero = false;
  let checkLengthEqualToFive = false;
  let checkStatus = false;
  let currentTile = 0;

  if (allInput.length !== 0) {
    checkLengthNotZero = true;
    checkLengthEqualToFive = (allInput.length % 5 === 0);
    status = document.getElementById('id' + (allInput.length - 1)).dataset.status;
    checkStatus = (status !== 'noMatch' && status !== 'match' && status !== 'exactMatch');
  }
  checkLengthNotZero && checkLengthEqualToFive && checkStatus ? (currentTile = allInput.length - 1) : (currentTile = allInput.length);
  console.log(currentTile);

  if (allInput.length < 30) {
    document.getElementById('id' + (currentTile)).focus();
  };
}
