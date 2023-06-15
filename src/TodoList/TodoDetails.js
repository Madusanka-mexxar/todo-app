import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const ToDoDetails = () => {
  const { id } = useParams();
  const {
    data: todos,
    error,
    isPending,
  } = useFetch("http://localhost:8000/todos/" + id);
  // const history = useHistory();

  const handleClick = () => {
    fetch("http://localhost:8000/todos/" + todos.id, {
      method: "DELETE",
    }).then(() => {
      console.log("Deleted");
    });
  };

  return (
    <div className="todo-preview">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {todos && (
        <div>
          <h2>{todos.name}</h2>
          <p>{todos.discription}</p>
          <button onClick={handleClick}>Delete</button>
         
            <button>Update</button>
         
        </div>
      )}
    </div>
  );
};

export default ToDoDetails;
