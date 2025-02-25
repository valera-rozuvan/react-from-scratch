import React from 'react';

function App() {
  function btnClick() {
    debugger;
    console.log("Button clicked!");
  }

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <input type='button' onClick={btnClick} value={"Click me!"} />
    </div>
  );
}

export default App;
