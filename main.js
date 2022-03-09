//query selector variables go here 👇
var displaySolution = document.querySelector('#solution');
var inputTilesRow1 = document.querySelector('#inputTilesRow1');
// var inputTilesRow2 = document.querySelector('#inputTilesRow2');
// var inputTilesRow3 = document.querySelector('#inputTilesRow3');
// var inputTilesRow4 = document.querySelector('#inputTilesRow4');
// var inputTilesRow5 = document.querySelector('#inputTilesRow5');
// var inputTilesRow6 = document.querySelector('#inputTilesRow6');

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
let gameStats = {
  'gameCount':0, 
  'winCount': 0, 
  'winPercent': 0, 
  'darkMode': false,
  'contrastMode': false,
  'row1': 0,
  'row2': 0,
  'row3': 0,
  'row4': 0,
  'row5': 0,
  'row6': 0,
  'allInput': [], //todo code add allInput array
  'winStreak': 0, //todo code add count of 1 for each consecutive win... so if prior value !== 0 then get prior value plus 1; if lose = 0
  'maxWins': 0, //todo code create array of win streak and take max
  'wordPlayed': [], //todo DONE; todo update wincount if played
}

//event listeners go here 👇
window.addEventListener('load', loadTasks);
document.addEventListener('keydown', inputText);

//SECTION test doubleclick prevent zoom
document.addEventListener('dblclick', function (e) {
  console.log(e)
  console.log(e.screenX, e.screenY)
  e.preventDefault();
});

//functions and event handlers go here 👇
// SECTION LOAD TASKS
function loadTasks() {
  window.moveTo(0, 0);
  createGameInstruction();
  createGameTiles();
  createOnscreenKeyboard();
  createHamburgerMenu();

  // console.log('0=', gameStats, localStorage.getItem('gameStats'));

  if (localStorage.getItem('gameStats') === null) {
    // console.log('1');
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
  } else {
    // console.log('2 localstorage', gameStats, localStorage.getItem('gameStats'));
    gameStats = JSON.parse(localStorage.getItem('gameStats'));
    console.log('b=', gameStats)
  }

  createGameSolution();
  toggleDarkMode(gameStats.darkMode);
  toggleContrastMode(gameStats.contrastMode);
  // createGameStatsMenu();
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


    document.getElementById('tile' + 0 + i).setAttribute('value', letters[i]);
    document.getElementById('tile' + 1 + i).setAttribute('value', letters[i + 5]);
    document.getElementById('tile' + 2 + i).setAttribute('value', letters[i + 10]);

    document.getElementById('tile' + 0 + i).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + 1 + i).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + 2 + i).setAttribute('disabled', 'disabled');
  }
  document.getElementById('tile00').classList.add('contrast-toggle--exactMatch');
  document.getElementById('tile11').classList.add('contrast-toggle--match');
  document.getElementById('tile23').classList.add('contrast-toggle--noMatch');
}

function hideInstructions() {
  // document.getElementById('instructionWrapper').innerHTML = ``;
  document.getElementById('instructionWrapper').classList.toggle('hidden');
  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }
  // document.querySelector('.input-wrapper').classList.remove('hidden');
  // document.querySelector('.keyboard-wrapper').classList.remove('hidden');

  document.getElementById('toggleInstructionsOffIcon').classList.toggle('hidden');
  document.getElementById('toggleInstructionsOnIcon').classList.toggle('hidden');
  // document.getElementById('id0').focus();
  // focusCurrentTile();
  document.getElementById('hamburgerPopupMenu').classList.add('hidden');
}

// SECTION CREATE SOLUTION
function createGameSolution() {
  let randomNumber = Math.floor(Math.floor(Math.random() * wordList.length));
  // let randomNumber = Math.floor(Math.floor(Math.random() * 10));
  solution = Array.from(wordList[randomNumber].toUpperCase());
  console.log(solution, 'random=', randomNumber);
  // console.log(wordList.length);

  if (gameStats.wordPlayed.length >= 1) {
    previousSolution(randomNumber, solution);
  } else {
    // gameStats.wordPlayed.push({'solutionNumber': randomNumber, 'solution': solution, 'word': solution.join(''), 'datePlayed': Date(), 'selectedCount': 0, 'playedCount': 0, 'winCount': 0});
    gameStats.wordPlayed.push({'solutionNumber': randomNumber, 'solution': solution, 'word': solution.join(''), 'datePlayed': Date(), 'selectedCount': 0, 'playedCount': 0, 'winCount': 0, 'boardInput': []});
    gameStats.wordPlayed[0].selectedCount ++;
    gameStats.wordPlayed[0].playedCount ++;
    setLocalStorage('wordPlayed');
  }

  // setLocalStorage('wordPlayed', randomNumber, solution);
  // formatSolution();
}

