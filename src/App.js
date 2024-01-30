import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // State for Data
  const [todos, setTodos] = useState([]);
  // State for input
  const [title, setTitle] = useState("");
  // For error mesages
  const [result, setResult] = useState(false);
  // For result messages
  const [resultMessage, setResultMessage] = useState("");

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
  }, [result]);

  // Validation
  if (todos === null) {
    return null;
  }

  // checkForm function is written here

  const checkForm = (e) => {
    e.preventDefault();

    // Validation
    if (title === "") {
      alert("Input can't be empty");
      return;
    }
    // Create and save Todo
    const newTodo = {
      id: String(new Date().getTime()),
      title: title,
      date: new Date(),
      completed: false,
    };

    // axios post method
    axios
      .post(`http://localhost:3004/todos`, newTodo)
      .then((response) => {
       // setTodos([...todos, newTodo]);
        setTitle("");
        setResult(true);
        setResultMessage("Kayit Islemi Basarili");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage("Kayit Esnasinda Bir Hata Olustu");
      });
  };

  return (
    <div className="container my-5">
      {result === true && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        >
          <div class="alert alert-success" role="alert">
            <p>{resultMessage}</p>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => setResult(false)}
                className="btn btn-sm btn-outline-success "
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <form onSubmit={checkForm}>
          <div className="input-group mb-3">
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
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
        <div key={todo.id} className="alert alert-secondary my-3 d-flex justify-content-between align-items-center" role="alert">
          <div>
            <h1>{todo.title}</h1>
            <p>{new Date(todo.date).toLocaleString()}</p>
          </div>
          <div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-sm btn-warning">
                Duzenle
              </button>
              <button type="button" className="btn  btn-sm btn-danger">
                Sil
              </button>
              <button type="button" className="btn btn-sm btn-primary">
                {todo.completed === true ? "Yapilmadi" : "Yapildi"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
