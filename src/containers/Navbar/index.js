import classes from "./Navbar.module.scss"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={classes.navbar}>
            <div className={classes.links}>
                <hr />
                <Link to="/Dashboard" className={classes.navlink}>Dashboard</Link>
                <hr />
                <Link to="/Users" className={classes.navlink}>All Users</Link>
                <hr />
            </div>
            <div>
                <hr />
                <Link to="/" className={classes.navlink}>Log out</Link>
                <hr />
            </div>
        </div>
    )
}

export default Navbar;