import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([])
  const [lowerVal, setLowerVal] = useState('0')
  const [prevKey, setPrevKey] = useState(null)
  const [mem, setMem] = useState('0')
  const [errorMsg, setErrorMsg] = useState('')
  const [history, setHistory] = useState(Array(5).fill([' ', ' ']))
  const [cursor, setCursor] = useState(null)
  const [historyStart, setHistoryStart] = useState(0)
  const operRegEx = new RegExp('\\+|-|\\*|\\/')

  useEffect(() => {
    if (lowerVal === 'Infinity') {
      setExpression([])
      setLowerVal('0')
      setPrevKey(null)
      setErrorMsg('Cannot divide by zero')
    }
  }, [lowerVal])

  const handleMClear = () => {
    setMem('0')
  }

  const handleMRetrieve = () => {
    setLowerVal(mem)
    setPrevKey('MR')
  }

  const handleMStore = () => {
    setMem(lowerVal)
    if (!isNaN(prevKey))
      setPrevKey('MS')
  }

  const handleMAdd = () => {
    setMem(myEval([mem, '+', lowerVal]))
  }

  const handleMSubtract = () => {
    setMem(myEval([mem, '-', lowerVal]))
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setPrevKey(null)
    setErrorMsg('')
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setPrevKey('CE')
  }

  const handleToggleSign = () => {
    setLowerVal(prev => (prev * -1) + '')
    setPrevKey('toggleSign')
  }

  const handleSqrt = () => {
    // sqrt and inverse are handled the same way


  }
  
  const handlePercent = () => {


    setPrevKey()
  }

  const handleInverse = () => {

    setPrevKey('inverse')
  }

  const handleDelete = () => {
    if (prevKey !== '=' && lowerVal !== '0') {
      setLowerVal(prev => prev.length === 1 ? '0' : prev.slice(0, -1))

      setPrevKey('del')
    }
  }

  const handleDot = () => {
    if (!lowerVal.includes('.')) {
      if (prevKey === '=' || operRegEx.test(prevKey) 
      || (expression.length === 0 && lowerVal === '0'))
      // prepend 0 under special cases
        setLowerVal('0.')
      else
        setLowerVal(prev => prev + '.')
      
      setPrevKey('.')
    }
  }

  const handleDigit = ({target}) => {
    const newDigit = target.name

    if (!['=', 'MR', 'MS', 'hist'].includes(prevKey) && !operRegEx.test(prevKey)) {
      // overwrite 0. otherwise, append
      setLowerVal(prev => prev === '0' ? newDigit : prev + newDigit)
    } else {
      // next input overwrites lowerVal
      if (prevKey === '=' || (prevKey === 'hist' && lowerVal === '0'))
        setExpression([])
      
      setLowerVal(newDigit)
    }

    setPrevKey(newDigit)
  }

  const handleOperator = ({target}) => {
    const newOperator = target.name
    let newExpression = expression
    let newLowerVal = lowerVal
    
    if (operRegEx.test(prevKey)) {
      // replace operator
      newExpression = [...expression.slice(0,-1), newOperator]
    } else if (['.', 'CE', 'toggleSign', 'MR', 'hist'].includes(prevKey)) {
      // existing expression with last item as operator will append the lower value and the newOperator
      // otherwise replace the expression with the evaluation and the newOperator
      // remove dot
      if (lowerVal.slice(-1)[0] === '.')
        newLowerVal = lowerVal.slice(0,-1)

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

    // state updates
    setExpression(newExpression)
    setLowerVal(newLowerVal)
    setPrevKey(newOperator)
  }

  const myEval = (stringArr) => {
    return evaluate(stringArr.join('')) + ''
  }

  const handleEqual = () => {
    let newExpression = expression
    let newLowerVal = lowerVal

    if (!operRegEx.test(expression)) {
      if (prevKey !== '.') {
        newExpression = [lowerVal]
      } else {
        // remove dot from expression and lowerVal
        newExpression = [lowerVal.slice(0,-1)]
        newLowerVal = lowerVal.slice(0,-1)
      }
    } else if (['.', 'CE', 'toggleSign', 'MR', 'hist'].includes(prevKey)) {
      // existing expression with last item as operator will append the lowerVal to expression 
      // otherwise repeat expression on the lowerVal
      // remove dot
      if (lowerVal.slice(-1)[0] === '.')
        newLowerVal = lowerVal.slice(0,-1)

      // was last item in expression was an operator?
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
      // just append
      newExpression = [...expression, lowerVal]
      newLowerVal = myEval(newExpression)
    }

    // state updates
    let allEmptyHistories = getAllEmptyHistories()
    let newHistory = history
    if (allEmptyHistories.length !== 0) {
      // edit history directly when there exists empty expressions
      newHistory[5 - allEmptyHistories.length] = [newExpression.join(''), newLowerVal]
      setCursor(5 - allEmptyHistories.length)
      // setHistoryBGColorOf(5 - allEmptyHistories.length, 'lightblue')
    } else {
      newHistory = newHistory.concat([[newExpression.join(''), newLowerVal]])
      setCursor(4)
      // setHistoryBGColorOf(4, 'lightblue')
      setHistoryStart(prev => prev + 1)
    }
    setHistory(newHistory)
    setExpression(newExpression)
    setLowerVal(newLowerVal)
    setPrevKey('=')
  }

  const getAllEmptyHistories = () => {
    return history.filter(i => i[0] === ' ' && i[1] === ' ')
  }

  const setHistoryBGColorOf = (index, color) => {
    const historyPointer = document.getElementsByClassName('history')[index]
    if (historyPointer)
      historyPointer.style.backgroundColor = color
  }

  const setHistoryIndexColor = (index, color) => {
    const historyPointer = document.getElementsByClassName('history')[index]
    if (historyPointer)
      historyPointer.style.color = color
  }

  const setToSelected = (index) => {
    setHistoryIndexColor(index, 'white')
    setHistoryBGColorOf(index, 'rgb(102, 132, 146)')
  }

  // index is always between 0-4
  const handleHistory = (index) => () => {
    if (history[index + historyStart][1] !== ' ' && cursor !== null) {
      setLowerVal(history[index + historyStart][1])
      setPrevKey('hist')
      setToSelected(index)
      setCursor(index)
    }
  }

  useEffect(() => {
    if (prevKey === 'hist')
      setToSelected(cursor)
    if (prevKey === '=')
      setHistoryBGColorOf(cursor, 'lightblue')
    return () => {
      if (cursor !== null) {
        // resets previous cursor style to default
        setHistoryIndexColor(cursor, 'black')
        setHistoryBGColorOf(cursor, 'transparent')
      }
    }
  }, [cursor])

  const moveCursorUp = () => {
    if (cursor !== null)
      if (cursor === 0) {
        if (cursor + historyStart - 1 !== -1) {
          setHistoryStart(prev => prev - 1)
          handleHistory((cursor + historyStart) % 5 - 1)
        }
        // handleHistory(cursor + historyStart)()
        // if (historyStart - 1 > -1)
        //   setHistoryStart(prev => prev - 1)
      } else {
        // console.log(`${historyStart}, ${cursor}`)
        handleHistory(cursor - 1)()
      }
  }

  const moveCursorDown = () => {
    if (cursor !== null) {
      const nonEmptyHistoryLength = 5 - getAllEmptyHistories().length - 1
      if (cursor === 4) {
        handleHistory(cursor)()
      } else if (cursor === nonEmptyHistoryLength) {
        handleHistory(nonEmptyHistoryLength)()
      } else {
        handleHistory(cursor + 1)()
      }
    }
  }

  // enter-> equal, r-> inverse, pgup/pgdown->up/down, 
  // up/down->cursor up/down, f1->help, f2-> edit current cursor
  // copy+paste
  const handleKeyPress = (e) => {
    const key = e.key
    console.log(key)
    const ctrlKeyMap = {
      q: 'M-',
      p: 'M+'
    }
    const shiftKeyMap = {
      Enter: 'MS'
    }
    const keyMap = {
      Enter: '=',
      r: '1/x',
      Escape: 'C',
      Delete: 'CE',
      Backspace: 'Del',
      F9: '±',
      ArrowUp: 'up',
      ArrowDown: 'down',
      PageUp: 'up',
      PageDown: 'down'
    }
    try {
      if (e.ctrlKey && key in ctrlKeyMap) {
        // ctrl key modifier
        if (key === 'c') {

        } else if (key === 'v') {

        } else {
          document.getElementById(ctrlKeyMap[key]).click()
        }
      } else if (e.shiftKey && key in shiftKeyMap) {
        // shift key modifier
        document.getElementById(shiftKeyMap[key]).click()
      } else if (key in keyMap) {
        document.getElementById(keyMap[key]).click()
      } else {
        document.getElementById(key).click()
      }
    } catch (error) {
      // console.log(error)
      // console.log(`input was not mapped`)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
    }
  }, [cursor])

  return (
    <main className="calculator">
      <div className="menu"><span>V</span>iew&nbsp;&nbsp; <span>E</span>dit&nbsp;&nbsp; <span>H</span>elp</div>

      <div className="navigation">
        <CalcKey id="up" onClick={moveCursorUp}/>
        <CalcKey id="down" onClick={moveCursorDown}/>
      </div>

      <div className="display">
        <div className="outer-div">
          {history.slice(historyStart, historyStart + 5).map((i, index) =>
            <div 
              key={index}
              className="history" 
              onClick={handleHistory(index)}
              style={{
                // all border-bottom should be 1px dotted except for the last one and blank expressions
                borderBottom: i[1] !== ' ' && i[0] !== ' ' && index !== 4 ? '1px dotted black': '1px solid transparent'
              }}
            >{i[0]}</div>
          )}
        </div>
        
        <CalcDisplay upperVal={expression} lowerVal={lowerVal} />
        <div className="error">{errorMsg}</div>
        <div className="m-icon">{mem !== '0' ? 'M' : ''}</div>
      </div>

      <div className="keyboard">
      </div>

      <div className="keyboard-bot">
        <CalcKey name="MC" onClick={handleMClear}/>
        <CalcKey name="MR" onClick={handleMRetrieve}/>
        <CalcKey name="MS" onClick={handleMStore}/>
        <CalcKey name="M+" onClick={handleMAdd}/>
        <CalcKey name="M-" onClick={handleMSubtract}/><br/>

        <CalcKey name="Del" onClick={handleDelete}/>
        <CalcKey name="CE" onClick={handleClearEntry}/>
        <CalcKey name="C" onClick={handleClear}/>
        <CalcKey name="±" onClick={handleToggleSign}/>
        <CalcKey name="√" onClick={handleSqrt}/><br/>

        <CalcKey name="7" onClick={handleDigit}/>
        <CalcKey name="8" onClick={handleDigit}/>
        <CalcKey name="9" onClick={handleDigit}/>
        <CalcKey name="/" onClick={handleOperator}/>
        <CalcKey name="%" onClick={handlePercent}/><br/>

        <CalcKey name="4" onClick={handleDigit}/>
        <CalcKey name="5" onClick={handleDigit}/>
        <CalcKey name="6" onClick={handleDigit}/>
        <CalcKey name="*" onClick={handleOperator}/>
        <CalcKey name="1/x" onClick={handleInverse}/><br/>

        <CalcKey name="1" onClick={handleDigit}/>
        <CalcKey name="2" onClick={handleDigit}/>
        <CalcKey name="3" onClick={handleDigit}/>
        <CalcKey name="-" onClick={handleOperator}/><br/>

        <CalcKey name="0" onClick={handleDigit}/>
        <CalcKey name="." onClick={handleDot}/>
        <CalcKey name="+" onClick={handleOperator}/>
        <CalcKey name="=" onClick={handleEqual}/>
      </div>
    </main>
  )
}
