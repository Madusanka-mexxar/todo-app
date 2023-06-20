import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Switch from "react-switch";
import { Container, TextField } from "@mui/material";

const DisplayList = ({ todos, title }) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const dueDate = new Date(todos.dueDate);
  const formattedDate = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}-${dueDate.getDate()}`;

  const handleClick = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      fetch("http://localhost:8000/todos/" + id, {
        method: "DELETE",
      }).then(() => {
        history.push("/");
      });
    }
  };

  return (
    <div className="todo-list">
      <h2>{title}</h2>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <TextField
          type="search"
          id="search"
          label="Search"
          sx={{ width: 600 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Container>
      {todos
        .filter((todo) => todo.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((todo) => (
          <div className="todo-preview" key={todo.id}>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <p>Due Date: {formattedDate}</p>
            <label>
              Status: <Switch disabled checked={todo.status} />
            </label>
            <br></br>
            <button onClick={() => handleClick(todo.id)}>Delete</button>
            <Link to={`/update/${todo.id}`}>
              <button>Update</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DisplayList;
