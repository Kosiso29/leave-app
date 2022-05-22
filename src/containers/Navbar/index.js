import classes from "./Navbar.module.scss"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={classes.navbar}>
            <div className={classes.links}>
                <hr />
                <Link to="/dashboard" className={classes.navlink}>Dashboard</Link>
                <hr />
                <Link to="/rejected" className={classes.navlink}>Rejected Leaves</Link>
                <hr />
                <Link to="/accepted" className={classes.navlink}>Accepted Leaves</Link>
                <hr />
                <Link to="/total" className={classes.navlink}>Total Leaves</Link>
                <hr />
                <Link to="/colleague" className={classes.navlink}>Get Colleague Leaves</Link>
                <hr />
            </div>
            <div className={classes.links}>
                <hr />
                <Link to="/" className={classes.navlink}>Log out</Link>
                <hr />
            </div>
        </div>
    )
}

export default Navbar;