import { useState } from "react";
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";

const AddTodo = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState(false);
  const [isPending, setIsPending] = useState(false)


  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    const todos = { name, description, dueDate, status };

    setIsPending(true)

    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos)
    }).then(() => {
      console.log("new task")
      setIsPending(false)
      history.push('/')
    })
  }

  return (
    <div className="create">
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
         <label>Due Date:</label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <label>
          Status:{" "}
          <Switch
            onChange={(checked) => setStatus(checked)}
            checked={status}
          />
        </label>
        {!isPending && <button>Add Task</button>}
        {isPending && <button disabled>Adding...</button>}
      </form>
    </div>
  );
};

export default AddTodo;
