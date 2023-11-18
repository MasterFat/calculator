import { useState } from "react"

export const Calculate = ({ value, history, setValue, setHistory, historyLastItem }) => {
  const [isCalculate, setIsCalculate] = useState(false)
  const [isNumber, setIsNumber] = useState(false)

  const numberBtn = (e) => {
    setIsNumber(true)
    if (value === "0" || isCalculate === true) {
      setIsCalculate(false)
      return setValue(e.target.innerText)
    } else {
      setValue(value + e.target.innerText)
    }
  }

  const operateBtn = (e) => {
    setIsCalculate(true)
    setIsNumber(false)
    if (history === "") {
      setHistory(history + value + e.target.innerText)
    } else if ((historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "*" || historyLastItem === "/") && isNumber === false) {
      setHistory(history.slice(0, -1) + e.target.innerText)
    } else if (historyLastItem === ")") {
      setHistory(history + e.target.innerText)
    } else {
      setHistory(history + value + e.target.innerText)
    }
  }

  const dotBtn = (e) => {
    if (!value.includes(".")) setValue(value + e.target.innerText)
  }

  const convertBtn = () => {
    setValue((-value).toString())
  }

  const clearBtn = () => {
    setIsCalculate(true)
    setIsNumber(false)
    setValue("0")
    setHistory("")
  }

  const percentBtn = () => {
    setIsCalculate(true)
    if (history === "") {
      setValue(eval(eval(value) / 100))
    } else {
      setValue(eval(eval(history + value) / 100)), setHistory("")
    }
  }

  const sqrtBtn = () => {
    setIsCalculate(true)
    if (history === "") {
      setValue(Math.sqrt(eval(value)))
    } else {
      setValue(Math.sqrt(eval(history + value))), setHistory("")
    }
  }

  const leftBracketsBtn = (e) => {
    if (historyLastItem === "(") {
      setHistory(history.slice(0, -1) + e.target.innerText)
    } else if (history.includes("(", ")") && (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "/" || historyLastItem === "*")) {
      setHistory(history.slice(0, -1) + e.target.innerText)
    } else if (historyLastItem === ")") {
      setHistory(history)
    } else setHistory(history + e.target.innerText)
  }

  const rightBracketsBtn = (e) => {
    if (history === "" || !history.includes("(")) {
      setHistory(history)
    } else if (history.slice(-1) === ")") {
      setHistory(history.slice(0, -1) + e.target.innerText)
    } else setHistory(history + value + e.target.innerText)
  }

  const equalBtn = () => {
    setIsCalculate(true)
    if (value === "" && (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "/" || historyLastItem === "*")) {
      setValue(eval((history.slice(0, -1) + value).toString())), setHistory("")
    }
    setValue(eval((history + value).toString())), setHistory("")
  }

  return (
    <>
      <div className="calculator-btnContainer">
        <button onClick={() => clearBtn()}>C</button>
        <button onClick={() => convertBtn()}>+/-</button>
        <button onClick={() => percentBtn()}>%</button>
        <button onClick={() => sqrtBtn()}>√</button>
        <button onClick={(e) => numberBtn(e)}>7</button>
        <button onClick={(e) => numberBtn(e)}>8</button>
        <button onClick={(e) => numberBtn(e)}>9</button>
        <button onClick={(e) => operateBtn(e)}>/</button>
        <button onClick={(e) => numberBtn(e)}>4</button>
        <button onClick={(e) => numberBtn(e)}>5</button>
        <button onClick={(e) => numberBtn(e)}>6</button>
        <button onClick={(e) => operateBtn(e)}>*</button>
        <button onClick={(e) => numberBtn(e)}>1</button>
        <button onClick={(e) => numberBtn(e)}>2</button>
        <button onClick={(e) => numberBtn(e)}>3</button>
        <button onClick={(e) => operateBtn(e)}>-</button>
        <button onClick={(e) => numberBtn(e)}>0</button>
        <button className="btn-leftBrackets" onClick={(e) => leftBracketsBtn(e)}>
          (
        </button>
        <button className="btn-rightBrackets" onClick={(e) => rightBracketsBtn(e)}>
          )
        </button>
        <button onClick={(e) => dotBtn(e)}>.</button>
        <button onClick={(e) => operateBtn(e)}>+</button>
      </div>
      <button className="calculator-result" onClick={() => equalBtn()}>
        =
      </button>
    </>
  )
}
