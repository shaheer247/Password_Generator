const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

// symbol
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=0;
//set strength circle color to gray
handleSlider();

//Handle Slider 
function handleSlider(){ //To show changes reflected on UI
    inputSlider.value= passwordLength;
    lengthDisplay.innerText= passwordLength;
};
//set indicator colore
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
};
setIndicator("#ccc");
//get random Integer
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
};

function getRandomNumber(){
    return getRandomInteger(0,9);
};

function getRandomLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
};

function getRandomUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
};
function getRandomSymbols(){
    const random=getRandomInteger(0,symbols.length);
    return symbols.charAt(random);
};

//For Strength 

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

//Copy content
async function copy(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";

    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    //To make copy visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

};

//handling checkboxes
function handlingChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        } 
        if(passwordLength<checkCount){
            passwordLength=checkCount;
            handleSlider();
        }
    });
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handlingChange);
});
//handling slider
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});

//Handling Copy
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copy();
    }
});
//shuffle password
function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}
//handling generate password
generateBtn.addEventListener('click',()=>{
    //no checkbox selected
    if(checkCount<=0){
        return;
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    //remove old password
    password="";

    //placing checked box content
    
    let funArr=[];
    if(upperCaseCheck.checked){
        funArr.push(getRandomUppercase);
    }
    if(lowerCaseCheck.checked){
        funArr.push(getRandomLowercase);
    }
    if(numbersCheck.checked){
        funArr.push(getRandomNumber);
    }
    if(symbolsCheck.checked){
        funArr.push(getRandomSymbols);
    }

    //mandatory addition
    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }
    //Remaining addition
    for(let i=0;i<passwordLength-funArr.length;i++){
        let rdmIndx=getRandomInteger(0,funArr.length);
        password+=funArr[rdmIndx]();
    }
    //shuffling Password
    password=shufflePassword(Array.from(password));

    //showing password in password display
    passwordDisplay.value=password;
    //cal strength
    calcStrength();

});












