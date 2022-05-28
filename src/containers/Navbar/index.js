import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import * as actions from "../../store/actions";

import classes from "./Navbar.module.scss";
import { useState } from "react";

const Navbar = (props) => {
    const { onAuthInitiateLogout } = props;

    const [sideBar, setSideBar] = useState(false);

    const onLogoutClick = () => {
        onAuthInitiateLogout();
    }

    const sideBarToggle = () => {
        setSideBar(prevState => !prevState);
    }

    return (
        <div className={sideBar ? classes.navbar + " " + classes.open : classes.navbar}>
            <span onClick={sideBarToggle} className={classes.hamburger}>
                <MenuOutlinedIcon className={classes.icon} />
            </span>
            <div className={classes.links}>
                {/* <hr /> */}
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? classes.active : ''} ><DashboardIcon className={classes.icon} /> Dashboard</NavLink>
                {/* <hr /> */}
                <NavLink to="/rejected" className={({ isActive }) => isActive ? classes.active : ''}><ReportProblemOutlinedIcon className={classes.icon} /> Rejected Leaves</NavLink>
                {/* <hr /> */}
                <NavLink to="/accepted" className={({ isActive }) => isActive ? classes.active : ''}><CheckBoxOutlinedIcon className={classes.icon} /> Accepted Leaves</NavLink>
                {/* <hr /> */}
                <NavLink to="/total" className={({ isActive }) => isActive ? classes.active : ''}><GroupWorkOutlinedIcon className={classes.icon} /> Total Leaves</NavLink>
                {/* <hr /> */}
                <NavLink to="/colleague" className={({ isActive }) => isActive ? classes.active : ''}><AccountBoxOutlinedIcon className={classes.icon} /> Colleague Leaves</NavLink>
                {/* <hr /> */}
            </div>
            <div className={classes.links}>
                {/* <hr /> */}
                <NavLink to="/" onClick={onLogoutClick} ><ExitToAppOutlinedIcon className={classes.icon} /> Log out</NavLink>
                {/* <hr /> */}
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