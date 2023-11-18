import { useState } from "react"
export function Btn({ value, history, setValue, setHistory, historyLastItem }) {
  const [percent, setPercent] = useState(false)
  // const numberBtn = (e) => {
  //   if (value === "0" || history === "") {
  //     return setValue(e.target.innerText), setHistory(e.target.innerText)
  //   } else {
  //     setValue(value + e.target.innerText), setHistory(history + e.target.innerText)
  //   }
  // }
  const numberBtn = (e) => {
    if (value === "" || value === "0" || percent === true) {
      setPercent(false)
      return setValue(e.target.innerText)
    } else {
      setValue(value + e.target.innerText)
    }
  }
  const operateBtn = (e) => {
    setPercent(true)
    if (value.length > 0 || history === "") {
      setHistory(history + value + e.target.innerText)
    } else if (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "*" || historyLastItem === "/") {
      setHistory(history.slice(0, -1) + e.target.innerText)
    }
  }
  const dotBtn = (e) => {
    if (!value.includes(".")) setValue(value + e.target.innerText)
  }
  const convertBtn = () => {
    setValue((-value).toString())
  }
  // const operateBtn = (e) => {
  //   if (value.length > 0 || history === "") {
  //     setValue(""), setHistory(history + e.target.innerText)
  //   } else if (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "*" || historyLastItem === "/") {
  //     setHistory(history.slice(0, -1) + e.target.innerText)
  //   } else setHistory(history + e.target.innerText)
  // }

  // const dotBtn = (e) => {
  //   if (history === "") {
  //     setValue(e.target.innerText), setHistory(history + e.target.innerText)
  //   } else if (!value.includes(".")) {
  //     setValue(value + e.target.innerText), setHistory(history + e.target.innerText)
  //   }
  // }
  const clearBtn = () => {
    setPercent(true)
    setValue("0")
    setHistory("")
  }
  // const convertBtn = () => {
  //   setValue((-value).toString()),
  //     setHistory(() => {
  //       if (history.slice(-1) !== "+" || history.slice(-1) !== "-" || !history.slice(0, 1).includes("-")) {
  //         return history.slice(0, -1) + (-value).toString()
  //       } else if (history.slice(0, 1).includes("-")) {
  //         return history.slice(1)
  //       } else if (history.slice(-1) === "+") {
  //         return history.slice(0, -1) + "-"
  //       } else if (history.slice(-1) === "-") {
  //         return history.slice(0, -1) + "-"
  //       }
  //     })
  // }

  const percentBtn = () => {
    setPercent(true)
    if (history === "") {
      setValue(eval(eval(value) / 100))
    } else if (value === "" && (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "/" || historyLastItem === "*")) {
      setValue(eval((history.slice(0, -1) + value).toString())), setHistory("")
    } else {
      setValue(eval(eval(history + value) / 100)), setHistory("")
    }
  }

  const sqrtBtn = () => {
    setPercent(true)
    if (history === "") {
      setValue(Math.sqrt(eval(value)))
    } else if (value === "" && (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "/" || historyLastItem === "*")) {
      setValue(eval((history.slice(0, -1) + value).toString())), setHistory("")
    } else {
      setValue(Math.sqrt(eval(history))), setHistory("")
    }
  }

  return (
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
      <button
        className="btn-78"
        onClick={(e) => {
          setHistory(history + e.target.innerText)
        }}
      >
        (
      </button>
      <button
        className="btn-87"
        onClick={(e) => {
          setHistory(history + e.target.innerText)
        }}
      >
        )
      </button>
      <button onClick={(e) => dotBtn(e)}>.</button>
      <button onClick={(e) => operateBtn(e)}>+</button>
    </div>
  )
}
