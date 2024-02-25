import {PromptDatabase} from "./Prompts.js";

const input = document.getElementById("answer-input");
const textPrompt = document.getElementById("answer-prompt");
const description = document.getElementById("answer-description");
const romanisation = document.getElementById("answer-romanisation");
const krText = document.getElementById("answer-kr");
const curiosa = document.getElementById("answer-curiosa");
const extraContainer = document.getElementById("answer-extra");
const submitButton = document.getElementById("submit-button");

const correctBg = document.getElementById("answer-bg-correct");
const incorrectBg = document.getElementById("answer-bg-incorrect");

const bgMaxSize = "700px";
const bgMinSize = "0px";

let promptID = null;
let curPrompt = null;

let hasAnswered = false;

// p =  prompt
// a = answer
// d = description
// c = curiosa
// r = romanization

function GeneratePrompt() {
    // Pick a prompt
    // Replace the text

    promptID = Math.floor(Math.random() * PromptDatabase.length)
    curPrompt = PromptDatabase[promptID];
    hasAnswered = false;
    textPrompt.textContent = curPrompt.p;
    description.textContent = curPrompt.d;
    romanisation.textContent = curPrompt.r;
    curiosa.textContent = curPrompt.c;
    krText.textContent = curPrompt.a;
    input.value = "";
    extraContainer.style.visibility = "hidden";

    correctBg.style.height = "400px"
    correctBg.style.width = "400px"
    incorrectBg.style.height = "300px"
    incorrectBg.style.width = "300px"

    // Delete entry from database ?
}

function HandleInput() {
    if(input.value == curPrompt.a){
        console.log("correct");
        extraContainer.style.visibility = "visible";
        hasAnswered = true;
        correctBg.style.height = bgMaxSize;
        correctBg.style.width = bgMaxSize;
        incorrectBg.style.height = bgMinSize;
        incorrectBg.style.width = bgMinSize;
    }
    else if (input.value == curPrompt.r){
        console.log("correct");
        extraContainer.style.visibility = "visible";
        hasAnswered = true;
        correctBg.style.height = bgMaxSize;
        correctBg.style.width = bgMaxSize;
        incorrectBg.style.height = bgMinSize;
        incorrectBg.style.width = bgMinSize;

    }
    
    else {
        console.log("incorrect");
        extraContainer.style.visibility = "visible";
        hasAnswered = true;
        incorrectBg.style.height = bgMaxSize;
        incorrectBg.style.width = bgMaxSize;
        correctBg.style.height = bgMinSize;
        correctBg.style.width = bgMinSize;
    }
    input.value = "";
}

function nextPrompt() {
    if(hasAnswered){
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

GeneratePrompt();