function previousSolution(randomNumber, solution) {

  gameStats.wordPlayed.push({'solutionNumber': randomNumber, 'solution': solution, 'word': solution.join(''), 'datePlayed': Date(), 'selectedCount': 1, 'playedCount': 1, 'winCount': 0, 'boardInput': []});
  // console.log(gameStats.wordPlayed.length);
  for (let i = 0; i < gameStats.wordPlayed.length - 1; i++) {
    // let evaluation = (gameStats.wordPlayed.length > 1 && randomNumber === gameStats.wordPlayed[i].solutionNumber) ? 'played before' : 'not played before';
    let evaluation = (gameStats.wordPlayed.length > 1 && solution.join('') === gameStats.wordPlayed[i].word) ? 'played before' : 'not played before';
    // console.log(randomNumber, gameStats.wordPlayed[i].solutionNumber, evaluation, gameStats.wordPlayed[i].selectedCount, gameStats.wordPlayed[i].selectedCount % 3); 
    if (evaluation === 'played before' && gameStats.wordPlayed[i].selectedCount % 3 !== 0) {
      gameStats.wordPlayed[i].selectedCount ++;
      gameStats.wordPlayed.pop();
      setLocalStorage('wordPlayed');
      createGameSolution();
      return;
    } else if (evaluation === 'played before' && gameStats.wordPlayed[i].selectedCount % 3 === 0) {
      gameStats.wordPlayed[i].selectedCount ++;
      gameStats.wordPlayed[i].playedCount ++;
      gameStats.wordPlayed.pop();
      setLocalStorage('wordPlayed');
      return;
    } 
  }
  setLocalStorage('wordPlayed');
  // console.log('set')
}

// SECTION CREATE GAME TILES
function createGameTiles() {
  // for (let i = 0; i < 30; i++) {
  //   inputTilesRow1.innerHTML +=
  //   `   
  //     <div>
  //       <input  type='text' 
  //               id=${`id${i}`}
  //               maxlength='1'
  //               name='selection'
  //               value=''
  //               size='1'
  //               disabled='disabled'
  //               data-status='start'
  //               style='text-transform:uppercase' >
  //     </div>
  //   `;
  // }
  for (let i = 0; i < 30; i++) {
    inputTilesRow1.innerHTML +=
    `   
      <input  type='text' 
              id=${`id${i}`}
              maxlength='1'
              name='selection'
              value=''
              size='1'
              disabled='disabled'
              data-status='start'
              style='text-transform:uppercase'>
    `;
  }  
}

// SECTION CREATE ONSCREEN KEYBOARD
function createOnscreenKeyboard() {
  // const alphabetKeys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','ENTER','U','V','W','X','Y','Z','⌫'];
  // const qwertyKeys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','⌫'];
  const alphabetKeys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','ENTER','U','V','W','X','Y','Z','BACK'];
  const qwertyKeys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACK'];
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

  // document.getElementById('keyboard27').innerHTML = '<svg class="backspace-svg-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/><path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/></svg>'
  // document.getElementById('keyboard27').innerHTML = '<svg class="backspace-svg-icon" viewBox="0 0 44.18 44.18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g><path d="M10.625,5.09L0,22.09l10.625,17H44.18v-34H10.625z M42.18,37.09H11.734l-9.375-15l9.375-15H42.18V37.09z"/><polygon points="18.887,30.797 26.18,23.504 33.473,30.797 34.887,29.383 27.594,22.09 34.887,14.797 33.473,13.383 26.18,20.676 18.887,13.383 17.473,14.797 24.766,22.09 17.473,29.383 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
}

function eventKeyBoardButton() {
  console.log('enter key pressed');
  event.key = '13';
  inputText(event.key);
}

// SECTION GET INPUT CHARACTERS
function inputText(event) {
  // console.log(event);
  // console.log(a)
  let key = event.key ? event.key : event.value ? event.value : event;
  keyCode = event.keyCode;
  // console.log(event.key, event.value, event);
  if ((event.keyCode >=65 && event.keyCode <=90 || event.value) && currentInput.length !== 5 && allInput.length < 30 && !document.getElementById('id' + allInput.length).disabled) {
    // document.getElementById('id' + allInput.length).focus();//todo
    document.getElementById('id' + allInput.length).value = key;
    document.getElementById('id' + allInput.length).setAttribute('value', key);
    // console.log('1')
    createInputString(key);
    updateOnscreenKeyboardOnInput(key);
  } else if (key && 'Backspace' === key || keyCode && 8 === keyCode || key && 'ArrowLeft' === key || keyCode && 37 === keyCode) {
    // if (key && 'Backspace' === key || keyCode && 8 === keyCode) {
        console.log('backspace')
        // console.log('2')
        deleteInputText();
  } else if (currentInput.length === 5 && (key && 'Enter' === key || keyCode && 13 === keyCode || event === '13')) {
    // console.log('3')
    evaluateCurrentInput(event);
  } else if (event.keyCode <65 || event.keyCode >90) {
    // console.log('4')
    event.preventDefault();
  }
  // console.log(allInput.length, document.getElementById('id' + allInput.length).id, document.getElementById('id' + (allInput.length - 1)).value)
}

function createInputString(key) {
  currentInput.push(key.toUpperCase());
  allInput.push(key.toUpperCase());
  setLocalStorage('allInput', allInput);
  // gameStats.wordPlayed[i].boardInput = allInput;
  // setLocalStorage('wordPlayed');
  for (let i = 0; i < gameStats.wordPlayed.length; i++) {
    if (gameStats.wordPlayed[i].word === solution.join('')) {
      gameStats.wordPlayed[i].boardInput = allInput;
      setLocalStorage('wordPlayed');
    }
  }
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
      createGameStatsMenu(); 
      // console.trace();
  } else {
    // console.log('Not a word');
    displayMessage('NOT IN WORD LIST');
  }
}

function clearStorage() {
  localStorage.clear();
  displayMessage('GAME HISTORY DELETED. GAME WILL RESET.');
  setTimeout(() => {
    refreshButton();
  }, 2000);
}

