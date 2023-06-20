import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>To-Do List</h1>

            <div className="links">

                <Link to='/'>Home</Link>

                <Link to='/newTask'>Add New Task</Link>

            </div>

        </nav>
     );
}
 
export default Navbar;