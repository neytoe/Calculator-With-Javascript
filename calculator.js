let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector('.screen');

document.querySelector('.calc-buttons')
.addEventListener("click", function(event){
     buttonClick(event.target.innerText);
});

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else{
         handleNumber(value);   
    }
    rerender();
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    }
    else {
        buffer += value;
    }
    
}

function handleSymbol(value){
    console.log("handleSymbol" + value)
   // console.log(value);
    switch(value){
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + runningTotal;
            previousOperator = null;
            runningTotal = 0;
            break;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            }
            else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
            default:
                handleMath(value);
                break;

    }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    console.log("buffer " + intBuffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    console.log("previous operator " + previousOperator);
    buffer ="0";
}

function rerender(){
    screen.innerText = buffer;
}

function flushOperation(intBuffer){
    console.log("flushOperation" + intBuffer)
    if (previousOperator === "+"){
        runningTotal += intBuffer;
        console.log("hii");
        console.log(runningTotal);
    } else if (previousOperator === "-"){
        runningTotal -= intBuffer;
    } else if (previousOperator === "×"){
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷"){
        runningTotal /= intBuffer;
    }

}