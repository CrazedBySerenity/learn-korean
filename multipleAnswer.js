const multiansContainer = document.getElementById("multians-container");

const buttonDictionary = {};

let curAnswer = "";
let answerCallback = () => {};
let nextPromptCallback = () => {};
let hasAnswered = false;

function GetButtons() {
    const buttons = Array.from(document.getElementsByClassName("multians__button"));
    buttons.forEach(button => {
        let id = crypto.randomUUID();
        button.id = id;
        buttonDictionary[id] = {element: button};
        button.addEventListener("click", () => {
            CheckAnswer(button.id);
        })
    });
}

function CheckAnswer(buttonID) {

    if(hasAnswered){
        nextPromptCallback();
        hasAnswered = false;
    }
    else{
        answer = buttonDictionary[buttonID].answer;
        hasAnswered = true;
        if(answer == curAnswer){
            answerCallback("correct");
        }
        else{
            answerCallback("incorrect");
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

// {0: {p, a, d, c, r}, 1: {p, a, d, c, r}, 2: {p, a, d, c, r}, 3 (the correct answer): {p, a, d, c, r} }
var MultipleAnswerPrompt = (prompts) => {
    let buttonArray = Object.values(buttonDictionary);
    shuffle(buttonArray);

    for(let i = 0; i < buttonArray.length; i++){
        button = buttonArray[i];
        button.element.textContent = prompts[i].a;
        buttonDictionary[button.element.id].answer = prompts[i].a;
    }
    curAnswer = buttonDictionary[buttonArray[3].element.id].answer;
}

// prop: {answerCallback, nextPromptCallback,}
var AllowMultiAnswer = (prop) => {
    answerCallback = prop.answerCallback;
    nextPromptCallback = prop.nextPromptCallback;
    hasAnswered = prop.hasAnswered;
    multiansContainer.style.visibility = "visible";
}
GetButtons();