function displayMessage(message) {
  document.getElementById('copyNotification').classList.remove('hidden');
  document.getElementById('copyNotification').innerText = message;
  setTimeout(() => {
    document.getElementById('copyNotification').classList.add('hidden');
  }, 3000);
}

function deleteInputText() {
  let status = '';
  let deleteTile = '';
  if (allInput.length !== 0) {
    status = document.getElementById('id' + (allInput.length - 1)).dataset.status;
    deleteTile = document.getElementById('id' + (allInput.length - 1));
  };

  for (let i = 0; i < 28; i++) {
    // console.log(document.getElementById('keyboard' + i).value, allInput[allInput.length - 1])
    if (document.getElementById('keyboard' + i).value === allInput[allInput.length - 1]) {
      document.getElementById('keyboard' + i).classList.remove('contrast-toggle-selected--exactMatch');
      document.getElementById('keyboard' + i).classList.remove('contrast-toggle-selected--match');
      document.getElementById('keyboard' + i).classList.remove('contrast-toggle-selected--noMatch');
    }
  }

  if ((status !== 'noMatch' && status !== 'match' && status !== 'exactMatch') && allInput.length !== 0) {
    deleteTile.setAttribute('data-status', 'start'); //remove color
    deleteTile.removeAttribute('disabled'); //remove disabled
    deleteTile.value = '';

    // console.log(allInput.length)
    // console.log(document.getElementById('id' + allInput.length));
    if (allInput.length < 30) {
      document.getElementById('id' + allInput.length).setAttribute('value', '');
    }
    // console.trace();

    // deleteTile.focus();//todo
    currentInput.pop();
    allInput.pop();
    setLocalStorage('allInput', allInput);
    // gameStats.wordPlayed[i].boardInput = allInput;
    // setLocalStorage('wordPlayed');
    for (let i = 0; i < gameStats.wordPlayed.length; i++) {
      if (gameStats.wordPlayed[i].word === solution.join('')) {
        gameStats.wordPlayed[i].boardInput = allInput;
        setLocalStorage('wordPlayed');
      }
    }
    // determineCurrentTile(allInput);
  }
}

// SECTION DETERMINE EACH ROW / WIN
function evaluateString(event) {
  determineCurrentRow();
}

function determineCurrentRow() {
  let startRowTile = ((allInput.length - 1) * 1 - 4);
  let endRowTile = (startRowTile + 4); //FIX delete endrow variable
  let currentRow = ((allInput.length) / 5);
  // if ((startRowTile + 5) < 29) {
  //   document.getElementById('id' + (startRowTile + 5)).focus();
  // } //todo
  assignMatchStatus(startRowTile, endRowTile, currentRow);
}

function assignMatchStatus(startRowTile, endRowTile, currentRow) {
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
    // console.log('status=', i, startRowTile, startRowTile + 5, currentInput[i], solution[i], document.getElementById('id' + (startRowTile + i)).dataset.status)
  }
  updateOnscreenKeyboard();
  determineWinStatus(startRowTile, endRowTile, dataStatus, currentRow);
}

function updateOnscreenKeyboard() {
  const alphabetKeys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','ENTER','U','V','W','X','Y','Z','BACK'];
  const qwertyKeys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','ENTER','X','C','V','B','N','M','BACK'];
  let exactMatchInput = [];
  let matchInput = [];
  for (let i = 0; i < allInput.length; i++) {
    // console.log('solution=', solution, 'allInput[i]=', allInput[i])
    if (solution.includes(allInput[i]) && document.getElementById('id' + i).dataset.status === 'exactMatch') {
      exactMatchInput.push(allInput[i]);
      // console.log('matchInput=', exactMatchInput);
      // console.log(document.getElementById('id' + i))
    } else if (solution.includes(allInput[i]) && document.getElementById('id' + i).dataset.status === 'match') {
        matchInput.push(allInput[i]);
        // console.log('matchInput=', matchInput);
        // console.log(document.getElementById('id' + i));
    }
  }

  for (let i = 0; i < 28; i++) {
    document.getElementById('keyboard' + i).classList.remove('contrast-toggle-selected--exactMatch');
    document.getElementById('keyboard' + i).classList.remove('contrast-toggle-selected--match');
    document.getElementById('keyboard' + i).classList.remove('contrast-toggle-selected--noMatch');
  }

  for (let i = 0; i < 28; i++) {
    if (exactMatchInput.includes(qwertyKeys[i])) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle--exactMatch');
    } else if (matchInput.includes(qwertyKeys[i])) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle--match');
    } else if (allInput.includes(qwertyKeys[i])) {
     document.getElementById('keyboard' + i).classList.add('contrast-toggle--noMatch');
    }
  }
}

function updateOnscreenKeyboardOnInput(key) {
  const qwertyKeys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','ENTER','X','C','V','B','N','M','BACK'];

  for (let i = 0; i < 28; i++) {    
    // console.log(key.toUpperCase(), solution[currentInput.length - 1], key.toUpperCase === solution[currentInput.length - 1], qwertyKeys[i], key.toUpperCase() === qwertyKeys[i])
    if (key.toUpperCase() === solution[currentInput.length - 1] && key.toUpperCase() === qwertyKeys[i]) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle-selected--exactMatch');
    } else if (solution.includes(key.toUpperCase()) && key.toUpperCase() === qwertyKeys[i]) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle-selected--match');
    } else if (key.toUpperCase() === qwertyKeys[i]) {
      document.getElementById('keyboard' + i).classList.add('contrast-toggle-selected--noMatch');
    }
  }
}

