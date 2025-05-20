import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

type Operator = '+' | '-' | '*' | '/' | null;

const CalculatorApp = () => {
  const [display, setDisplay] = useState<string>('0');
  const [fullExpression, setFullExpression] = useState<string>('');
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState<boolean>(false);

  const handleNumberInput = (number: number) => {
    if (waitingForSecondValue) {
      setDisplay(String(number));
      setFullExpression(`${firstValue} ${operator} ${number}`);
      setWaitingForSecondValue(false);
    } else {
      setDisplay(display === '0' ? String(number) : display + number);
      setFullExpression(prev => prev === '' ? String(number) : prev + number);
    }
  };

  const handleDecimalInput = () => {
    if (waitingForSecondValue) {
      setDisplay('0.');
      setFullExpression(`${firstValue} ${operator} 0.`);
      setWaitingForSecondValue(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
      setFullExpression(prev => prev + '.');
    }
  };

  const handleOperatorInput = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (firstValue === null) {
      setFirstValue(inputValue);
      setFullExpression(`${inputValue} ${nextOperator} `);
    } else if (operator) {
      const result = performCalculation();
      setFirstValue(result);
      setFullExpression(`${result} ${nextOperator} `);
      setDisplay(String(result));
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  const performCalculation = (): number => {
    const inputValue = parseFloat(display);
    
    if (firstValue === null) return inputValue;

    switch (operator) {
      case '+':
        return firstValue + inputValue;
      case '-':
        return firstValue - inputValue;
      case '*':
        return firstValue * inputValue;
      case '/':
        return firstValue / inputValue;
      default:
        return inputValue;
    }
  };

  const handleEquals = () => {
    if (firstValue === null) return;

    const result = performCalculation();
    setDisplay(String(result));
    setFullExpression(`${fullExpression} = ${result}`);
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setFullExpression('');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        style={styles.expressionDisplay}
        value={fullExpression}
        editable={false}
      />
      <TextInput
        mode="outlined"
        style={styles.display}
        value={display}
        editable={false}
      />
      
      <View style={styles.row}>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(7)}>
          7
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(8)}>
          8
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(9)}>
          9
        </Button>
        <Button mode="contained" style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('/')}>
          ÷
        </Button>
      </View>
      
      <View style={styles.row}>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(4)}>
          4
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(5)}>
          5
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(6)}>
          6
        </Button>
        <Button mode="contained" style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('*')}>
          ×
        </Button>
      </View>
      
      <View style={styles.row}>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(1)}>
          1
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(2)}>
          2
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(3)}>
          3
        </Button>
        <Button mode="contained" style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('-')}>
          -
        </Button>
      </View>
      
      <View style={styles.row}>
        <Button mode="contained" style={styles.button} onPress={() => handleNumberInput(0)}>
          0
        </Button>
        <Button mode="contained" style={styles.button} onPress={handleDecimalInput}>
          .
        </Button>
        <Button mode="contained" style={[styles.button, styles.equalsButton]} onPress={handleEquals}>
          =
        </Button>
        <Button mode="contained" style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('+')}>
          +
        </Button>
      </View>
      
      <View style={styles.row}>
        <Button mode="contained" style={[styles.button, styles.clearButton]} onPress={handleClear}>
          Limpar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#000000',
  },
  expressionDisplay: {
    marginBottom: 5,
    textAlign: 'right',
    fontSize: 24,
    height: 40,
    backgroundColor: '#595957',
    color: '#ffffff',
  },
  display: {
    marginBottom: 20,
    textAlign: 'right',
    fontSize: 36,
    height: 60,
    backgroundColor: '#595957',
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 4,
    justifyContent: 'center',
    backgroundColor: '#ab8507',
    height: 60,
  },
  operatorButton: {
    backgroundColor: '#54112b',
  },
  equalsButton: {
    backgroundColor: '#ab3c59',
  },
  clearButton: {
    backgroundColor: '#870319',
  },
});

export default CalculatorApp;