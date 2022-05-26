import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import classes from "./Navbar.module.scss";

const Navbar = (props) => {
    const { onAuthInitiateLogout } = props;

    const onLogoutClick = () => {
        onAuthInitiateLogout();
    }

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
                <Link to="/" className={classes.navlink} onClick={onLogoutClick} >Log out</Link>
                <hr />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthInitiateLogout: () => dispatch(actions.authInitiateLogout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);