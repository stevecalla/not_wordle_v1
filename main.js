//query selector variables go here 👇
var displaySolution = document.querySelector('#solution');
var inputTilesRow1 = document.querySelector('#inputTilesRow1');
var inputTilesRow2 = document.querySelector('#inputTilesRow2');
var inputTilesRow3 = document.querySelector('#inputTilesRow3');
var inputTilesRow4 = document.querySelector('#inputTilesRow4');
var inputTilesRow5 = document.querySelector('#inputTilesRow5');
var inputTilesRow6 = document.querySelector('#inputTilesRow6');

// function resetGame() {
//   createSolution();
//   for (let i = 0; i < 30; i++) {
//     document.getElementById('id' + (i)).setAttribute("data-status", ""); //remove color
//     document.getElementById('id' + (i)).removeAttribute('disabled'); //remove disabled
//     document.getElementById('id' + (i)).value = ' ';
//     document.getElementById('id' + (0)).focus();
//   }
//   var word = "";
//   var currentInput = [];
//   var allInput = [];
//   var solution = [];

// }

function loadTasks() {
  createSolution();
  createTiles();
  populateHowToTiles();
  document.getElementById('instructionWrapper').focus();

  // document.getElementById('instructionWrapper')).('hidden');
  // document.getElementById('instructionWrapper').classList.remove('hidden');
  

  // setTimeout(() => {
  //   alert('HOW TO PLAY. \nGuess the WORDLE in six tries. \nEach guess must be a valid five-letter word. \nHit the enter button to submit. \nAfter each guess, the color of the tiles will change to show how close your guess was to the word. \nExamples The letter W is in the word and in the correct spot. \nThe letter I is in the word but in the wrong spot. \nThe letter U is not in the word in any spot. \nA new WORDLE will be available each day!')
  // }, 100);

  // document.getElementById('id0').focus();
  // getCharacterDataFromMarvelAPI();
  // constructAPIEndpoint();
}

function populateHowToTiles() {
  const letters = ['W','A','C','K','Y','F','I','L','E','S','V','A','G','U','E']
  for (let i = 0; i < 5; i++) {
    document.getElementById('tile' + (i + 30)).value = letters[i];
    document.getElementById('tile' + (i + 35)).value = letters[i + 5];
    document.getElementById('tile' + (i + 40)).value = letters[i + 10];

    document.getElementById('tile' + (i + 30)).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + (i + 35)).setAttribute('disabled', 'disabled');
    document.getElementById('tile' + (i + 40)).setAttribute('disabled', 'disabled');
  }
  document.getElementById('tile30').style.backgroundColor = '#6aaa64';
  document.getElementById('tile36').style.backgroundColor = '#c9b458';
  document.getElementById('tile43').style.backgroundColor = '#787C7E';
}

