export function EqualBtn({ value, history, setValue, setHistory, historyLastItem }) {
  // const equalBtn = () => {
  //   if (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "/" || historyLastItem === "*") {
  //     setValue(eval(history.slice(0, -1))), setHistory("")
  //   } else if ((value === "0" && history === "") || historyFirstItem === "/" || historyFirstItem === "*" || history === ".") {
  //     setValue("0"), setHistory("")
  //   } else if (history === "") {
  //     setValue(value)
  //   } else {
  //     setValue(eval(history).toString()), setHistory("")
  //   }
  // }
  const equalBtn = () => {
    if (value === "" && (historyLastItem === "+" || historyLastItem === "-" || historyLastItem === "/" || historyLastItem === "*")) {
      setValue(eval((history.slice(0, -1) + value).toString())), setHistory("")
    }
    setValue(eval((history + value).toString())), setHistory("")
  }
  return (
    <button className="calculator-result" onClick={() => equalBtn()}>
      =
    </button>
  )
}
