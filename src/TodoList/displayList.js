import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DisplayList = ({ todos, title }) => {
  const history = useHistory();

  const handleClick = (id) => {
    fetch("http://localhost:8000/todos/" + id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="todo-list">
      <h2>{title}</h2>
      {todos.map((todos) => (
        <div className="todo-preview" key={todos.id}>
          <h2>{todos.name}</h2>
          <p>{todos.discription}</p>
          <button onClick={() => handleClick(todos.id)}>Delete</button>
          <Link to={`/update/${todos.id}`}>
            <button>Update</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DisplayList;
