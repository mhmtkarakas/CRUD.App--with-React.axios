import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // State for Data
  const [todos, setTodos] = useState([]);
  // State for input
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3004/todos`)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Validation
  if (todos === null) {
    return null;
  }

  // checkForm function is written here

  const checkForm = (e) => {
     e.preventDefault();

     // Validation
     if(title === ""){
      alert("Input can't be empty")
      return;
     }
     // Create and save Todo
     const newTodo = {
      id : String(new Date().getTime()),
      title : title,
      date : new Date(),
      completed : false
     }
    
     // axios post method
     axios.post(`http://localhost:3004/todos`, newTodo)
     .then((response)=>{
      setTodos([...todos,newTodo])
      setTitle("")
     })
     .catch((error)=>{})
  }

  return (
    <div className="container my-5">
      <div className="row">
        <form onSubmit={checkForm}>
          <div className="input-group mb-3">
            <input
              value={title}
              onChange = {(event) =>{setTitle(event.target.value)}}
              type="text"
              className="form-control"
              placeholder="Enter your working..."
            />
            <button className="btn btn-primary" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="alert alert-secondary my-3" role="alert">
          <h1>{todo.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
