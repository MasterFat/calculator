import { useState } from "react"
import { Calculate } from "./calculate"

function App() {
  const [value, setValue] = useState("0")
  const [history, setHistory] = useState("")
  const historyLastItem = history.slice(-1)

  return (
    <>
      <div className="calculator">
        <div className="calculator-history">{history}</div>
        <div className="calculator-head">{value}</div>
        <Calculate value={value} history={history} setHistory={setHistory} setValue={setValue} historyLastItem={historyLastItem} />
      </div>
    </>
  )
}

export default App
