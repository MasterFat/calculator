import { useState, useEffect } from "react"
import { CalculateBtn } from "./CalculateBtn.jsx"

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const operators = ["+", "-", "*", "/"]

const INITIAL_VALUE = "0"

const checkOperation = (operation) => {
  const arr = []
  const numberAndDotReg = /\d|\./
  const operatorReg = /[+\-*/]/
  let current = ""
  for (let i = 0; i < operation.length; i++) {
    // 抓出其中一個字
    const char = operation[i]
    // 檢查是否為數字或點
    if (numberAndDotReg.test(char)) {
      current += char // 如果是數字，把它堆積到 current
    } else if (operatorReg.test(char)) {
      // 如果是符號，那就把剛剛堆積的 current 和這次抓到的符號放到陣列裡
      arr.push(current)
      arr.push(char)
      current = ""
    }
  }
  arr.push(current)
  return arr
}

const opFirst = {
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
}
const opAfter = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
}

const calculate = (operationArr) => {
  //先做乘除運算
  const opFirstArr = []
  const multiplyAndDivideReg = /[*/]/
  const numberAndDotReg = /\d|\./
  const plusAndMinusReg = /[+-]/
  let current = ""
  for (let i = 0; i < operationArr.length; i++) {
    //抓出其中一個字
    const char = operationArr[i]
    //如果是當下是數字或點而且前面的符號不是 * or / 的話
    if (numberAndDotReg.test(char) && operationArr[i - 1] !== "*" && operationArr[i - 1] !== "/") {
      current += char //就把數字堆積到current
    } else if (multiplyAndDivideReg.test(char)) {
      //如果是 * or / 的話,就直接在current裡面做乘除運算
      current = opFirst[char](parseFloat(current), parseFloat(operationArr[i + 1]))
    } else if (plusAndMinusReg.test(char)) {
      //如果是 + or - 的話,就把之前堆積或已經乘除運算好的 current 跟 這次抓到的符號 放到陣列裡,然後將current清空
      opFirstArr.push(current)
      opFirstArr.push(char)
      current = ""
    }
  }
  //再將最後輸入的數字放到陣列裡
  opFirstArr.push(current)

  //再接著做加減運算
  let result = parseFloat(opFirstArr[0])
  for (let i = 1; i < opFirstArr.length; i += 2) {
    const operator = opFirstArr[i]
    const num = parseFloat(opFirstArr[i + 1])
    const func = opAfter[operator]
    result = func(result, num)
  }
  return parseFloat(result.toFixed(10))
}

function App() {
  const [value, setValue] = useState(INITIAL_VALUE)
  const [history, setHistory] = useState("")
  const [result, setResult] = useState("")
  const [showResult, setShowResult] = useState(false)

  //history內容不為空時,每變動一次,就將history最後面的符號刪去並計算結果
  useEffect(() => {
    if (history !== "") {
      const useableOperation = history.slice(0, -1)
      calculateResult(useableOperation)
    }
  }, [history])

  //計算結果並將ShowResult設置為true
  const calculateResult = (useableOperation) => {
    const operationArr = checkOperation(useableOperation) // ["1", "+", "2", "+", "3"]
    const result = calculate(operationArr) // ["2", "+" "3", "*", "4"] -> ["2", "+", "12"] -> 14
    setResult(result)
    setShowResult(true)
  }

  //初始化
  const init = () => {
    setShowResult(false)
    setValue(INITIAL_VALUE)
    setHistory("")
    setResult("")
  }

  //數字輸入
  //如果showResult為true時,設置value為當下按鈕的內容並將ShowResult設置為false
  //其餘則先判斷value是否為初始值? 如果是 則設置value為當下按鈕的內容,否則設置value為"value+後續的按鈕內容"
  const handleNumberInput = (clicked) => {
    if (showResult) {
      setValue(clicked)
      setShowResult(false)
    } else {
      setValue((value) => (value === INITIAL_VALUE ? clicked : `${value}${clicked}`))
    }
    return
  }

  //百分比計算
  //如果showResult為true時,將result除以100
  //其餘則 (history + value) / 100 帶入運算
  const handlePercentCalculate = () => {
    if (showResult) {
      setResult(result / 100)
      setHistory("")
    } else {
      setShowResult(true)
      const useableOperation = `(${history}${value})/100`
      setResult(eval(useableOperation))
      setHistory("")
    }
    return
  }

  //根號運算
  //如果showResult為true時,將result開根號
  //其餘則 (history + value) 運算後在將結果開根號
  const handleSqrtCalculate = () => {
    if (showResult) {
      setResult(Math.sqrt(result))
      setHistory("")
    } else {
      setShowResult(true)
      const useableOperation = `(${history}${value})`
      setResult(Math.sqrt(eval(useableOperation)))
      setHistory("")
    }
    return
  }

  const onClick = (clicked) => {
    //如果輸入的按鈕為數字時,執行handleNumberInput()
    if (numbers.includes(clicked)) {
      handleNumberInput(clicked)
      return
    }

    //如果輸入的按鈕為 + - * / 時
    //1.若showResult為true時,將history刪去最後一項並+後續按鈕內容(替換 + - * / 符號)
    //2.其餘則將history設置為history+value+後續按鈕內容
    if (operators.includes(clicked)) {
      if (showResult) {
        setHistory((history) => `${history.slice(0, -1)}${clicked}`)
      } else {
        setHistory((history) => `${history}${value}${clicked}`)
      }
      return
    }

    //初始化按鈕"C"
    if (clicked === "C") {
      init()
      return
    }

    //按鈕"=" 將當下的history跟value相加計算結果且清空歷史紀錄
    if (clicked === "=") {
      const useableOperation = `${history}${value}`
      calculateResult(useableOperation)
      setHistory("")
      return
    }

    //正負號轉換按鈕
    if (clicked === "+/-") {
      setValue(-value)
      return
    }

    //百分比按鈕"%"
    if (clicked === "%") {
      handlePercentCalculate()
      return
    }

    //根號按鈕
    if (clicked === "√") {
      handleSqrtCalculate()
      return
    }

    //點號按鈕"."
    if (clicked === ".") {
      if (!value.includes(".")) {
        setValue(`${value}${clicked}`)
      }
      return
    }
  }
  return (
    <>
      <div className="calculator">
        <div className="calculator-history">{history}</div>
        <div className="calculator-head">{showResult ? result : value}</div>
        <CalculateBtn onClick={onClick} />
      </div>
    </>
  )
}

export default App
