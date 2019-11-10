class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.current === '') return
        if (this.previous !== '') {
            this.computer()
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    computer() {
        let computation;
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case 'x':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            defaulf: 
                return
        }
        this.current = computation;
        this.previous = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.current;
        this.previousOperandTextElement.innerText = this.previous;
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operations]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
console.log(numberButtons)
numberButtons.forEach(element => {
    element.addEventListener('click', () => {
        calculator.appendNumber(element.innerText)
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', ()=> {
    calculator.computer();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
}) 

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
}) 