function determineWinStatus(startRowTile, endRowTile, dataStatus, currentRow) {
  let winningCondition = !dataStatus.includes('match') && !dataStatus.includes('noMatch');
  let gameOverCondition = startRowTile + 4 === 29;
  let currentRow2 = `row${currentRow}`;

  if (winningCondition) {
    //TODO POPUP BOX WITH WINNER AND INFO... GAME BOARD
    setLocalStorage('gameCount', gameStats.gameCount + 1); 
    for (let i = startRowTile + 5; i < 30; i++) {
      document.getElementById('id' + (i)).setAttribute('data-status', 'gameOver');
      document.getElementById('id' + (i)).setAttribute('disabled', 'disabled');
      document.getElementById('id' + (i)).blur();
    }
    if (gameStats.winCount === null) {
      setLocalStorage('winCount', 1);
      setLocalStorage('winStreak', 1); 
    } else {
      // console.trace();
      setLocalStorage('winCount', (gameStats.winCount + 1));
      setLocalStorage(currentRow2, (gameStats[currentRow2] + 1));
      setLocalStorage('winStreak', gameStats.winStreak + 1); 
      setLocalStorage('maxWins', gameStats.winStreak < gameStats.maxWins ? gameStats.maxWins : gameStats.winStreak); 
    }
    for (let i = 0; i < gameStats.wordPlayed.length; i++) {
      // console.log(gameStats.wordPlayed[i].word === solution.join(''))
      if (gameStats.wordPlayed[i].word === solution.join('')) {
        // setLocalStorage('winCount', gameStats.wordPlayed[i].winCount + 1);
        gameStats.wordPlayed[i].winCount = gameStats.wordPlayed[i].winCount + 1;
        setLocalStorage('wordPlayed'); 
        // gameStats.wordPlayed[i].boardInput = allInput;
        // setLocalStorage('wordPlayed');
      }
    }
    document.getElementById('id29').blur();
    createConfetti();
  } else if (gameOverCondition) {
    //TODO POPUP BOX WITH PLAY AGAIN, WINNING WORD, DEFINITION... GAME BOARD
    document.getElementById('id29').blur();
    setLocalStorage('gameCount', gameStats.gameCount + 1);
    setLocalStorage('winStreak', 0); 
    getWebsterDictionaryAPI();
  } else {
        //TODO KEEP PLAYING ANIMATION
        console.log('keep playing')
  }  
  setLocalStorage('winPercent', (gameStats.winCount / gameStats.gameCount));   
  createGameStatsMenu(); 
  resetCurrentInput();
}

function resetCurrentInput() {
  currentInput = [];
}

