const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""  
    }

    // Adiciona dígitos a tela da calculadora
    addDigit(digit) {
        // Checando se a operação atual já tem um ponto adicionado ao número 
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    // Processa todas as operações da calculadora
    processOperation(operation) {
        // Verifica se o valor que está sendo digitado está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // Mudança de operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Obter valor atual e o anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "DEL":
                this.processDelOperator();
            break;
            case "CE":
                this.processClearCurrentOperation();
            break;
            case "C":
                this.processClearOperation();
            break;
            case "=":
                this.processEqualOperator();
            break;
            default:
                return;
        }
    }


    // Alterar valores da tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Verifica se o valor é zero, se for adiciona o valor atual    
            if(previous === 0) {
                operationValue = current;
            }

            // Adiciona o valor para a previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;    
            this.currentOperationText.innerText = "";
        }
    }

    // Alterar operação matemática
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Deleta um dígito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Limpa operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Limpar todas as operações
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Processar uma operação
    processEqualOperator() {
        const operation = previousOperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        // +'nome da variável' tenta o valor que está sendo recebido em numérico

        if(+value >= 0 || value === ".") {
           calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})