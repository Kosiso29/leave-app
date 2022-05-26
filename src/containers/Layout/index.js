import { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navbar from "../Navbar";
import Topbar from "../Topbar";

import classes from "./Layout.module.scss"

const Layout = (props) => {
    const { children, email, onAuthCheckState } = props;

    useEffect(() => {
        if (!email) {
            onAuthCheckState();
        }
    }, []);

    if (email) {
        return (
            <div className={classes.layout}>
                <Topbar email={email} />
                <Navbar />
                <div className={classes.children}>
                    {children}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);