// SECTION SET LOCAL STORAGE
function setLocalStorage(variable, value) {
  // gameStats[variable] = value;
  // localStorage.setItem('gameStats', JSON.stringify(gameStats));

  if (variable === 'wordPlayed') {
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
  } else {
    gameStats[variable] = value;
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
  }
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
  // currentEmojiBoard += tileEmoji + '\n';
  // currentEmojiBoard2 += tileEmoji2 + '\n';

  // currentEmojiBoard += tileEmoji + '<br>';
  // currentEmojiBoard2 += tileEmoji2 + '<br>';

  currentEmojiBoard += `<p class='game-board'>${tileEmoji}</p>`;
  currentEmojiBoard2 += `<p class='game-board'>${tileEmoji2}</p>`;

  // console.log('currentMiniBoard=\n', currentEmojiBoard);
  // console.log('currentMiniBoard2=\n', currentEmojiBoard2);
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
  document.getElementById('solution').classList.toggle('hidden');
  document.getElementById('definition').classList.toggle('hidden');
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

  document.getElementById('hamburgerPopupMenu').classList.add('hidden');
  // document.getElementById('solution').classList.add('hidden');
  // document.getElementById('definition').classList.add('hidden');
  document.getElementById('createGameStatsMenu').classList.add('hidden');

  document.getElementById('instructionWrapper').classList.add('hidden');
  document.getElementById('toggleInstructionsOffIcon').classList.remove('hidden');
  document.getElementById('toggleInstructionsOnIcon').classList.add('hidden');
  // hideInstructions();

  document.getElementById('confettiWrapper').classList.add('hidden');

  setTimeout(() => {
    document.getElementById('solution').classList.add('hidden');
    document.getElementById('definition').classList.add('hidden');
  }, 7000);

  // document.getElementById('instructionWrapper').innerHTML = `
  //   <div class='instx-title'>
  //     <p class='hidden'>x</p>
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
function createHamburgerMenu() {
  document.getElementById('hamburgerPopupMenu').innerHTML =
  `
    <div class='click-to-hide-x' onclick='hamburgerMenuShowHide()'>
      <p class='click-to-hide'>x</p>
    </div>
    <div class='hamburger-menu'>
      <div class='mode-description'>
        <p class='mode'>Dark Mode</p>
        <p class='toggle-detail'>Toggle dark / light mode</p>
      </div>
      <div class='hamburger-toggle'>
        <svg class='darkMode-toggle' id='toggleDarkOffIcon' onclick='toggleDarkModeButton()' width='42px' height'42px' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 8.378906 7 7.773438 7.066406 7.1875 7.1875 C 6.894531 7.246094 6.59375 7.320313 6.3125 7.40625 C 3.792969 8.203125 1.742188 10.085938 0.71875 12.5 C 0.605469 12.769531 0.492188 13.03125 0.40625 13.3125 C 0.136719 14.164063 0 15.058594 0 16 C 0 16.929688 0.144531 17.8125 0.40625 18.65625 C 0.410156 18.664063 0.402344 18.679688 0.40625 18.6875 C 1.203125 21.207031 3.085938 23.257813 5.5 24.28125 C 5.769531 24.394531 6.03125 24.507813 6.3125 24.59375 C 7.164063 24.863281 8.058594 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 9 9 C 12.878906 9 16 12.121094 16 16 C 16 19.878906 12.878906 23 9 23 C 5.121094 23 2 19.878906 2 16 C 2 15.757813 2.007813 15.515625 2.03125 15.28125 C 2.386719 11.742188 5.363281 9 9 9 Z M 14.625 9 L 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 L 14.625 23 C 16.675781 21.347656 18 18.828125 18 16 C 18 13.171875 16.675781 10.652344 14.625 9 Z"/></svg>
        <svg class='darkmode-toggle hidden' id='toggleDarkOnIcon' onclick='toggleDarkModeButton()' width="42px" height="42px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 4.039063 7 0 11.035156 0 16 C 0 20.964844 4.039063 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 C 19.121094 23 16 19.878906 16 16 C 16 12.121094 19.121094 9 23 9 Z"/></svg>
      </div>
    </div>
    <div class='hamburger-menu'>
      <div class='mode-description'>
        <p class='mode'>High Contrast Mode</p>
        <p class='toggle-detail'>For improved color vision</p>
      </div>
      <div class='hamburger-toggle'>
        <svg class='' id='toggleContrastOffIcon' onclick='toggleContrastModeButton()' width="42px" height="42px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 8.378906 7 7.773438 7.066406 7.1875 7.1875 C 6.894531 7.246094 6.59375 7.320313 6.3125 7.40625 C 3.792969 8.203125 1.742188 10.085938 0.71875 12.5 C 0.605469 12.769531 0.492188 13.03125 0.40625 13.3125 C 0.136719 14.164063 0 15.058594 0 16 C 0 16.929688 0.144531 17.8125 0.40625 18.65625 C 0.410156 18.664063 0.402344 18.679688 0.40625 18.6875 C 1.203125 21.207031 3.085938 23.257813 5.5 24.28125 C 5.769531 24.394531 6.03125 24.507813 6.3125 24.59375 C 7.164063 24.863281 8.058594 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 9 9 C 12.878906 9 16 12.121094 16 16 C 16 19.878906 12.878906 23 9 23 C 5.121094 23 2 19.878906 2 16 C 2 15.757813 2.007813 15.515625 2.03125 15.28125 C 2.386719 11.742188 5.363281 9 9 9 Z M 14.625 9 L 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 L 14.625 23 C 16.675781 21.347656 18 18.828125 18 16 C 18 13.171875 16.675781 10.652344 14.625 9 Z"/></svg>
        <svg class='hidden' id='toggleContrastOnIcon' onclick='toggleContrastModeButton()' width="42px" height="42px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 4.039063 7 0 11.035156 0 16 C 0 20.964844 4.039063 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 C 19.121094 23 16 19.878906 16 16 C 16 12.121094 19.121094 9 23 9 Z"/></svg>
      </div>
    </div>
    <div class='hamburger-menu'>
      <div class='mode-description'>
        <p class='mode'>View Instructions</p>
        <p class='toggle-detail'>Toggle to view instructions</p>
      </div>
      <div class='hamburger-toggle'>
        <svg class='hidden' id='toggleInstructionsOffIcon' onclick='hideInstructions()' width="42px" height="42px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 8.378906 7 7.773438 7.066406 7.1875 7.1875 C 6.894531 7.246094 6.59375 7.320313 6.3125 7.40625 C 3.792969 8.203125 1.742188 10.085938 0.71875 12.5 C 0.605469 12.769531 0.492188 13.03125 0.40625 13.3125 C 0.136719 14.164063 0 15.058594 0 16 C 0 16.929688 0.144531 17.8125 0.40625 18.65625 C 0.410156 18.664063 0.402344 18.679688 0.40625 18.6875 C 1.203125 21.207031 3.085938 23.257813 5.5 24.28125 C 5.769531 24.394531 6.03125 24.507813 6.3125 24.59375 C 7.164063 24.863281 8.058594 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 9 9 C 12.878906 9 16 12.121094 16 16 C 16 19.878906 12.878906 23 9 23 C 5.121094 23 2 19.878906 2 16 C 2 15.757813 2.007813 15.515625 2.03125 15.28125 C 2.386719 11.742188 5.363281 9 9 9 Z M 14.625 9 L 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 L 14.625 23 C 16.675781 21.347656 18 18.828125 18 16 C 18 13.171875 16.675781 10.652344 14.625 9 Z"/></svg>
        <svg class='' id='toggleInstructionsOnIcon' onclick='hideInstructions()' width="42px" height="42px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 9 7 C 4.039063 7 0 11.035156 0 16 C 0 20.964844 4.039063 25 9 25 L 23 25 C 27.957031 25 32 20.957031 32 16 C 32 11.042969 27.957031 7 23 7 Z M 23 9 C 26.878906 9 30 12.121094 30 16 C 30 19.878906 26.878906 23 23 23 C 19.121094 23 16 19.878906 16 16 C 16 12.121094 19.121094 9 23 9 Z"/></svg>
      </div>
    </div>

    <div class='hamburger-menu'>
      <div class='mode-description'>
        <p class='mode'>Start New Game</p>
        <p class='toggle-detail'>Click to start new game</p>
      </div>
      <div class='hamburger-toggle'>
        <svg class='toggleDefinition' id='headerIconSVG' onclick='refreshButton()' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"/><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"/></svg>
      </div>
    </div>

    <div class='hamburger-menu'>
      <div class='mode-description'>
        <p class='mode'>Solution/Definition</p>
        <p class='toggle-detail'>Click for solution/definition</p>
      </div>
      <div class='hamburger-toggle'>
        <svg class='toggleDefinition' id='headerIconSVG' onclick='definitionButton()' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 459.319 459.319" style="enable-background:new 0 0 459.319 459.319;" xml:space="preserve"><g><path d="M141.288,189.821h-23.685V145.28h23.528v-23.69h21.016v23.374h23.681v44.707h-23.681v0.151H141.288z M60.801,398.87 c0.012,1.1,0.03,1.921,0.042,2.459c0.006,0.331-0.053,0.638-0.071,0.963c0.739,18.224,15.755,32.817,34.146,32.817h303.76v-33.461 c0-6.68,5.421-12.105,12.105-12.105c6.679,0,12.105,5.426,12.105,12.105v45.565c0,6.686-5.427,12.105-12.105,12.105H93.091 c-0.629,0-1.235-0.089-1.847-0.183c-30.505-1.91-54.757-27.261-54.757-58.245c0-0.71,0.085-1.396,0.109-2.099 c-0.375-35.943,0-309.36,0.042-339.109c-0.047-0.423-0.127-0.827-0.127-1.259C36.511,26.205,62.719,0,94.938,0h19.343h293.535 h2.955c6.685,0,12.105,5.423,12.105,12.105v342.139c0,6.679-5.421,12.104-12.105,12.104c-0.071,0-0.13-0.023-0.201-0.023 c-0.887,0.213-1.82,0.354-2.772,0.354H94.918C76.736,366.674,61.859,380.948,60.801,398.87z M278.347,121.59h94.425v20.862h-23.685 v23.69h-23.525v23.685h-23.69v23.533h-23.536v49.882h120.792v-26.209h-94.584v-20.859h23.69V192.49h23.525v-23.69h23.689V145.28 h23.679V95.237h-120.78V121.59z M224.949,192.49h56.265v-26.353h-56.265V192.49z M91.41,263.229h26.2v-47.056h23.679v-0.15h44.54 v47.219h26.354v-120.79h-23.688v-23.841H164.81V95.237h-26.202v23.684h-23.685v23.69H91.389v120.618H91.41z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      </div>
    </div>

    <div class='hamburger-menu'>
      <div class='mode-description'>
        <p class='mode'>Delete Game History</p>
        <p class='toggle-detail'>Clear all history & settings</p>
      </div>
      <div class='hamburger-toggle'>
        <svg  class='toggleDefinition' id='headerIconSVG' onclick='clearStorage()' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 473 473" style="enable-background:new 0 0 473 473;" xml:space="preserve"><g><path d="M317.667,214.42l5.667-86.42h20.951V38h-98.384V0H132.669v38H34.285v90h20.951l20,305h140.571 c23.578,24.635,56.766,40,93.478,40c71.368,0,129.43-58.062,129.43-129.43C438.715,275.019,385.143,218.755,317.667,214.42z 	M162.669,30h53.232v8h-53.232V30z M64.285,68h250v30h-250V68z M103.334,403L85.301,128H293.27l-5.77,87.985 c-61.031,10.388-107.645,63.642-107.645,127.586c0,21.411,5.231,41.622,14.475,59.43H103.334z M309.285,443 c-54.826,0-99.43-44.604-99.43-99.43s44.604-99.429,99.43-99.429s99.43,44.604,99.43,99.429S364.111,443,309.285,443z"/><polygon points="342.248,289.395 309.285,322.358 276.322,289.395 255.109,310.608 288.072,343.571 255.109,376.533 276.322,397.746 309.285,364.783 342.248,397.746 363.461,376.533 330.498,343.571 363.461,310.608 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
     </div>
    </div>

  </div>
      `;
  // document.getElementById('hamburgerPopupMenu').classList.toggle('hidden');
}

function hamburgerMenuShowHide() { 
  document.getElementById('hamburgerPopupMenu').classList.toggle('hidden');

  // document.getElementById('hamburgerPopupMenu').classList.add('hidden');
  document.getElementById('solution').classList.add('hidden');
  document.getElementById('definition').classList.add('hidden');
  document.getElementById('createGameStatsMenu').classList.add('hidden');

  // document.getElementById('instructionWrapper').classList.add('hidden');
  // hideInstructions();

  document.getElementById('confettiWrapper').classList.add('hidden');

  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }
  
}

