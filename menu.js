const menuItems = document.getElementsByClassName("category__menu__item");
const baseOffset = 80;
const offsetIncrease = 70;
const newSize = 50;
let baseSize = 20;

let menuOpen = false;

baseSize = menuItems[0].getBoundingClientRect().width;

function OpenMenu(){

    console.log(newSize)
    if(menuOpen){
        for(let i = 0; i < menuItems.length; i++){
            element = menuItems[i];
            if(window.innerWidth <= 1000) {
                element.style.display = "none";
                element.style.width = `${baseSize}px`;
                element.style.height = `${baseSize}px`;
                element.style.color = "transparent";
            }
            else {
                element.style.transform = `translateY(0px)`;
                element.style.width = `${baseSize}px`;
                element.style.height = `${baseSize}px`;
                element.style.color = "transparent";
            }
        }
        menuItems[0].parentNode.style.display = "none";
        console.log("menu closed")
        menuOpen = false;
        return;
    }
    let curOffset = baseOffset;
    for(let i = 0; i < menuItems.length; i++){
        element = menuItems[i];

        if(window.innerWidth <= 1000) {
            element.style.display = "flex";
            element.style.width = `${newSize * 2}px`;
            element.style.height = `${newSize}px`;
            element.style.color = "white";
        }

        else {
        element.style.transform = `translateY(${curOffset}px)`;
        element.style.width = `${newSize * 2}px`;
        element.style.height = `${newSize}px`;
        element.style.color = "white";
        curOffset += offsetIncrease;
        console.log(menuItems[0])
        }
    }
    menuItems[0].parentNode.style.display = "flex";
    console.log("menu opened")
    menuOpen = true;
}