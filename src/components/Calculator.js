import '../css/style.css';
import CalcDisplay from './CalcDisplay';
import CalcKey from './CalcKey';
import { useEffect, useState } from 'react';
import { evaluate, sqrt, inv } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([])
  const [lowerVal, setLowerVal] = useState('0')
  const [mem, setMem] = useState('0')
  const [errorMsg, setErrorMsg] = useState('')
  const [history, setHistory] = useState(Array(5).fill([' ', ' ']))
  const [cursor, setCursor] = useState(null)

  const [waitingForNewExpression, setWaitingForNewExpression] = useState(false)
  const [prevKey, setPrevKey] = useState(null)
  const [historyStart, setHistoryStart] = useState(0)
  const operRegEx = new RegExp('\\+|-|\\*|\\/')
  const helpURL = 'https://github.com/Poplica/react-calculator/blob/master/README.md'

  useEffect(() => {
    if (['Infinity', 'NaN'].includes(lowerVal)) {
      setErrorMsg('Cannot divide by zero')
    } else if (lowerVal.includes('i')) {
      setErrorMsg('Cannot sqrt negative')
    }

    if (lowerVal.length > 12) {
      document.getElementById('lowerVal').style.fontSize = '16px'
    }
  }, [lowerVal])

  useEffect(() => {
    if (errorMsg) {
      setLowerVal('')
    }
  }, [errorMsg])

  const handleMClear = () => {
    setMem('0')
  }

  const handleMRetrieve = () => {
    if (!errorMsg) {
      setLowerVal(mem)
      setPrevKey('MR')
    }
  }

  const handleMStore = () => {
    if (!errorMsg) {
      setMem(lowerVal)
      if (!isNaN(prevKey)) {
        setPrevKey('MS')
      }
    }
  }

  const handleMAdd = () => {
    if (!errorMsg) {
      setMem(myEval([mem, '+', lowerVal]))
    }
  }

  const handleMSubtract = () => {
    if (!errorMsg) {
      setMem(myEval([mem, '-', lowerVal]))
    }
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setPrevKey(null)
    setErrorMsg('')
    setWaitingForNewExpression(false)
  }

  const handleClearEntry = () => {
    if (errorMsg) {
      handleClear()
    } else {
      setLowerVal('0')
      setPrevKey('CE')
    }
  }

  const handleToggleSign = () => {
    if (!errorMsg) {
      setLowerVal(prev => (prev * -1) + '')
      setPrevKey('toggleSign')
    }
  }

  const handleSqrt = () => {
    if (!errorMsg) {
      setLowerVal(prev => sqrt(prev) + '')
      
      setPrevKey('sqrtinv')
    }
  }

  const handleInverse = () => {
    if (!errorMsg) {
      setLowerVal(prev => inv(prev) + '')

      setPrevKey('sqrtinv')
    }
  }
  
  const handlePercent = () => {
    if (!errorMsg) {
      if (expression.length > 1) {
        if (operRegEx.test(expression.slice(-1))) {
          setLowerVal(prev => (myEval(expression.slice(0, -1)) * prev / 100) + '')
        } else {
          setLowerVal(prev => (myEval(expression) * prev / 100) + '')
        }
      } else {
        setLowerVal('0')
      }

      setPrevKey('percent')
    }
  }

  const handleDelete = () => {
    if (!errorMsg && prevKey !== '=' && lowerVal !== '0') {
      setLowerVal(prev => prev.length === 1 ? '0' : prev.slice(0, -1))

      setPrevKey('del')
    }
  }

  const handleDot = () => {
    if (!errorMsg && !lowerVal.includes('.')) {
      if (prevKey === '=' || operRegEx.test(prevKey) 
        || (expression.length === 0 && lowerVal === '0')) {
        // prepend 0 under special cases
        setLowerVal('0.')
      } else {
        setLowerVal(prev => prev + '.')
      }
      
      setWaitingForNewExpression(false)
      setPrevKey('.')
    }
  }

  const handleDigit = ({target}) => {
    if (!errorMsg) {
      const newDigit = target.name

      if (!['=', 'MR', 'MS', 'hist', 'sqrtinv', 'percent'].includes(prevKey) 
        && !operRegEx.test(prevKey)) {
        setLowerVal(prev => prev === '0' ? newDigit : prev + newDigit)
      } else {
        if (waitingForNewExpression) {
          setExpression([])
        }

        setLowerVal(newDigit)
      }

      setWaitingForNewExpression(false)
      setPrevKey(newDigit)
    }
  }

  const handleOperator = ({target}) => {
    if (!errorMsg) {
      const newOperator = target.name
      let newExpression = expression
      let newLowerVal = lowerVal
      
      if (operRegEx.test(prevKey)) {
        newExpression = [...expression.slice(0,-1), newOperator]
      } else if (['.', 'CE', 'toggleSign', 'MR', 'hist', 'paste', 'sqrtinv', 'percent']
        .includes(prevKey)) {
        // existing expression with last item as operator will append the lower value and the newOperator
        // otherwise replace the expression with the evaluation and the newOperator 
        if (lowerVal.slice(-1)[0] === '.') {
          newLowerVal = lowerVal.slice(0,-1)
        }

        if (operRegEx.test(expression.slice(-1))) {
          newExpression = [...expression, newLowerVal]
        } else {
          newExpression = [newLowerVal]
        }

        newLowerVal = myEval(newExpression)
        newExpression = newExpression.concat(newOperator)
      } else if (prevKey === '=') {
        // append to existing expression
        newLowerVal = myEval(expression)
        newExpression = [newLowerVal, newOperator]
      } else {
        // evaluate and display current expression with new operator
        const oldExpression = [...expression, lowerVal]

        newLowerVal = myEval(oldExpression)
        newExpression = oldExpression.concat(newOperator)
      }

      setWaitingForNewExpression(false)
      setExpression(newExpression)
      setLowerVal(newLowerVal)
      setPrevKey(newOperator)
    }
  }

  // helper function. must pass an arr of strings. returns evaluation of the string
  const myEval = (stringArr) => {
    return evaluate(stringArr.join('')) + ''
  }

  const handleEqual = () => {
    if (!errorMsg) {
      let newExpression = expression
      let newLowerVal = lowerVal

      if (!operRegEx.test(expression)) {
        if (prevKey !== '.') {
          newExpression = [lowerVal]
        } else {
          newExpression = [lowerVal.slice(0,-1)]
          newLowerVal = lowerVal.slice(0,-1)
        }
      } else if (['.', 'CE', 'toggleSign', 'MR', 'hist', 'paste', 'sqrtinv', 'percent']
        .includes(prevKey)) {
        // existing expression with last item as operator will append the lowerVal to expression 
        // otherwise repeat expression on the lowerVal
        if (lowerVal.slice(-1)[0] === '.') {
          newLowerVal = lowerVal.slice(0,-1)
        }

        if (operRegEx.test(expression.slice(-1))) {
          newExpression = [...expression, newLowerVal]
        } else {
          // use last operator and operand on curr lowerVal
          const [lastOperator, lastOperand] = expression.slice(-2)

          newExpression = [newLowerVal, lastOperator, lastOperand]
        }

        newLowerVal = myEval(newExpression)
      } else if (prevKey === '=') {
        // repeat last operator and operand
        const [lastOperator, lastOperand] = expression.slice(-2)

        newExpression = [lowerVal, lastOperator, lastOperand]
        newLowerVal = myEval([...expression, lastOperator, lastOperand])
      } else {
        newExpression = [...expression, lowerVal]
        newLowerVal = myEval(newExpression)
      }

      let allEmptyHistories = history.filter(ii => ii[0] === ' ' && ii[1] === ' ')
      let newHistory = history
      if (allEmptyHistories.length !== 0) {
        // edit history directly when there exists empty expressions
        newHistory[5 - allEmptyHistories.length] = [newExpression.join(''), newLowerVal]
        setCursor(5 - allEmptyHistories.length)
      } else {
        newHistory = newHistory.concat([[newExpression.join(''), newLowerVal]])
        setCursor(4)
        setHistoryStart(getAllNonEmptyHistories().length - 4)
      }

      setWaitingForNewExpression(true)
      setHistory(newHistory)
      setExpression(newExpression)
      setLowerVal(newLowerVal)
      setPrevKey('=')
    }
  }

  // returns list of all non empty entries in history
  const getAllNonEmptyHistories = () => {
    return history.filter(ii => ii[0] !== ' ' && ii[1] !== ' ')
  }

  // sets background color of history display index to color
  const setHistoryBGColorOf = (index, color) => {
    const historyPointer = document.getElementsByClassName('history')[index]
    if (historyPointer) {
      historyPointer.style.backgroundColor = color
    }
  }

  // sets font color of history display index to color
  const setHistoryIndexColor = (index, color) => {
    const historyPointer = document.getElementsByClassName('history')[index]
    if (historyPointer) {
      historyPointer.style.color = color
    }
  }

  // sets index to selected style
  const setToSelected = (index) => {
    setHistoryIndexColor(index, 'white')
    setHistoryBGColorOf(index, 'rgb(102, 132, 146)')
  }

  // sets index to default style
  const setToUnselected = (index) => {
    setHistoryIndexColor(index, 'black')
    setHistoryBGColorOf(index, 'transparent')
  }

  // any key press after history has been selected should modify cursor style
  useEffect(() => {
    if (!['hist', '='].includes(prevKey)) {
      // resets cursor focus
      setHistoryIndexColor(cursor, 'black')
      setHistoryBGColorOf(cursor, 'lightblue')
    }

    if (prevKey === 'hist') {
      setToSelected(cursor)
    }
    if (prevKey === '=') {
      setHistoryBGColorOf(cursor, 'lightblue')
    }

    return () => {
      if (cursor !== null) {
        // sets previous cursor's style to default
        setToUnselected(cursor)
      }
    }
  })

  const handleHistory = (displayIndex) => () => {
    if (!errorMsg && history[displayIndex + historyStart][1] !== ' ' && cursor !== null) {
      if (prevKey === '=') {
        setWaitingForNewExpression(true)
      }
      setLowerVal(history[displayIndex + historyStart][1])
      setPrevKey('hist')
      setToSelected(displayIndex)
      setCursor(displayIndex)
    }
  }

  const moveCursorUp = () => {
    if (!errorMsg && cursor !== null) {
      if (cursor === 0) {
        if (cursor + historyStart - 1 === -1) {
          setLowerVal(history[0][1])
        } else {
          setHistoryStart(prev => prev - 1)
          setLowerVal(history[cursor + historyStart - 1][1])
        }

        setToSelected(0)
      } else {
        handleHistory(cursor - 1)()
      }

      if (prevKey === '=') {
        setWaitingForNewExpression(true)
      }
      setPrevKey('hist')
    }
  }

  const moveCursorDown = () => {
    if (!errorMsg && cursor !== null) {
      const nonEmptyHistory = getAllNonEmptyHistories()

      if (cursor + historyStart === nonEmptyHistory.length - 1) {
        setLowerVal(history[cursor + historyStart][1])
        setToSelected(cursor + historyStart)
      } else if (cursor === 4) {
        setHistoryStart(prev => prev + 1)
        setLowerVal(history[cursor + historyStart + 1][1])
      } else {
        handleHistory(cursor + 1)()
      }

      if (prevKey === '=') {
        setWaitingForNewExpression(true)
      }
      setPrevKey('hist')
    }
  }

  const handleKeyPress = (e) => {
    const key = e.key
    const ctrlKeyMap = {
      q: 'M-',
      p: 'M+',
      m: 'MS',
      r: 'MR',
      l: 'MC',
      c: 'copy',
      v: 'paste'
    }
    const shiftKeyMap = {
      Enter: 'MS',
      '=': '+',
      '@': 'sqrt',
      '%': '%'
    }
    const keyMap = {
      Enter: '=',
      r: 'inverse',
      Escape: 'C',
      Delete: 'CE',
      Backspace: 'Del',
      F9: 'toggleSign',
      ArrowUp: 'up',
      ArrowDown: 'down',
      PageUp: 'up',
      PageDown: 'down'
    }
    try {
      if (e.ctrlKey && key in ctrlKeyMap) {
        if (key === 'c') {
          navigator.clipboard.writeText(lowerVal)
        } else if (key === 'v') {
          navigator.clipboard.readText().then(text => setLowerVal(!isNaN(text) ? text : '0'))

          setPrevKey('paste')
        } else {
          document.getElementById(ctrlKeyMap[key]).click()
        }
      } else if (e.shiftKey && key in shiftKeyMap) {
        document.getElementById(shiftKeyMap[key]).click()
      } else if (key === 'F1') {
        window.open(helpURL, '_blank')
      } else if (key in keyMap) {
        document.getElementById(keyMap[key]).click()
      } else {
        document.getElementById(key).click()
      }
    } catch (error) {
      // console.log(error)
    }

    e.target.blur()
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
    }
  })

  return (
    <main className="calculator">
      <div className="menu">
        <a 
          target="_blank"
          name="help"
          href={helpURL}
          rel="noopener noreferrer"
        >Help</a>
      </div>

      <div className="display">
        <div className=" outer-div navigation">
          <CalcKey id="up" name="&#x25B2;" onClick={moveCursorUp}/>
          <CalcKey id="down" name="&#x25BC;" onClick={moveCursorDown}/>
        </div>
        <div className="outer-div">
          {history.slice(historyStart, historyStart + 5).map((i, index) =>
            <div 
              key={index}
              className="history" 
              onClick={handleHistory(index)}
              style={{
                borderBottom: i[1] !== ' ' && i[0] !== ' ' && index !== 4 
                  ? '1px dotted black'
                  : '1px solid transparent'
              }}
            >{i[0]}</div>
          )}
        </div>
        
        <CalcDisplay upperVal={expression} lowerVal={lowerVal} />
        <label id="error">{errorMsg}</label>
        <label id="memory">{mem !== '0' ? 'M' : ''}</label>
      </div>

      <div className="keyboard">
        <CalcKey name="MC" onClick={handleMClear}/>
        <CalcKey name="MR" onClick={handleMRetrieve}/>
        <CalcKey name="MS" onClick={handleMStore}/>
        <CalcKey name="M+" onClick={handleMAdd}/>
        <CalcKey name="M-" onClick={handleMSubtract}/><br/>

        <CalcKey name="Del" onClick={handleDelete}/>
        <CalcKey name="CE" onClick={handleClearEntry}/>
        <CalcKey name="C" onClick={handleClear}/>
        <CalcKey id="toggleSign" name="±" onClick={handleToggleSign}/>
        <CalcKey id="sqrt" name="√" onClick={handleSqrt}/><br/>

        <CalcKey className="button-num" name="7" onClick={handleDigit}/>
        <CalcKey className="button-num" name="8" onClick={handleDigit}/>
        <CalcKey className="button-num" name="9" onClick={handleDigit}/>
        <CalcKey name="/" onClick={handleOperator}/>
        <CalcKey name="%" onClick={handlePercent}/><br/>

        <CalcKey className="button-num" name="4" onClick={handleDigit}/>
        <CalcKey className="button-num" name="5" onClick={handleDigit}/>
        <CalcKey className="button-num" name="6" onClick={handleDigit}/>
        <CalcKey name="*" onClick={handleOperator}/>
        <CalcKey id="inverse" name="1/x" onClick={handleInverse}/><br/>
      </div>

      <div className="keyboard keyboard-bot">
        <div className="bot-left">
          <CalcKey className="button-num" name="1" onClick={handleDigit}/>
          <CalcKey className="button-num" name="2" onClick={handleDigit}/>
          <CalcKey className="button-num" name="3" onClick={handleDigit}/>
          <CalcKey name="-" onClick={handleOperator}/><br/>

          <CalcKey className="button-num button-wide" name="0" onClick={handleDigit}/>
          <CalcKey className="button-num" name="." onClick={handleDot}/>
          <CalcKey name="+" onClick={handleOperator}/>
        </div>
        <div className="bot-right">
          <CalcKey className="button-tall" name="=" onClick={handleEqual}/>
        </div>
      </div>
      
    </main>
  )
}
