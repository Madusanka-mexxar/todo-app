import { useState } from "react";
import { useHistory } from 'react-router-dom';

const AddTodo = () => {

    const [name, setName] = useState('');
    const [discription, setDiscription] = useState('')
    const [isPending, setIsPending] = useState(false)

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const todos =  { name, discription };

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
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
        ></textarea>
        {!isPending && <button>Add Task</button>}
        {isPending && <button disabled>Adding...</button>}
      </form>
    </div>
  );
};

export default AddTodo;
