import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import useFetch from "../useFetch";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Switch from "react-switch";

const UpdateToDo = () => {

  const { id } = useParams();

  const {
    data: todos, isPending, error
  } = useFetch("http://localhost:8000/todos/" + id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState(false);
 
  const history = useHistory();

  useEffect(() => {
    if (todos) {
      setName(todos.name);
      setDescription(todos.description);
      setDueDate(todos.dueDate)
      setStatus(todos.status)
    }
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todos = { name, description, status };

    fetch('http://localhost:8000/todos/' + id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos)
    }).then(() => {
      console.log("new task")
      history.push('/')
    })
  }

  return (
    <div className="create">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {todos && (
        <div>
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <label>Task Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* <label>Due Date:</label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="dd/MM/yyyy"
        /> */}
        <label>
          Status:{" "}
          <Switch
            onChange={(checked) => setStatus(checked)}
            checked={status}
          />
        </label>
            <button>Update Task</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default UpdateToDo;
