import React, { useEffect, useState } from "react";
import axios from "axios";
function Todoinput(props) {
  const [inputText, setInputText] = useState('');

  const handleenterpress = async (e) => {
    if (e.keyCode === 13 && inputText) {
      await handleSubmit();
      setInputText("")
    }
  }
  const handleSubmit = async () => {
    if (inputText) {
      await axios.post("http://127.0.0.1:8000/api/addTodo", {
        "Addtodo": inputText
      })
      props.fetchdata();
      setInputText("")
    }
  }

  return (
    <div className="input-container">
      <input type="text" className="input-box-todo" placeholder="Enter your todo" value={inputText} onChange={e => {
        setInputText(e.target.value)

      }}
        onKeyDown={handleenterpress} />
      <button className="add-btn" onClick={handleSubmit}>+</button>
    </div>


  );

}

export default Todoinput;