function deleteInstructions() {
  document.getElementById('instructionWrapper').classList.add('hidden');
  document.getElementById('inputTilesRow1').classList.remove('hidden');
  document.getElementById('inputTilesRow2').classList.remove('hidden');
  document.getElementById('inputTilesRow3').classList.remove('hidden');
  document.getElementById('inputTilesRow4').classList.remove('hidden');
  document.getElementById('inputTilesRow5').classList.remove('hidden');

  for (let i = 0; i < 30; i++) {
    document.getElementById('id' + (i)).removeAttribute('disabled');
  }

  document.getElementById('id0').focus();
  // document.getElementById('instructionWrapper').classList.remove('hidden');
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

//global variables go here 👇
var word = "";
var currentInput = [];
var allInput = [];
var solution = [];

//event listeners go here 👇
window.addEventListener('load', loadTasks);
// document.addEventListener('keydown', createWord);
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
function inputText() {
  // let key = event.key;
  // keyCode = event.keyCode;

  if ((event.keyCode >=65 && event.keyCode <=90) && currentInput.length != 5 && !document.getElementById('id' + allInput.length).disabled) { //&& (!event.ctrlKey && event.keyCode != 82)
  // let currentPosition = event.target.id.charAt(event.target.id.length - 1)
  // console.log(currentPosition);
  // console.log(allInput.length);

    document.getElementById('id' + allInput.length).focus()
    document.getElementById('id' + allInput.length).value = event.key;

  // const idValue = currentInput.length;
  // createInputString(idValue);
    createInputString();
    // document.getElementById('id' + (allInput.length * 1 + 1)).focus()
  }
}

function deleteCharacter() {
  var currentLength = allInput.length;
  console.log('alllength=', allInput.length);
  console.log(document.getElementById('id' + (currentLength - 1)))
  console.log(document.getElementById('id' + (currentLength - 1)).dataset.status)
  // if (document.getElementById('id' + (currentLength - 1)).disabled === false) {
  // if (document.getElementById('id' + (currentLength - 1)).data-status) {
  if (!document.getElementById('id' + (currentLength - 1)).dataset.status) {
  // if (document.getElementById('id' + (currentLength - 1)).hasAttribute('data-status')) {
    document.getElementById('id' + (currentLength - 1)).setAttribute("data-status", ""); //remove color
    // document.getElementById('id' + (currentLength - 1)).disabled = false; //remove disabled
    document.getElementById('id' + (currentLength - 1)).removeAttribute('disabled'); //remove disabled
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
  let startPosition = currentPosition * 1 - 4;
  let endPosition = currentPosition * 1;
  let dataStatus = [];
  
  // for (let x = startPosition; x < endPosition + 1; x++) {
  
  if (endPosition * 1 + 1 < 30 || document.getElementById('id' + (endPosition * 1)).dataset.status !== 'gameOver') {
    for (let x = 0; x < 5; x++) {

      if (currentInput[x] === solution[x]) {
        document.getElementById('id' + (startPosition + x)).setAttribute('data-status', 'exactMatch');
        dataStatus.push('exactMatch');
      } else if (solution.includes(currentInput[x])) {
        // document.getElementById('id' + (x+1)).style.backgroundColor = 'yellow'
        document.getElementById('id' + (startPosition + x)).setAttribute('data-status', 'match')
        dataStatus.push('match');
      } else {
        document.getElementById('id' + (startPosition + x)).setAttribute('data-status', 'noMatch')
        dataStatus.push('noMatch');
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
        document.getElementById('solution').classList.remove('cloak');
        displaySolution.innerText = '';
        displaySolution.innerText = solution.join('');
        document.getElementById('id29').blur();

    } else {
        console.log('keep playing')
    }
  // document.querySelector('h1').blur();
  dataStatus = [];
  word = '';
}

function createWord(endPosition) {
  console.log('endPosition=', endPosition * 1 + 1);
  console.log('noway=', document.getElementById('id6').value)
  for (let i = 0; i < 5; i++) {
    if (document.getElementById('id5').dataset.status !== 'gameOver') {
      word += currentInput[i];
    }
  }
  // if (event.keyCode >=65 && event.keyCode <=90) {
  //   word += event.key.toUpperCase();
  //   console.log(word);  
  //   }
  console.log(word);
}

var createConfettiAnimation = document.querySelector('#confetti');
function createConfetti() {
  // setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      createConfettiAnimation.innerHTML +=
      `<div class='confetti'></div>`;
    }
  // }, 5000);
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      // console.log('hello')
      createConfettiAnimation.innerHTML = ``;
    }
  }, 5000);
}

function flipGradientPink() {
  bodyBackground.classList.remove('green-gradient');
  bodyBackground.classList.add('pink-gradient');
}

function flipGradientGreen() {
  bodyBackground.classList.remove('pink-gradient');
  bodyBackground.classList.add('green-gradient');
}

//COPY TO CLIPBOARD CODE

document.getElementById("solution").addEventListener("click", async () => {
  console.log('click')
  try {
    const regex = /(<br>)+/g;
    console.log(regex)

    let shareText = document.getElementById("inputTilesRow1").innerHTML.replace(regex, "\n");

    navigator.clipboard.writeText(shareText).then(()=>{alert(`"Copied to clipboard!" ${shareText}`)});

    console.log("Data was shared successfully", shareText);

  } catch (err) {
    console.error("Share failed:", err.message);
  }
});

//API CODE

getWebsterDictionaryAPI = () => {
    console.log('get')
    console.log(word)
    // fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=d6ad76fd-5324-4925-834b-17a06efafce6`) //college dictionary
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=8a8c06ea-289c-450d-90f1-cf98924da140`) //elementary dictionary
        .then((response) => response.json())
        // .then((definition) => console.log(definition[0].shortdef[0]))
        // .then((definition) => displayDefintion(definition[0].shortdef[0]))
        .then((definition) => displayDefintion(definition))
        .catch(err => {
          console.error('error');
          getWebsterDictionaryAPI2();
        });     
};

getWebsterDictionaryAPI2 = () => {
    console.log('get')
    console.log(word)
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=d6ad76fd-5324-4925-834b-17a06efafce6`) //college dictionary
        .then((response) => response.json())
        // .then((definition) => console.log('college=', definition[0].shortdef[0]))
        .then((definition) => displayDefintion(definition))
        // .catch(err => {
        //   console.error('error');
        // });     
};  

function displayDefintion(definition) {
  console.log('elementary=', definition);
  console.log('elementary=', definition[0].shortdef[0]);
  console.log('elementary=', definition[0].hwi.prs[0].sound.audio);
  document.querySelector('#definition').innerText = definition[0].shortdef[0];
  document.querySelector('#definition').innerText = definition[0].shortdef[0];
  // console.log(`https://media.merriam-webster.com/audio/prons/en/us/mp3/p/pajama02.mp3`);
  // console.log(`https://media.merriam-webster.com/audio/prons/en/us/mp3/p/${definition[0].hwi.prs[0].sound.audio}.mp3`);
}