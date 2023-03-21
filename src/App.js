import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Todoinput from './components/Todoinput';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import axios from 'axios';



function App() {
  const [listTodo, setListTodo] = useState([]);
  const [input, setInput] = useState("");
  const url = "http://127.0.0.1:8000/api";
  const fetchData = () => {

    axios
      .get(`${url}/getTodo?search=${input}`)
      .then((res) => {
        const allTasks = res.data;
        setListTodo(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   let addList= (inputText)=>{
  // //     if(inputText!==''){
  // //     let data = listTodo;
  // //  data.push({
  // //   Addtodo:inputText
  // //  })
  // //  setListTodo([...data]);
  // //       }

  //   }

  // const deleteListitem=async(id)=>{
  //   console.log(id);
  //   const newListitem = await axios.post(`http://127.0.0.1:8000/api/del/${id}`);
  //   console.log(newListitem);
  //   fetchData();

  // }
  // const fetchData = async () => {
  //   console.log("response");
  //   const response = await axios.get("http://127.0.0.1:8000/api/getTodo");
  //   console.log("response",response.data);
  //   if(response.data){
  //      setListTodo(response.data)
  //   }
  // }

  // useEffect(()=>{
  //   fetchData("getTodo");
  //      },[]);
  useEffect(() => {
    fetchData();
  }, [input]);

  return (

    <div className="main-container">
      <div className="center-container">
        <Todoinput fetchdata={fetchData} />
        <br />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <form className="example" action="action_page.php">
          <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search Todo.." name="search"></input>

        </form>
        <br />
        <div className='app-heading'>
          <p >
            TO DO LIST
          </p>
        </div>


        {/* <div className='squarebox'> */}
        {
          listTodo.length > 0 &&
          listTodo.map((listItem, i) => {
            console.log("listitem", listItem, listTodo.length)

            return (
              <TodoList fetchdata={fetchData} key={i} item={listItem} />
            )
          })
        }
      </div>
    </div>
    //    </div>




  );
}
export default App;
