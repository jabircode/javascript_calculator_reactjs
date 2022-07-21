const calData = [
  {id:'nine', value: 9},
  {id:'eight', value: 8},
  {id:'seven', value: 7},
  {id:'clear', value: 'AC'},
  
  {id:'six', value: 6},
  {id:'five', value: 5},
  {id:'four', value: 4},
  {id:'divide', value: '/'},
  
  
  {id:'three', value: 3},
  {id:'two', value: 2},
  {id:'one', value: 1},
  {id:'subtract', value: '-'},
  
  {id:'zero', value: 0},
  {id:'decimal', value: '.'},
  {id:'add', value: '+'},
  
  {id:'multiply', value: '*'},
  
  
  {id:'equals', value: '='},
  
]

const operators = ['AC', '/', '*', '+', '-']

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const Display = ({ input, output}) => (
  <div className='output'>
    <span className='result'>{output}</span>
    <span id='display' className='input'>{input}</span>
    </div>
)

const Key = ({ keyData:{id, value}, handleInput}) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
    </button>
)

const Keypad = ({handleInput}) => (
  <div className='keys'>
    {calData.map((key) => (
    <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
    </div>
)

const App = () => {
  const [input , setInput] = React.useState('0')
  const [output, setOutput] = React.useState('')
  const [calculatorData, setCalculatorData] = React.useState('')
  
  const handleSubmit = () => {
    console.log({ calculatorData })

    const total = eval(calculatorData)
    setInput(total)
    setOutput(`${total} = ${total}`)
    setCalculatorData(`${total}`)
  }
  
  const handleClear = () => {
    setInput('0')
    setOutput('')
    setCalculatorData('')
  }
  
  const handleNumbers = (value) => {
    
    if(!calculatorData.length) {
      setInput(`${value}`)
      setCalculatorData(`${value}`)
    } else {
      if(value === 0 && (calculatorData === '0' || input === '0')) {
        setCalculatorData(`${calculatorData}`)
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1)
        const isLastCharOperator = 
              lastChar === '+' || operators.includes(lastChar)
        
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`)
        setCalculatorData(`${calculatorData}${value}`)
      }
    }
    
  }
  
  const handleDecimal = () => {
    
    const lastChar = calculatorData.charAt(calculatorData.length - 1)
    
    if(!calculatorData.length) {
      setInput('0.')
      setCalculatorData('0.')
    } else {
      if(lastChar === '+' || operators.includes(lastChar)) {
        setInput('0.')
        setCalculatorData(`${calculatorData} 0.`)
      } else {
        setInput(
          lastChar === '.' || input.includes('.') ? `${input}` : `${input}.`
        )
        const formattedValue = 
              lastChar === '.' || input.includes('.') ? `${calculatorData}` : `${calculatorData}.`
        setCalculatorData(formattedValue)
      }
    }
    
  }
  
  const handleOperators = (value) => {
    
    if(calculatorData.length) {
      setInput(`${value}`)
      
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2)
      const beforeLastCharIsOperator = operators.includes(beforeLastChar) || beforeLastChar === '+'
      const lastChar = calculatorData.charAt(calculatorData.length - 1)
      const lastCharIsOperator = operators.includes(lastChar) || lastChar === '+'
      const validOutput = value === '*' ? '*' : value
      
      if(
      (lastCharIsOperator && value !== '-') || beforeLastCharIsOperator && lastCharIsOperator) {
        if(beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length-2)}${value}`
          setCalculatorData(updatedValue)
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length-1)}${validOutput}`)
        } 
    } else {
          setCalculatorData(`${calculatorData}${validOutput}`)
      }
    }
    
  }
  
  const handleInput = (value) => {
    const number = numbers.find((num) => num === value)
    const operator = operators.find((op) => op === value)
    
   switch (value) {
     case '=':
       handleSubmit()
       break
     case 'AC':
       handleClear()
       break
     case number:
       handleNumbers(value)
       break
     case '.':
       handleDecimal(value)
       break
     case operator:
       handleOperators(value)
       break
     default:
       break
   }
  }
  
  const handleOutput = () => {
    setOutput(calculatorData)
  }
  
  React.useEffect(() => {
    handleOutput()
  }, [calculatorData])
  
  return (
    <div className='container'>
      <div className='calculator'>
        <Display input={input} output={output} />
          <Keypad handleInput={handleInput} />
        </div>
      </div>
    )
}


ReactDOM.render(<App />, document.getElementById('app'))
