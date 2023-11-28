import "./style.css"
export const CalculateBtn = ({ onClick }) => {
  const buttonClick = (e) => {
    onClick(e.target.innerText)
  }

  return (
    <>
      <div className="calculator-btnContainer row">
        <div className="col">
          <button onClick={buttonClick}>C</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>+/-</button>
        </div>

        <div className="col">
          <button onClick={buttonClick}>%</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>√</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>7</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>8</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>9</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>/</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>4</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>5</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>6</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>*</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>1</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>2</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>3</button>
        </div>
        <div className="col">
          <button onClick={buttonClick}>-</button>
        </div>
        <div className="col-sm">
          <button onClick={buttonClick}>0</button>
        </div>
        <div className="col-sm">
          <button onClick={buttonClick}>(</button>
        </div>
        <div className="col-sm">
          <button onClick={buttonClick}>)</button>
        </div>
        <div className="col-sm">
          <button onClick={buttonClick}>.</button>
        </div>
        <div className="col-sm">
          <button onClick={buttonClick}>+</button>
        </div>
      </div>
      <button className="calculator-result" onClick={buttonClick}>
        =
      </button>
    </>
  )
}
