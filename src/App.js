import Home from "./Home.js";
import "./index.js";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTodo from "./TodoList/AddTodo.js";
import ToDoDetails from "./TodoList/TodoDetails.js";
import NotFound from "./NotFound.js";
import UpdateTask from "./TodoList/UpdateTask.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/newTask">
              <AddTodo />
            </Route>
            <Route path="/task/:id">
              <ToDoDetails />
            </Route>
            <Route path="/update/:id">
              <UpdateTask />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
