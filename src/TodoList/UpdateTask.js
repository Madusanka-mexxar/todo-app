import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import useFetch from "../useFetch";

const UpdateToDo = () => {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [discription, setDiscription] = useState('')

    const history = useHistory();

    const {
        data: todos
      } = useFetch("http://localhost:8000/todos/" + id);

    const handleSubmit = (e) => {
        e.preventDefault();
        const todos =  { name, discription };
        
        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todos)
        }).then(() => {
            console.log("new task")
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
            value={todos.name}
            onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <textarea 
            required
            value={todos.discription}
            onChange={(e) => setDiscription(e.target.value)}
        ></textarea>
        <button>Update Task</button>
      </form>
    </div>
  );
};

export default UpdateToDo;
