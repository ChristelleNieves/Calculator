class Calculator {
    constructor(previousOpTextElement, currentOpTextElement) {
        this.previousOpTextElement = previousOpTextElement
        this.currentOpTextElement = currentOpTextElement
        this.clear()
    }

    clear() {
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }

    appendNum(num) {
        if (num == '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + num.toString()
    }

    chooseOp(op) {
        if (this.currentOp == '') return
        if (this.previousOp != '') {
            this.compute()
        }
        this.op = op
        this.previousOp = this.currentOp
        this.currentOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOp)
        const curr = parseFloat(this.currentOp)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.op) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '/':
                computation = prev / curr
                break
            case '*':
                computation = prev * curr
                break
            default:
                return
        }
        this.currentOp = computation
        this.op = undefined
        this.previousOp = ''
    }

    getDisplayNum(num) {
        const stringNum = num.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return integerDisplay.toString() + '.' + decimalDigits.toString()
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOpTextElement.innerText = this.getDisplayNum(this.currentOp)
        if (this.op != null) {
            this.previousOpTextElement.innerText =
                this.getDisplayNum(this.previousOp).toString() + this.op.toString()

        } else {
            this.previousOpTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOpTextElement = document.querySelector('[data-previous-op]')
const currentOpTextElement = document.querySelector('[data-current-op]')

const calculator = new Calculator(previousOpTextElement, currentOpTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})