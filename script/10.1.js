function addToScreen(value){
    document.getElementById('screen').textContent += value;
}

function clearScreen(){
    document.getElementById('screen').textContent = '';
}

function calculateResult(){
    var result = eval(document.getElementById('screen').textContent);
    document.getElementById('screen').textContent = result;
}