function statsMenuShowHide() { 
  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }
  document.getElementById('hamburgerPopupMenu').classList.add('hidden');
  document.getElementById('solution').classList.add('hidden');
  document.getElementById('definition').classList.add('hidden');
  // document.getElementById('createGameStatsMenu').classList.add('hidden');
  
  document.getElementById('instructionWrapper').classList.add('hidden');
  document.getElementById('toggleInstructionsOffIcon').classList.remove('hidden');
  document.getElementById('toggleInstructionsOnIcon').classList.add('hidden');
  // hideInstructions();
  document.getElementById('confettiWrapper').classList.add('hidden');
  document.getElementById('copyNotification').classList.add('hidden');
  
  document.getElementById('createGameStatsMenu').classList.toggle('hidden');
  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }
  // console.trace();
  createGameStatsMenu();
}

// function windowClick() {
//   // console.log(window.screen, window.innerHeight, window.innerWidth, navigator.appVersion);
//   window.alert(`height=${window.screen.height}\nwidth=${window.screen.width}\n${navigator.appVersion}`);
//   document.getElementById('instructionWrapper').classList.remove('hidden');
//   document.getElementById('instructionWrapper').innerHTML  = `height=${window.screen.height}\nwidth=${window.screen.width}\n${navigator.appVersion}`;
//   console.log(document.getElementById('instructionWrapper').innerHTML = `height=${window.screen.height}\nwidth=${window.screen.width}\n${navigator.appVersion}`)
// }

