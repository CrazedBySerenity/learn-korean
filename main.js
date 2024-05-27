import {PromptDatabase} from "./Prompts.js";
import {weatherDatabase} from "./Prompts.js";
import {restaurantDatabase} from "./Prompts.js";

const input = document.getElementById("answer-input");
const textPrompt = document.getElementById("answer-prompt");
const description = document.getElementById("answer-description");
const romanisation = document.getElementById("answer-romanisation");
const krText = document.getElementById("answer-kr");
const curiosa = document.getElementById("answer-curiosa");
const extraContainer = document.getElementById("answer-extra");
const includedWordsText = document.getElementById("included-words");
const submitButton = document.getElementById("submit-button");
const weatherButton = document.getElementById("weather-button");
const restaurantButton = document.getElementById("restaurant-button");
const limitButton = document.getElementById("limit-button");
const limitButtonToast = document.getElementById("limit-toast");
const multiAnswerContainer = document.getElementById("multians-container");
const multiAnswerToggle = document.getElementById("multians-toggle");

const correctBg = document.getElementById("answer-bg-correct");
const incorrectBg = document.getElementById("answer-bg-incorrect");

const bgMaxSize = "700px";
const bgMinSize = "0px";

let promptID = null;
let curPrompt = null;

let hasAnswered = false;
let useLimitedSelection = false;
let multiAnswerActive = false;

let curDatabase = [...PromptDatabase];
let baseDatabase = [...PromptDatabase];

// p = prompt
// a = answer
// d = description
// c = curiosa
// r = romanization

function GeneratePrompt() {
    // Pick a prompt
    // Replace the text

    promptID = Math.floor(Math.random() * curDatabase.length);
    curPrompt = curDatabase[promptID];
    hasAnswered = false;
    textPrompt.textContent = curPrompt.p;
    description.textContent = curPrompt.d;
    romanisation.textContent = curPrompt.r;
    curiosa.textContent = curPrompt.c;
    krText.textContent = curPrompt.a;
    input.value = "";
    extraContainer.style.visibility = "hidden";

    correctBg.style.height = "400px";
    correctBg.style.width = "400px";
    incorrectBg.style.height = "300px";
    incorrectBg.style.width = "300px";

    MultipleAnswerPrompt({0: curDatabase[Math.floor(Math.random() * curDatabase.length)], 1: curDatabase[Math.floor(Math.random() * curDatabase.length)], 2: curDatabase[Math.floor(Math.random() * curDatabase.length)], 3: curPrompt});

    // Delete entry from database ?
}

function SetAnswerStyle (answer) {
    if(answer == "correct"){
        //console.log("correct");
        extraContainer.style.visibility = "visible";
        hasAnswered = true;
        correctBg.style.height = bgMaxSize;
        correctBg.style.width = bgMaxSize;
        incorrectBg.style.height = bgMinSize;
        incorrectBg.style.width = bgMinSize;

        const index = curDatabase.indexOf(curPrompt);
        curDatabase.splice(index, 1);
    }
    else if(answer == "incorrect"){
        //console.log("incorrect");
        extraContainer.style.visibility = "visible";
        hasAnswered = true;
        incorrectBg.style.height = bgMaxSize;
        incorrectBg.style.width = bgMaxSize;
        correctBg.style.height = bgMinSize;
        correctBg.style.width = bgMinSize;

        curDatabase.push(curPrompt);
    }
    else {
        //console.log("error")
        extraContainer.style.visibility = "visible";
        hasAnswered = true;
        incorrectBg.style.height = bgMaxSize;
        incorrectBg.style.width = bgMaxSize;
        correctBg.style.height = bgMinSize;
        correctBg.style.width = bgMinSize;
    }
}

function HandleInput() {
    if(input.value.toUpperCase().trim() == curPrompt.a.toUpperCase().trim()){
        SetAnswerStyle("correct");
    }
    else if (input.value.toUpperCase().trim() == curPrompt.r.toUpperCase().trim()){
        SetAnswerStyle("correct");
    }
    
    else {
        SetAnswerStyle("incorrect");
    }
    input.value = "";
}

function LimitSelection(limit) {
    if(!limit){
        limit = 8;
    }
    curDatabase = [];
    const databaseCopy = [...baseDatabase];
    for(let i = 0; i < limit; i++){
        let newPromptID = Math.floor(Math.random() * databaseCopy.length);
        curDatabase.push(databaseCopy[newPromptID]);
        databaseCopy.splice(newPromptID, 1);
    }

    const curDatabaseCopy = [...curDatabase];
    for(let i = 0; i < 2; i++){
        curDatabase.push(...curDatabaseCopy);
    }
    console.log("Limited selection to: " + curDatabase.length + " words");
    useLimitedSelection = true;
    ShowIncludedWords();
    GeneratePrompt();

    limitButtonToast.style.opacity = "100%";
    setTimeout(() => {
        limitButtonToast.style.transition = "all ease-out 1s"
        limitButtonToast.style.opacity = "0%";
    }, 1500)
}

function nextPrompt() {
    if(hasAnswered){
        if(curDatabase.length <= 0){
            textPrompt.textContent = "";
            romanisation.textContent = "";
            curiosa.textContent = "";
            krText.textContent = "";
            input.value = "";

            description.textContent = "You seem to have mastered all of the currently selected words! Press limit selection again to challenge yourself with a new set of words"
        }
        GeneratePrompt();
    }
    else {
        HandleInput();
    }
}

addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        nextPrompt();
    }
});

submitButton.addEventListener("click", (event) => {
    nextPrompt();
});

limitButton.addEventListener("click", (event) => {
    LimitSelection();
});

weatherButton.addEventListener("click", (event) => {
    setWeatherDatabase();
});

restaurantButton.addEventListener("click", (event) => {
    setRestaurantDatabase();
});

function setWeatherDatabase() {
    curDatabase = [...weatherDatabase];
    baseDatabase = [...weatherDatabase];
    GeneratePrompt();
    ShowIncludedWords();
}

function setRestaurantDatabase() {
    curDatabase = [...restaurantDatabase];
    baseDatabase = [...restaurantDatabase];
    GeneratePrompt();
    ShowIncludedWords();
}

function ShowIncludedWords() {
    includedWordsText.textContent = "Currently including: " + curDatabase.length + " words";
}

multiAnswerToggle.addEventListener("click", (event) => {
    if(multiAnswerActive){
        multiAnswerContainer.style.display = "none";
        multiAnswerToggle.textContent = "Enable multiple choice";
        multiAnswerToggle.style.backgroundColor = "black";
        multiAnswerActive = false;
    }
    else {
        multiAnswerContainer.style.display = "grid";
        multiAnswerToggle.style.backgroundColor = "lightblue";
        multiAnswerToggle.textContent = "Disable multiple choice";
        multiAnswerActive = true;
    }
})


AllowMultiAnswer({answerCallback: SetAnswerStyle, nextPromptCallback: GeneratePrompt, hasAnswered: hasAnswered});

GeneratePrompt();
ShowIncludedWords();