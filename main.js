//query selector variables go here 👇
var bodyBackground = document.querySelector('body');
var inputWrapper01 = document.querySelector('#id1');
var inputWrapper02 = document.querySelector('#id2');
var inputWrapper03 = document.querySelector('#id3');
var inputWrapper04 = document.querySelector('#id4');
var inputWrapper05 = document.querySelector('#id5');
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
  if ((key && 'Enter' === key || keyCode && 13 === keyCode) && currentInput.length === 5) {

  // if (key && 'Enter' === key || keyCode && 13 === keyCode) {
    // Do something with `,` key
    // alert('enter');
    evaluateString(currentInput);
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
inputWrapper01.addEventListener('input', moveInput1);
inputWrapper02.addEventListener('input', moveInput2);
inputWrapper03.addEventListener('input', moveInput3);
inputWrapper04.addEventListener('input', moveInput4);
inputWrapper05.addEventListener('input', moveInput5);

//functions and event handlers go here 👇

// function moveInput(currentField, nextField) {
//   // console.log('a')
//   console.log("inputWrapper=",inputWrapper01)
//   console.log("current field=",currentField,"nextfield=",nextField)
//   if (currentField.value.length = currentField.maxLength) {
//     document.getElementById(nextField).focus()
//     document.getElementById(nextField).value = ""
//   }
// }

function deleteCharacter() {
  var currentLength = currentInput.length;
  if (!document.getElementById('id5').disabled) {
    document.getElementById('id' + (currentLength)).value = "";
    document.getElementById('id' + (currentLength)).focus();
    document.getElementById('id' + (currentLength)).setAttribute("data-status", "")
    // console.log('delete=', currentInput);
    currentInput.pop();
    // console.log('delete2=', currentInput)
  }
}

function loadTasks() {
  document.getElementById('id1').focus()
}

function moveInput1(event) {
  // console.log('1')
  document.getElementById('id2').focus()
  document.getElementById('id2').value = ""

  const idValue = '1';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientGreen();
}

function moveInput2(event) {
  // console.log('2')
  document.getElementById('id3').focus()
  document.getElementById('id3').value = "" 

  const idValue = '2';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientPink();
}

function moveInput3(event) {
  // console.log('3')
  document.getElementById('id4').focus()
  document.getElementById('id4').value = "" 

  const idValue = '3';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientGreen();
}

function moveInput4(event) {
  // console.log('4')
  document.getElementById('id5').focus()
  document.getElementById('id5').value = "" 

  const idValue = '4';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientPink();
}

function moveInput5(event) {
  // console.log('5');
  document.getElementById('id6').focus();
  // document.getElementById('id1').value = "";

  const idValue = '5';
  createInputString(idValue);
  // createTileColor(event, idValue);
  flipGradientGreen();
}

function createInputString(idValue) {
  currentInput.push(document.getElementById('id' + idValue).value.toUpperCase());
  console.log(currentInput);
  // if (currentInput.length === 5) {
  //   console.log('length=', currentInput.length)
  //   evaluateString(currentInput)
  // }
}

function evaluateString(currentInput) {
  var test = ['P','L','A','C','E']

  for (let x = 0; x < 5; x++) {
    console.log(currentInput[x])
    document.getElementById('id' + (x+1)).disabled = 'disabled'
    if (test.includes(currentInput[x])) {
      console.log('true')
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'yellow'
      document.getElementById('id' + (x+1)).setAttribute("data-status", "match")
    } else {
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'grey'
      document.getElementById('id' + (x+1)).setAttribute("data-status", "nomatch")
    }
  }

  for (let x = 0; x < 5; x++) {
    console.log(currentInput[x])
    if (currentInput[x] === test[x]) {
      console.log('true')
      // document.getElementById('id' + (x+1)).style.backgroundColor = 'green'
      document.getElementById('id' + (x+1)).setAttribute("data-status", "exact_match")
    } 
  }

}

// function createTileColor(event, idValue) {
//   console.log('event=', event)
//   console.log('id=', event.target.id)

//   if (document.getElementById('id' + idValue).value.toUpperCase() === 'A') {   // if (document.getElementById(event.target.id).value.toUpperCase() === 'A') {
//     // event.target.setAttribute("data-status", "match"); 
//     document.getElementById('id' + idValue).setAttribute("data-status", "match");                       // inputWrapper01.setAttribute("data-status", "match");
//   } else {
//     // event.target.setAttribute("data-status", "nomatch");                        // inputWrapper01.setAttribute("data-status", "nomatch");
//     document.getElementById('id' + idValue).setAttribute("data-status", "nomatch");  
//                                                                                 // document.getElementById('id01').style.backgroundColor = 'white'
//   }
// }

function flipGradientPink() {
  bodyBackground.classList.remove('green-gradient');
  bodyBackground.classList.add('pink-gradient');
}

function flipGradientGreen() {
  bodyBackground.classList.remove('pink-gradient');
  bodyBackground.classList.add('green-gradient');
}