function getKeyboardButton() {
//   // createOnscreenKeyboard();
//   // document.querySelector('.keyboard-wrapper').classList.toggle('hidden');
//   // focusCurrentTile();
}

function refreshButton() {
  location.reload(true);
  // focusCurrentTile();
}

function toggleDarkModeButton() {
  document.getElementById('toggleDarkOffIcon').classList.toggle('hidden');
  document.getElementById('toggleDarkOnIcon').classList.toggle('hidden');
  document.querySelector('.darkmode-toggle-button').blur();
  toggleDarkMode();
  // focusCurrentTile();
  event.preventDefault;
} 

function toggleContrastModeButton(event) {
  document.getElementById('toggleContrastOffIcon').classList.toggle('hidden');
  document.getElementById('toggleContrastOnIcon').classList.toggle('hidden');
  document.querySelector('.contrast-toggle').blur();
  toggleContrastMode();
  // createGameStatsMenu();
  // focusCurrentTile();
  // event.preventDefault;
} 

function definitionButton() {
  getWebsterDictionaryAPI();
  hamburgerMenuShowHide();
  // document.getElementById('createGameStatsMenu').classList.toggle('hidden');
  // hideInstructions();

  // focusCurrentTile();
} 

function copyGameBoardButton() {
  // let currentRow = Math.floor(allInput.length / 5);
  // let greenYellowBoard = `${currentRow}/6\n${currentEmojiBoard}`;
  // let blueOrangeBoard = `${currentRow}/6\n${currentEmojiBoard2}`;
  // const contrastModeCSS = document.querySelector("#contrastMode-link");
  // if (currentRow != 0) {
  //   try {
  //     let gameBoard = contrastModeCSS.getAttribute("href") === "contrast-theme-blue.css" ? blueOrangeBoard : greenYellowBoard;
  //     navigator.clipboard.writeText(gameBoard).then(()=>{alert(`"Copied to clipboard!"\n${gameBoard}`)});
  //   } catch (err) {
  //     console.error("Share failed:", err.message);
  //   }
  // }

  // statsMenuShowHide();

  document.getElementById('hamburgerPopupMenu').classList.add('hidden');
  document.getElementById('solution').classList.add('hidden');
  document.getElementById('definition').classList.add('hidden');
  document.getElementById('createGameStatsMenu').classList.add('hidden');
  document.getElementById('instructionWrapper').classList.add('hidden');
  document.getElementById('confettiWrapper').classList.add('hidden');
  document.querySelector('.spacer1').classList.add('hidden');
  document.querySelector('.spacer2').classList.add('hidden');
  // document.getElementById('copyNotification').classList.add('hidden');

  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }


  copyToClipboard('body');


  document.querySelector('.spacer1').classList.remove('hidden');
  document.querySelector('.spacer2').classList.remove('hidden');

  // copyToClipboard2();
  // focusCurrentTile();
}

