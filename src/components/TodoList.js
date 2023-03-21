import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function TodoList(props) {

  const [IsActive, setIsActive] = useState(false);
  const [IsActive2, setIsActive2] = useState(false);
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();


  async function starttime(id) {
    await axios.post(`http://127.0.0.1:8000/api/Start/${id}`, {
      "startTime": new Date().toLocaleTimeString()
    })
    setStart(true);
    props.fetchdata();
  }
  async function finishtime(id) {
    if (start) {
      await axios.post(`http://127.0.0.1:8000/api/Finish/${id}`, {
        "endTime": new Date().toLocaleTimeString()
      })

    }
    props.fetchdata();
  }
  // function finishtime() {
  //   setIsActive2(true);
  //   const date = new Date();
  //   setFinish(date.toLocaleTimeString());
  // }
  const deleteListitem = async (id) => {
    console.log(id);
    const newListitem = await axios.post(`http://127.0.0.1:8000/api/del/${id}`);
    console.log(newListitem);
    setIsActive(false);
    setIsActive2(false);
    setStart(false);
    setFinish(false);
    props.fetchdata();

  }

  //  function editTodo(id){

  //  }

  console.log(props.item);
  return (

    <li className="list-item">
      {props.item.Addtodo}


      {props.item?.startTime ? (
        <div className="date">{props.item?.startTime}&nbsp;</div>
      ) : (
        <input className="btns" name="start" value="Start" type="button" onClick={() => starttime(props.item.id)} ></input>)}

      {props.item?.endTime ? (<div className="date2">-{props.item?.endTime}</div>) : (
        <input className="btns2" name="End" value="End" type="button" onClick={() => finishtime(props.item.id)}></input>)}

      <span className="icons">

        <i className="fa-solid fa-trash-can icon-delete" onClick={e => {
          deleteListitem(props.item.id)
        }}></i>

      </span>
      {/* <button className="edit" onClick={()=>editTodo(props.item.id)}>edit</button> */}

    </li>



  );
}

export default TodoList;
