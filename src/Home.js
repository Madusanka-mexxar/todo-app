import DisplayList from "./TodoList/displayList";
import useFetch from "./useFetch";

const Home = () => {

    const { data:todos , isPending, error } = useFetch('http://localhost:8000/todos')
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {todos && <DisplayList todos={todos} title="All ToDos" />}
    </div>
  );
};

export default Home;
