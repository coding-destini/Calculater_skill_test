import { useState } from "react";
import "./app.css";
import Button from "./Components/Button";
import Input from "./Components/Input";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const HandleAddToText = (val) => {
    setText((text) => [...text, val]);
  };

  const calculateResult = () => {
    try {
      const input = text.join("");
      const tokens = input.match(/[+\-*/]|\d+\.\d+|\d+/g);
      
      if (!tokens) {
        setResult("Invalid Input");
        return;
      }

      let total = parseFloat(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const number = parseFloat(tokens[i + 1]);

        if (isNaN(number)) {
          setResult("Invalid Input");
          return;
        }

        if (operator === '+') {
          total += number;
        } else if (operator === '-') {
          total -= number;
        } else if (operator === '*') {
          total *= number;
        } else if (operator === '/') {
          total /= number;
        }
      }

      setResult(total);
    } catch (error) {
      setResult("Error");
    }
  };

  const resetInput = () => {
    setText("");
    setResult("");
  };

  const buttonColor = "#f2a33c";

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        <div className="row">
          <Button symbol="7" handleClick={HandleAddToText} />
          <Button symbol="8" handleClick={HandleAddToText} />
          <Button symbol="9" handleClick={HandleAddToText} />
          <Button symbol="/" color={buttonColor} handleClick={HandleAddToText} />
        </div>
        <div className="row">
          <Button symbol="4" handleClick={HandleAddToText} />
          <Button symbol="5" handleClick={HandleAddToText} />
          <Button symbol="6" handleClick={HandleAddToText} />
          <Button symbol="*" color={buttonColor} handleClick={HandleAddToText} />
        </div>
        <div className="row">
          <Button symbol="1" handleClick={HandleAddToText} />
          <Button symbol="2" handleClick={HandleAddToText} />
          <Button symbol="3" handleClick={HandleAddToText} />
          <Button symbol="+" color={buttonColor} handleClick={HandleAddToText} />
        </div>
        <div className="row">
          <Button symbol="0" handleClick={HandleAddToText} />
          <Button symbol="." handleClick={HandleAddToText} />
          <Button symbol="=" handleClick={calculateResult} />
          <Button symbol="-" color={buttonColor} handleClick={HandleAddToText} />
        </div>
        <Button symbol="Clear" color="red" handleClick={resetInput} />
      </div>
    </div>
  );
};

export default App;
