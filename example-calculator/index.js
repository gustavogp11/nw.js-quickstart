const MAX_SIZE_CALC_HISTORY = 5;
const INPUT_CHARS_REGEX = /[0-9]|\+|\-|\*|\/|\(|\)|\./;
const calcHistory = [];
const IDENTITY = () => { };
let onBeforeKeyPress = IDENTITY;
function addHistory(str) {
    calcHistory.push(str);
    if (calcHistory.length > MAX_SIZE_CALC_HISTORY) {
        calcHistory.splice(0, 1);
    }
    renderCalcHistory();
}
function getCalcInput() {
    return document.querySelector('#calc-input');
}
function renderCalcHistory() {
    const pnl = document.querySelector('#history');
    pnl.innerHTML = '';
    calcHistory.forEach(historyRecord => {
        const node = document.createElement("div");
        node.innerHTML = historyRecord;
        pnl.prepend(node);
    });
}
function calcCompute() {
    const input = getCalcInput();
    const expr = input.value;
    if (expr.length) {
        input.value = eval(expr);
        addHistory(expr + " = " + input.value);
    }
    onBeforeKeyPress = () => {
        input.value = '';
    }
}
document.body.onload = function () {
    const input = getCalcInput();
    document.querySelectorAll('#calc-table td').forEach(e => {
        e.onclick = () => {
            const btnValue = e.innerHTML;
            if (INPUT_CHARS_REGEX.test(btnValue)) {
                input.value = input.value + btnValue;
            } else if (btnValue === 'e') {
                input.value = Math.E;
            } else if (btnValue === 'C') {
                input.value = '';
            } else if (btnValue === '=') {
                calcCompute();
            }
        }
    });
    document.body.onkeypress = function (ev) {
        onBeforeKeyPress();
        if (ev.key === 'Enter') {
            calcCompute();
        } else {
            input.focus();
            onBeforeKeyPress = IDENTITY;
        }
    }
    input.onkeypress = function (ev) {
        if (!INPUT_CHARS_REGEX.test(ev.key)) {
            ev.preventDefault();
        }
    }
    document.body.onkeyup = function (ev) {
        console.log(ev.keyCode);
        switch (ev.keyCode) {
            case 46: /*Supr*/
                input.value = ''
                break;
            case 8: /*Del*/
                onBeforeKeyPress();
                break;
        }
    }
}