function createGameStatsMenu() {
  let percentage = Math.round(gameStats.winPercent * 100) ? Math.round(gameStats.winPercent * 100) : '0';
  // let currentRow = Math.floor(allInput.length / 5);
  let greenYellowBoard = `${currentEmojiBoard}`;
  let blueOrangeBoard = `${currentEmojiBoard2}`;
  const contrastModeCSS = document.querySelector("#contrastMode-link");
  let gameBoard = contrastModeCSS.getAttribute("href") === "contrast-theme-blue.css" ? blueOrangeBoard : greenYellowBoard;
  document.getElementById('createGameStatsMenu').innerHTML = `
    <div class='click-to-hide' id='clickToHideX' onclick='statsMenuShowHide()'>x</div>
    <p class='win-description'>GAME INFORMATION</p>
    <div class='gameStats-menu'>
      <div class='stat-description'>
        <p class=''>Played<br></p>
        <p class=''>${gameStats.gameCount}</p>
      </div>
      <div class='stat-description'>
        <p class=''>Wins</p>
        <p class=''>${gameStats.winCount}</p>
      </div>
      <div class='stat-description'>
        <p class=''>Win%</p>
        <p class=''>${percentage}%</p>
      </div>
    </div>
    <div class='win-stats-wrapper'>
      <p class='win-description'>Win Distribution</p>
      <div class='bars-wrapper' id='progressBarWrapper'></div>
    </div>
    <div class='current-stats' id='currentStats'>
      <div class='gameBoard-wrapper' id='gameBoardWrapper'>
        <p class='current-game-text'>Game Board</p>
        ${gameBoard}
      </div>
      <div class='spacer'></div>
      <div class='streak-stats'>
        <div class='description-container'>
          <p class='description'>Current Streak</p>
          <p class='description'>${gameStats.winStreak}</p>
        </div>
        <div class='description-container'>
          <p class='description'>Max Streak</p>
          <p class='description'>${gameStats.maxWins}</p>
        </div>
      </div>
    </div>
    <div class='stats-buttons' id='statsButtons'>
      <button class='play-again-button' onclick="refreshButton()">${'Play\nAgain'}</button>
      <div class='stats-button-spacer'></div>
      <div>
        <button class='copy-buttons' onclick="copyToClipboard('createGameStatsMenu')">Share Stats</button>
        <input class='copy-buttons' id="btn" onclick="copyToClipboard('gameBoardWrapper')" type="button" value="Share Board"></input>
      </div>
    </div>
  `;

  for (let i = 1; i < 7; i++) {
    let rowWinCount = `${gameStats['row' + i]}`
    let rowWidth = Math.round((145 * (gameStats['row' + i] / gameStats.winCount))) ? Math.round((145 * (gameStats['row' + i] / gameStats.winCount))) : 15;
    let rowWinPercent = `${gameStats['row' + i] / gameStats.winCount ? Math.round((gameStats['row' + i] / gameStats.winCount) * 100) : '0'}%`
    document.getElementById('progressBarWrapper').innerHTML += `
      <p class='row-number'>${i}</p>
      <div class='bar-wrapper'>
        <div class='progress-bar2' style='width: ${rowWidth}px'>${rowWinCount}</div>
      </div>
      <p class='win-percent'>${rowWinPercent}</p> 
    `
  };
  // console.trace();
  // document.getElementById('hamburgerPopupMenu').classList.toggle('hidden');
}

function copyToClipboard(element) {
  let range, selection;
  let referenceNode = document.getElementById(element);
  console.log(referenceNode);

  if (document.body.createTextRange) {
    console.log('1=', document.body.createTextRange);
    range = document.body.createTextRange();
    range.moveToElementText(referenceNode);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(referenceNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.getElementById('statsButtons').classList.add('hidden');
  document.getElementById('clickToHideX').classList.add('hidden');
  document.execCommand('copy');
  document.getElementById('statsButtons').classList.remove('hidden');
  document.getElementById('clickToHideX').classList.remove('hidden');
  window.getSelection().removeAllRanges();
  // document.getElementById("btn").value="Copied";

  // document.getElementById('copyNotification').innerText = 'Screen Capture Copied To Clipboard';
  // document.getElementById('copyNotification').classList.toggle('hidden');
  // setTimeout(() => {
  //   document.getElementById('copyNotification').classList.add('hidden');
  // }, 3000);
  displayMessage('Screen Capture Copied To Clipboard');
}

// SECTION DARK & CONTRAST MODE
function toggleDarkMode(storageDarkValue) {
  const darkModeCSS = document.querySelector("#darkMode-link");
  const darkModeIconList = document.querySelectorAll('.header-icon-svg');
  // console.trace();
  // console.log(storageDarkValue);

  if (storageDarkValue === true) {
    console.log('1')
    darkModeCSS.href = "dark-theme.css";
    document.getElementById('toggleDarkOffIcon').classList.toggle('hidden');
    document.getElementById('toggleDarkOnIcon').classList.toggle('hidden');
  } else if (storageDarkValue === null || storageDarkValue === false) {
    return;
  } else {
    darkModeCSS.getAttribute("href") === "light-theme.css" ? storageDarkValue = true : storageDarkValue = false;
    darkModeCSS.getAttribute("href") === "light-theme.css" ? darkModeCSS.href = "dark-theme.css" : darkModeCSS.href = "light-theme.css";
    setLocalStorage('darkMode', storageDarkValue);
  }
  // console.log(darkModeIconList, darkModeIconList.length);
  for (let i = 0; i < darkModeIconList.length; i++) {
    darkModeIconList[i].classList.toggle('darkmode-svg-toggle--white');
  }
  // focusCurrentTile();
}

function setColorContrast() {
  let startRowTile = (allInput.length - 1) * 1 - 4;
  // let endRowTile = startRowTile + 4; 
  for (let i = 0; i < 5; i++) {
    if (allInput[startRowTile + i] === solution[i]) {
      document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--exactMatch');
    } else if (solution.includes(allInput[startRowTile + i])) {
      document.getElementById('id' + (startRowTile + i)).classList.add('contrast-toggle--match');
    }
  }
  // console.trace();
}

function toggleContrastMode(storageContrastValue) {
  let contrastModeCSS = document.querySelector("#contrastMode-link");
  const blue = 'contrast-theme-blue.css';
  const green = 'contrast-theme-green.css';
  if (storageContrastValue === true) {
    contrastModeCSS.href = blue;
    document.getElementById('toggleContrastOffIcon').classList.toggle('hidden');
    document.getElementById('toggleContrastOnIcon').classList.toggle('hidden');
  } else if (storageContrastValue === null || storageContrastValue === false) {
    return;
  } else {
    contrastModeCSS.getAttribute('href') === "contrast-theme-green.css" ? storageContrastValue = true : storageContrastValue = false;
    contrastModeCSS.getAttribute('href') === "contrast-theme-green.css" ? contrastModeCSS.href = blue : contrastModeCSS.href = green;
    setLocalStorage('contrastMode', storageContrastValue);
  }
  // console.trace();
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
