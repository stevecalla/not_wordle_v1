//query selector variables go here 👇
var bodyBackground = document.querySelector('body');
var inputWrapper0 = document.querySelector('#id0');
var inputWrapper1 = document.querySelector('#id1');
var inputWrapper2 = document.querySelector('#id2');
var inputWrapper3 = document.querySelector('#id3');
var inputWrapper4 = document.querySelector('#id4');
var inputWrapper5 = document.querySelector('#id5');
var inputWrapper6 = document.querySelector('#id6');
var inputWrapper7 = document.querySelector('#id7');
var inputWrapper8 = document.querySelector('#id8');
var inputWrapper9 = document.querySelector('#id9');
// var inputWrapper = document.querySelector("[id^='id']");

//global variables go here 👇
var currentInput = [];

//event listeners go here 👇
window.addEventListener('load', loadTasks);
// window.addEventListener("keydown", function (event) { if (13 == event.keyCode) { alert('a okooo enter'); console.log(event.keyCode) } });
// window.addEventListener("keydown", function (event) { if (37 == event.keyCode) { alert('a okooo enter'); console.log(event.keyCode) } });
// window.addEventListener("keydown", function (event) { if (8 == event.keyCode) { alert('a okooo enter'); console.log(event.keyCode)  } });
// window.addEventListener("keydown", function (event) { KeyboardEvent: key='Enter' | code='Enter' { alert('a okooo enter'); console.log(event.keyCode) } });

window.addEventListener("keydown", function(event) { //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code https://dev.to/taufik_nurrohman/bringing-keyboardevent-key-and-keyboardevent-keycode-altogether-for-the-best-keyboard-interaction-experience-jlf
  // console.log(event.keyCode, event.code)
  let key = event.key,
  keyCode = event.keyCode;
  if ((key && 'Enter' === key || keyCode && 13 === keyCode) && (currentInput.length === 5 || currentInput.length === 10)) {

  // if (key && 'Enter' === key || keyCode && 13 === keyCode) {
    // Do something with `,` key
    // alert('enter');
    evaluateString();
    // console.log('enter=', currentInput)
  }
  if (key && 'Backspace' === key || keyCode && 8 === keyCode) {
    // Do something with `,` key
    deleteCharacter();
    // alert('backspace');
  }
  if (key && 'ArrowLeft' === key || keyCode && 37 === keyCode) {
    // Do something with `,` key
    deleteCharacter();
    // alert('arrow');
  }
  }, false);

// window.addEventListener("keydown", function (event) { alert('a okooo enter'); console.log(event.keyCode)  } );
inputWrapper0.addEventListener('input', moveInput0);
inputWrapper1.addEventListener('input', moveInput1);
inputWrapper2.addEventListener('input', moveInput2);
inputWrapper3.addEventListener('input', moveInput3);
inputWrapper4.addEventListener('input', moveInput4);
inputWrapper5.addEventListener('input', moveInput5);
inputWrapper6.addEventListener('input', moveInput6);
inputWrapper7.addEventListener('input', moveInput7);
inputWrapper8.addEventListener('input', moveInput8);
inputWrapper9.addEventListener('input', moveInput9);

//functions and event handlers go here 👇

function deleteCharacter() {
  var currentLength = currentInput.length;
  if (!document.getElementById('id4').disabled) {
    document.getElementById('id' + (currentLength - 1)).value = "";
    document.getElementById('id' + (currentLength - 1)).focus();
    document.getElementById('id' + (currentLength - 1)).setAttribute("data-status", "")
    currentInput.pop();
  }
}

function loadTasks() {
  document.getElementById('id0').focus()
}

function moveInput0(event) {
  // console.log('1')
  document.getElementById('id1').focus()
  document.getElementById('id1').value = ""

  const idValue = '0';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientGreen();
}

function moveInput1(event) {
  // console.log('2')
  document.getElementById('id2').focus()
  document.getElementById('id2').value = "" 

  const idValue = '1';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientPink();
}

function moveInput2(event) {
  // console.log('3')
  document.getElementById('id3').focus()
  document.getElementById('id3').value = "" 

  const idValue = '2';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientGreen();
}

function moveInput3(event) {
  // console.log('4')
  document.getElementById('id4').focus()
  document.getElementById('id4').value = "" 

  const idValue = '3';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientPink();
}

function moveInput4(event) {
  const idValue = '4';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientGreen();
}

function moveInput5(event) {
  document.getElementById('id6').focus()
  const idValue = '5';
  createInputString(idValue);
  flipGradientPink();
}

function moveInput6(event) {
  document.getElementById('id7').focus()
  const idValue = '6';
  createInputString(idValue);
  flipGradientGreen();
}

function moveInput7(event) {
  document.getElementById('id8').focus()
  const idValue = '7';
  createInputString(idValue);
  flipGradientPink();
}

function moveInput8(event) {
  document.getElementById('id9').focus()
  const idValue = '8';
  createInputString(idValue);
  flipGradientGreen();
}

function moveInput9(event) {
  const idValue = '9';
  createInputString(idValue);
  flipGradientPink();
}

function createInputString(idValue) {
  currentInput.push(document.getElementById('id' + idValue).value.toUpperCase());
  console.log(currentInput);
  // if (currentInput.length === 5) {
  //   console.log('length=', currentInput.length)
  //   evaluateString(currentInput)
  // }
}

function evaluateString() {

  let currentPosition = 0;
  if (event.target.id.length > 3) {
    currentPosition = event.target.id.charAt(event.target.id.length - 2) + event.target.id.charAt(event.target.id.length - 1);
  } else {
    currentPosition = event.target.id.charAt(event.target.id.length - 1);
  }

  var solution = ['P','L','A','C','E']

  startPosition = currentPosition * 1 - 4
  endPosition = currentPosition * 1
  
  // for (let x = startPosition; x < endPosition + 1; x++) {
  for (let x = 0; x < 5; x++) {
    // document.getElementById('id' + (x + 1)).disabled = 'disabled'
    console.log('match=', x, startPosition, endPosition, currentInput[x], solution[x])
    if (solution.includes(currentInput[x])) {
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'yellow'
      document.getElementById('id' + (startPosition + x)).setAttribute("data-status", "match")
    } else {
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'grey'
      document.getElementById('id' + (x)).setAttribute("data-status", "nomatch")
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